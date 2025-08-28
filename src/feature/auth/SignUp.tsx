/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Logo from "@/components/shared/Logo";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsEye } from "react-icons/bs";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/;
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(passwordRegex, {
        message:
          "Must be one uppercase, lowercase letter, one number, and one special character.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    dateOfBirth: z
      .string()
      .nonempty({ message: "Date of birth is required" })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .refine((val) => new Date(val) <= new Date(), {
        message: "Date of birth cannot be in the future",
      })
      .refine((val) => new Date(val) >= new Date("1900-01-01"), {
        message: "Date of birth is too old",
      }),

    gender: z.string().min(1, { message: "Please Select A Gender" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function   SignUpPage() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();
  const [view, setView] = useState(false);
  const [view2, setView2] = useState(false);

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      gender: "Select Option",
    },
  });

  const onSubmit = async (data: FormValues) => {
    localStorage.setItem("email", data.email);
    console.log("Form Data:", data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...rest } = data;

    // Add role to the payload
    const payload = {
      ...rest,
      role: "INDIVIDUAL",
    };

    try {
      const response = await signUp({
        name: payload.firstName + payload.lastName,
        email: payload.email,
        dateOfBirth: payload.dateOfBirth,
        gender: payload.gender,
        password: payload.password,

      }).unwrap();
      if (response?.success) {
        router.push("/otp");
      }
    } catch (error: any) {
      console.error("Error during sign up:", error);
      toast(error?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="w-full lg:min-w-[500px]">
      <div className="flex flex-col items-center mb-8">
        <Logo />
        <h1 className="text-2xl font-bold mb-2 mt-2 leading-12">
          Create Your Account
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex items-center gap-4">
          {/* First Name Input */}
          <CustomInput
            id="firstName"
            label="First Name"
            placeholder="John"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          {/* Last Name Input */}
          <CustomInput
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>

        {/* Company Email Input */}

        <CustomInput
          id="email"
          type="email"
          label="Email Address"
          placeholder="example@company.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex items-center gap-4">
          {/* First Name Input */}
          <CustomInput
         
            inputType="select"
            label="Select Gender"
            placeholder="Select Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            error={errors.gender?.message}
            {...register("gender")}
          />

          {/* Last Name Input */}
          <CustomInput
            inputType="date"
            label="Select Date of Birth"
            showDatePicker={true}
            error={errors.dateOfBirth?.message}
            {...register("dateOfBirth")}
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <CustomInput
            id="password"
            type={view ? "text" : "password"}
            label="Password"
            placeholder=""
            // showPasswordToggle={view}
            error={errors.password?.message}
            {...register("password")}
          />

          <button type="button" className="absolute top-11 right-5 cursor-pointer" onClick={() => setView(!view)}>
            {view ? <BsEye /> : <FaRegEyeSlash />}
          </button>

        </div>

        {/* Confirm Password Input */}
        <div className="relative">


          <CustomInput
            id="confirmPassword"
            type={view2 ? "text" : "password"}
            label="Confirm Password"
            placeholder="••••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button type="button" className="absolute top-11 right-5 cursor-pointer" onClick={() => setView2(!view2)}>
            {view2 ? <BsEye /> : <FaRegEyeSlash />}
          </button>
        </div>
        {/* Sign Up Button */}
        <PrimaryButton type="submit" loading={isLoading} text="Sign Up" />
      </form>

      {/* Login Link */}
      <div className="text-center mb-3 mt-3 text-sm text-gray-600">
        If you already have an account please?{" "}
        <Link href="/signIn" className="text-primary hover:underline">
          Log in!
        </Link>
      </div>
    </div>
  );
}
