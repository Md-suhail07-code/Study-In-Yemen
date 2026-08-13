import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function hasRole(allowedRoles: string[]): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    return false;
  }

  if (user.status !== "ACTIVE") {
    return false;
  }

  const userRoles = user.roles.map((userRole) => userRole.role.name);
  return allowedRoles.some((role) => userRoles.includes(role));
}

export async function hasPermission(permissionName: string): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: { include: { permission: true } },
            },
          },
        },
      },
    },
  });
    if (!user) {
    return false;
  }

    if (user.status !== "ACTIVE") {
    return false;
  }

    const userPermissions = user.roles.flatMap((userRole) =>
        userRole.role.permissions.map((rolePermission) => rolePermission.permission.name),
    );
    return userPermissions.includes(permissionName);
}
