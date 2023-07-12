import { NextResponse } from "next/server";

import { registerSchema } from "@/server/schemas/auth/auth.schema";
import { ZodError } from "zod";

import hashPassword from "@/server/utils/hash-password";
import { createUser } from "@/server/services/user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function POST(request: Request) {
  try {
    let body = registerSchema.parse(await request.json());

    body.password = await hashPassword(body.password);

    const user = await createUser(body);

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("Invalid Credentials");
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return new NextResponse(error.message);
    }

    return new NextResponse("Internal Server Error");
  }
}
