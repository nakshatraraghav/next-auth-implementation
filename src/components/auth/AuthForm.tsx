"use client";

import { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/server/schemas/auth/auth.schema";

import Input from "@/components/ui/input";

type variant = "login" | "register";

export default function AuthForm() {
  const [variant, setVariant] = useState<variant>("register");

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

  const submit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email Address"
          register={register}
          errors={errors}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          register={register}
          errors={errors}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
