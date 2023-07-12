import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { user_exists } from "@/server/schemas/auth/auth.error";
import { FieldValues } from "react-hook-form";

import { getProviders, signIn } from "next-auth/react";

type loginType = "credentials" | "discord" | "github";

const user_created = "User has been created Sucessfully";

export async function register_user(input: FieldValues) {
  try {
    const { data } = await axios.post("/api/register", input);

    if (data.status === user_created) {
      toast.success("User Created Successfully");
    } else if (data.status === user_exists) {
      toast.error("A user with this email already exists");
    } else {
      toast.error("Unknown Error");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message);
    } else {
      toast.error("Unknow Error");
    }
  }
}

export async function login_user(input: FieldValues) {
  const response = await signIn("credentials", {
    ...input,
    redirect: false,
  });

  if (response?.error) {
    toast.error("Invalid Credentials");
  }

  if (response?.ok && !response.error) {
    toast.success("Logged in successfully");
  }
}

export async function login(type: loginType, input?: FieldValues) {
  let response;

  if (type === "credentials") {
    response = await signIn("credentials", {
      ...input,
      redirect: false,
    });
  } else {
    response = await signIn(type, {
      redirect: false,
    });
  }

  if (response?.error) {
    toast.error("Invalid Credentials");
  }

  if (response?.ok && !response.error) {
    toast.success("Logged in successfully");
  }
}
