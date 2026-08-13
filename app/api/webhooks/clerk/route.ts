import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error";
}

function getDisplayName(
  firstName: string | null,
  lastName: string | null,
  fallback = "New Student",
): string {
  const name = [firstName, lastName].filter(Boolean).join(" ").trim();

  return name || fallback;
}

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not configured.");

    return NextResponse.json(
      {
        error: {
          code: "WEBHOOK_CONFIGURATION_ERROR",
          message: "Webhook configuration is incomplete.",
        },
      },
      { status: 500 },
    );
  }

  const headerPayload = await headers();

  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      {
        error: {
          code: "MISSING_WEBHOOK_HEADERS",
          message: "Required webhook headers are missing.",
        },
      },
      { status: 400 },
    );
  }

  const body = await req.text();

  const webhook = new Webhook(webhookSecret);

  let event: WebhookEvent;

  try {
    event = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (error: unknown) {
    console.error(
      "Clerk webhook signature verification failed:",
      getErrorMessage(error),
    );

    return NextResponse.json(
      {
        error: {
          code: "INVALID_WEBHOOK_SIGNATURE",
          message: "Invalid webhook signature.",
        },
      },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "user.created": {
        const {
          id: clerkUserId,
          email_addresses,
          first_name,
          last_name,
          primary_email_address_id,
        } = event.data;

        const primaryEmail =
          email_addresses.find(
            (email) => email.id === primary_email_address_id,
          ) ?? email_addresses[0];

        if (!primaryEmail?.email_address) {
          return NextResponse.json(
            {
              error: {
                code: "MISSING_USER_EMAIL",
                message: "No valid email address was provided.",
              },
            },
            { status: 400 },
          );
        }

        const email = primaryEmail.email_address.toLowerCase().trim();

        const displayName = getDisplayName(first_name, last_name);

        const existingClerkUser = await prisma.user.findUnique({
          where: {
            clerkUserId,
          },
        });

        const existingEmailUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (
          existingEmailUser &&
          existingEmailUser.clerkUserId !== clerkUserId
        ) {
          console.error(
            `Email conflict during Clerk synchronization: ${email}`,
          );

          return NextResponse.json(
            {
              error: {
                code: "USER_EMAIL_CONFLICT",
                message:
                  "A database user already exists with this email address.",
              },
            },
            { status: 409 },
          );
        }

        const user = existingClerkUser
          ? await prisma.user.update({
              where: {
                clerkUserId,
              },
              data: {
                email,
                displayName,
                status: "ACTIVE",
                deletedAt: null,
              },
            })
          : await prisma.user.create({
              data: {
                clerkUserId,
                email,
                displayName,
                status: "ACTIVE",
              },
            });

        const studentRole = await prisma.role.findUnique({
          where: {
            slug: "student",
          },
        });

        if (!studentRole) {
          console.error("Required default role 'student' was not found.");

          return NextResponse.json(
            {
              error: {
                code: "DEFAULT_ROLE_NOT_FOUND",
                message: "Default student role is not configured.",
              },
            },
            { status: 500 },
          );
        }

        await prisma.userRole.upsert({
          where: {
            userId_roleId: {
              userId: user.id,
              roleId: studentRole.id,
            },
          },
          update: {},
          create: {
            userId: user.id,
            roleId: studentRole.id,
          },
        });

        console.info(`Clerk user synchronized successfully: ${clerkUserId}`);

        return NextResponse.json(
          {
            success: true,
            message: "User synchronized successfully.",
          },
          { status: 201 },
        );
      }

      case "user.updated": {
        const {
          id: clerkUserId,
          email_addresses,
          first_name,
          last_name,
          primary_email_address_id,
        } = event.data;

        const primaryEmail =
          email_addresses.find(
            (email) => email.id === primary_email_address_id,
          ) ?? email_addresses[0];

        if (!primaryEmail?.email_address) {
          return NextResponse.json(
            {
              error: {
                code: "MISSING_USER_EMAIL",
                message: "No valid email address was provided.",
              },
            },
            { status: 400 },
          );
        }

        const email = primaryEmail.email_address.toLowerCase().trim();

        const displayName = getDisplayName(first_name, last_name, "Student");

        const existingUser = await prisma.user.findUnique({
          where: {
            clerkUserId,
          },
        });

        if (!existingUser) {
          const studentRole = await prisma.role.findUnique({
            where: {
              slug: "student",
            },
          });

          if (!studentRole) {
            return NextResponse.json(
              {
                error: {
                  code: "DEFAULT_ROLE_NOT_FOUND",
                  message: "Default student role is not configured.",
                },
              },
              { status: 500 },
            );
          }

          const user = await prisma.user.create({
            data: {
              clerkUserId,
              email,
              displayName,
              status: "ACTIVE",
            },
          });

          await prisma.userRole.upsert({
            where: {
              userId_roleId: {
                userId: user.id,
                roleId: studentRole.id,
              },
            },
            update: {},
            create: {
              userId: user.id,
              roleId: studentRole.id,
            },
          });

          return NextResponse.json(
            {
              success: true,
              message: "User created during synchronization.",
            },
            { status: 201 },
          );
        }

        await prisma.user.update({
          where: {
            clerkUserId,
          },
          data: {
            email,
            displayName,
          },
        });

        return NextResponse.json(
          {
            success: true,
            message: "User updated successfully.",
          },
          { status: 200 },
        );
      }

      case "user.deleted": {
        const { id: clerkUserId } = event.data;

        const user = await prisma.user.findUnique({
          where: {
            clerkUserId,
          },
        });

        if (!user) {
          return NextResponse.json(
            {
              success: true,
              message: "User was already absent from the database.",
            },
            { status: 200 },
          );
        }

        await prisma.user.update({
          where: {
            clerkUserId,
          },
          data: {
            status: "DEACTIVATED",
            deletedAt: new Date(),
          },
        });

        console.info(`User deactivated after Clerk deletion: ${clerkUserId}`);

        return NextResponse.json(
          {
            success: true,
            message: "User deactivated successfully.",
          },
          { status: 200 },
        );
      }

      default: {
        return NextResponse.json(
          {
            success: true,
            message: "Webhook event received.",
          },
          { status: 200 },
        );
      }
    }
  } catch (error: unknown) {
    console.error(
      "Clerk webhook database synchronization failed:",
      getErrorMessage(error),
    );

    return NextResponse.json(
      {
        error: {
          code: "WEBHOOK_PROCESSING_ERROR",
          message: "Unable to process webhook event.",
        },
      },
      { status: 500 },
    );
  }
}
