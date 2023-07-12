import prisma from "@/server/db/prisma";
import { registerBodyType } from "../schemas/auth/auth.schema";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export async function findUserByEmail(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createUser(input: registerBodyType) {
  try {
    const user = await prisma.user.create({
      data: input,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}
