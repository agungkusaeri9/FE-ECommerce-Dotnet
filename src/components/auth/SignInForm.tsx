"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import AuthService from "@/services/AuthService";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { setCookie } from 'cookies-next/client';
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginValidation } from "@/validators/auth/login";
import InputLabel from "../form/FormInput";
import { z } from "zod";
import Loading from "../common/Loading";

type LoginFormData = z.infer<typeof loginValidation>;

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const { mutate: loginMutation, isPending: loading, isSuccess } = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await AuthService.login(data);
      return response.data;
    },
    onSuccess: (response) => {
      // Set user data cookie
      setCookie('user', response.data.user, {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });

      // Set auth token cookie
      setCookie('token', response.data.token, {
        path: '/',
        secure: true,
        sameSite: 'strict',
      });

      toast.success(response.message);
      router.push(callbackUrl);
    },
    onError: (error) => {
      // handleError(error);
      console.log(error);
    }
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginValidation),
    mode: "onChange",
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation(data);
  };

  if (isSuccess) return (
    <Loading />
  );

  const handleWithoutLogin = () => {
    localStorage.setItem('role', 'guest');
    router.push("/admin");
  };


  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full max-w-md mx-auto px-4 sm:px-0 mt-25">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleWithoutLogin();
          }}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Without Login
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-6">
                <InputLabel
                  label="Email"
                  name="email"
                  type="text"
                  required
                  placeholder="Enter Email"
                  register={register("email")}
                  error={errors.email}
                />
                <InputLabel
                  label="Password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter Password"
                  register={register("password")}
                  error={errors.password}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                </div>
                <div>
                  <Button
                    loading={loading}
                    disabled={loading}
                    className="w-full"
                    size="sm"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
