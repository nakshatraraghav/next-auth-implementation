import { NextResponse } from "next/server";

import { registerSchema } from "@/server/schemas/auth/auth.schema";
import { ZodError } from "zod";

import hashPassword from "@/server/utils/hash-password";
import { createUser } from "@/server/services/user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
  invalid_credentials,
  user_exists,
} from "@/server/schemas/auth/auth.error";

const user_created = "User has been created Sucessfully";

export async function POST(request: Request) {
  try {
    let body = registerSchema.parse(await request.json());

    body.password = await hashPassword(body.password);

    const user = await createUser(body);

    return NextResponse.json({
      status: user_created,
      user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: invalid_credentials,
        user: null,
      });
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ status: user_exists, user: null });
    }

    return NextResponse.json({ status: "Internal Server Error", user: null });
  }
}
