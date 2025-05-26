import SignInForm from "@/components/auth/SignInForm";
import Loading from "@/components/common/Loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
    return (
        <Suspense fallback={<Loading />}>
            <SignInForm />
        </Suspense>
    );
}
