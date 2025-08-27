/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Logo from "@/components/shared/Logo";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useResetPasswordMutation } from "@/redux/api/auth/authApi";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password should be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const userId = searchParams.get("userId") || "";
  const token = localStorage.getItem("resetToken");

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // This enables real-time validation
  });

  // Watch password field to enable real-time comparison
  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await resetPassword({
        newPassword: data.password,
        token,
      }).unwrap();

      if (response?.success) {
        console.log("Password reset successfully");
        toast.success("Password reset successfully");
        // Clear the reset token from localStorage
        localStorage.removeItem("resetToken");
        router.push("/signIn");
      } else {
        console.error("Failed to reset password");
        toast.error("Failed to reset password");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full lg:min-w-[500px]">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold mb-2 mt-2">Reset Password</h1>
        <p className="text-gray-500 text-sm">Set a strong password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Password Input */}
        <CustomInput
          id="password"
          type={showPassword ? "text" : "password"}
          label="Password"
          placeholder="••••••••••"
          showPasswordToggle={true}
          // onTogglePassword={togglePasswordVisibility}
          // isPasswordVisible={showPassword}
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Confirm Password Input */}
        <CustomInput
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          label="Confirm Password"
          placeholder="••••••••••"
          showPasswordToggle={true}
          // onTogglePassword={toggleConfirmPasswordVisibility}
          // isPasswordVisible={showConfirmPassword}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        {/* Password Strength Indicator */}
        {password && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Password requirements:</p>
            <ul className="space-y-1">
              <li className={password.length >= 6 ? "text-green-600" : "text-red-500"}>
                {password.length >= 6 ? "✓" : "✗"} At least 6 characters
              </li>
            </ul>
          </div>
        )}
       <button className="px-3 py-2 w-full text-center rounded-lg bg-primary transition-all duration-300 text-white hover:bg-primary shadow cursor-pointer">Submit</button>

        {/* Reset Button */}
        {/* <PrimaryButton type="submit" loading={isLoading} >
          Reset Password
        </PrimaryButton> */}
      </form>
    </div>
  );
}