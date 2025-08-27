/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Logo from "@/components/shared/Logo";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import Container from "@/lib/Container";
import { useSignInMutation } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/features/user/userSlice";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignInPage() {
  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [signIn, { isLoading }] = useSignInMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signIn(data).unwrap();
      if (response?.success) {
        if (response.data) {
          Cookies.set("accessToken", response.data.tokens.access);
          dispatch(
            setUser({
              token: response.data.tokens.access,
            })
          );
          toast.success("Login successful");
          router.push("/");
        } else {
          router.push("/otp");
        }
      }else{
           router.push("/otp");
           console.log("Otp is here")
      }
    } catch (error: any) {
      console.log("Error during sign-in:", error);
      if(error?.data?.error.message[0]=="User with id: cmetimovh000k0ahseedvaf7d is not verified. Please verify.") {
        localStorage.setItem('email',data.email)
        router.push("/otp")};
      return toast.warning(error?.data?.error.message[0] || "Login failed");
    }
  };

  return (
    <Container>
      <div className="w-full lg:min-w-[500px] ">
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h1 className="text-2xl font-bold mb-2 mt-2">Hi, Welcome Back! 👋</h1>
          <p className="text-gray-500 text-sm">
            Please Enter Your Email And Password Below!
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email Input */}
          <CustomInput
            id="email"
            type="email"
            label="Email"
            placeholder="georgiayoung@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Password Input */}
          <CustomInput
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••••"
            showPasswordToggle={true}
            error={errors.password?.message}
            {...register("password")}
          />

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                className="accent-primary"
                type="checkbox"
                {...register("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600 "
              >
                Remember Me
              </label>
            </div>
            <Link
              href="/forget-password"
              className="text-sm text-red-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Login Button */}
          <PrimaryButton type="submit" loading={isLoading} text="Sign In" />
        </form>
        <div className="text-center mb-3 mt-3 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signUp" className="text-primary hover:underline">
            Sign up!
          </Link>
        </div>
      </div>
    </Container>
  );
}
