"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";

// ✅ Validation Schema
const formSchema = z.object({
  email: z
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
  const router = useRouter();
  const dispatch = useDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const [view, setView] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");
  const email = watch("email");
  const password = watch("password");

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedRemember = localStorage.getItem("rememberMe") === "true";
    const storedEmail = localStorage.getItem("rememberedEmail") || "";
    const storedPasswordEncoded = localStorage.getItem("rememberedPassword");

    setValue("rememberMe", storedRemember);
    if (storedRemember && storedEmail) {
      setValue("email", storedEmail);
    }
    if (storedRemember && storedPasswordEncoded) {
      try {
        const decodedPassword = atob(storedPasswordEncoded);
        setValue("password", decodedPassword);
      } catch (error) {
        console.error("Failed to decode password:", error);
      }
    }
  }, [setValue]);

  // ✅ Save to localStorage on change
  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", btoa(password)); // base64 encode
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  }, [rememberMe, email, password]);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signIn(data).unwrap();
      if (response?.success) {
        if (response.data) {
          Cookies.set("accessToken", response.data.tokens.access);
          dispatch(setUser({ token: response.data.tokens.access }));
          toast.success("Login successful");
          router.push("/");
        } else {
          router.push("/otp");
        }
      } else {
        router.push("/otp");
      }
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      if (
        error?.data?.error.message[0] ===
        "User with id: cmetimovh000k0ahseedvaf7d is not verified. Please verify."
      ) {
        localStorage.setItem("email", data.email);
        router.push("/otp");
      }
      toast.warning(error?.data?.error.message[0] || "Login failed");
    }
  };

  return (
    <Container>
      <div className="w-full lg:min-w-[500px]">
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h1 className="text-2xl font-bold mb-2 mt-2">Hi, Welcome Back! 👋</h1>
          <p className="text-gray-500 text-sm">
            Please Enter Your Email And Password Below!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email */}
          <CustomInput
            id="email"
            type="email"
            label="Email"
            placeholder="georgiayoung@example.com"
            {...register("email")}
            error={errors.email?.message}
          />

          {/* Password */}
          <div className="relative">
            <CustomInput
              id="password"
              type={view ? "text" : "password"}
              label="Password"
              placeholder="••••••••••"
              {...register("password")}
              error={errors.password?.message}
            />
            <button
              type="button"
              className="absolute top-11 right-5 cursor-pointer"
              onClick={() => setView(!view)}
            >
              {view ? <BsEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                className="accent-primary"
                {...register("rememberMe")}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
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

          {/* Submit */}
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
