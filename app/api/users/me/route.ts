import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "Authentication required.",
          },
        },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId,
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: {
            code: "USER_NOT_FOUND",
            message: "Application user record was not found.",
          },
        },
        { status: 404 },
      );
    }

    if (user.status !== "ACTIVE" || user.deletedAt) {
      return NextResponse.json(
        {
          error: {
            code: "USER_DEACTIVATED",
            message: "This account is not active.",
          },
        },
        { status: 403 },
      );
    }

    const roles = user.roles.map(
      (userRole) => userRole.role.slug,
    );

    const permissions = [
      ...new Set(
        user.roles.flatMap((userRole) =>
          userRole.role.permissions.map(
            (rolePermission) =>
              rolePermission.permission.name,
          ),
        ),
      ),
    ];

    return NextResponse.json({
      data: {
        id: user.id,
        clerkUserId: user.clerkUserId,
        email: user.email,
        displayName: user.displayName,
        status: user.status,
        roles,
        permissions,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error: unknown) {
    console.error("GET /api/users/me failed:", error);

    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred.",
        },
      },
      { status: 500 },
    );
  }
}