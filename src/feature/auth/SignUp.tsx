/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Logo from "@/components/shared/Logo";
import PrimaryButton from "@/components/shared/primaryButton/PrimaryButton";
import { useSignUpMutation } from "@/redux/api/auth/authApi";
import CustomInput from "@/ui/CustomeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Define Zod schema for validation
const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password should be at least 6 characters long" })
      .min(1, { message: "Password is required" }),
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

export default function SignUpPage() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const router = useRouter();

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
      const response = await signUp(payload).unwrap();
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
            label="Select Date"
            showDatePicker={true}
            error={errors.dateOfBirth?.message}
            {...register("dateOfBirth")}
          />
        </div>
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

        {/* Confirm Password Input */}
        <CustomInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••••"
          showPasswordToggle={true}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

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
