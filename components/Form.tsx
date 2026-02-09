import { useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Button from "./Button";
import { CredentialsTypes } from "@/lib/types";
import { z } from "zod";
import { FormSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = z.infer<typeof FormSchema>;

export default function Form({
  reqfn,
}: {
  reqfn: ({ email, name, password }: CredentialsTypes) => void | Promise<void>;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    await reqfn(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputClasses =
    "px-4 py-2 w-full rounded-md outline-none border border-neutral-200 bg-white";

  return (
    <div className="mx-auto w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            className={inputClasses}
          />
          {errors.name && (
            <p className="text-sm text-red-700">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <div className="relative flex items-center justify-center">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={inputClasses}
            />
            <button
              type="button"
              className="absolute top-1/2 right-1 h-[80%] -translate-y-1/2 cursor-pointer rounded-md bg-white px-3 py-2"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-700">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-2 w-full rounded-xl font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  );
}
