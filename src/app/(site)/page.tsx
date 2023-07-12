import Image from "next/image";

import AuthForm from "@/components/auth/AuthForm";

export default function Page() {
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.png"
          height={48}
          width={48}
          alt="Conversify Logo"
        />
        <h2 className="mt-6 text-3xl font-bold tracking-tight">
          Sign in to your Account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
