"use client";

import { loginSchema, registerSchema } from "@/server/schemas/auth/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

import { register_user } from "@/helpers/form";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

type variant = "login" | "register";

export default function AuthForm() {
  const [variant, setVariant] = useState<variant>("register");
  const [loading, setLoading] = useState<boolean>(false);

  const schema = useMemo(() => {
    if (variant === "login") {
      return loginSchema;
    } else {
      return registerSchema;
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const toggle = useCallback(() => {
    if (variant === "login") {
      setVariant("register");
    } else {
      setVariant("login");
    }
  }, [variant]);

  const submit: SubmitHandler<FieldValues> = async (input) => {
    setLoading(true);

    if (variant === "register") {
      await register_user(input);
    }

    if (variant === "register") {
    }

    setLoading(false);
  };

  return (
    <div className="mt-8 w-full">
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        {variant === "register" && (
          <Input
            id="name"
            type="text"
            label="Name"
            register={register}
            errors={errors}
            disabled={loading}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email Address"
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
          disabled={loading}
        />
        <Button size={"fw"} type="submit" className="mt-2" loading={loading}>
          {variant === "login" ? "Log In" : "Sign Up"}
        </Button>
      </form>
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <div className="w-full border-t border-gray-300" />
          <p className="text-sm text-center w-full font-semibold">Or</p>
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="mt-4 flex items-center justify-between space-x-2">
          <Button variant={"oauth"}>
            <GitHubLogoIcon />
          </Button>
          <Button variant={"oauth"}>
            <DiscordLogoIcon />
          </Button>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 px-2 ">
          <div>
            {variant === "login"
              ? "New to conversify"
              : "Already have an Account"}
          </div>
          <div className="underline cursor-pointer" onClick={toggle}>
            {variant === "login" ? "Create an Account" : "Log In"}
          </div>
        </div>
      </div>
    </div>
  );
}
