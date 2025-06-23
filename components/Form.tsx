import { useState } from "react"
import { Eye, EyeOff, LoaderCircle } from "lucide-react"
import Button from "./Button"
import { CredentialsTypes } from "@/lib/types"
import { z } from "zod"
import { FormSchema } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type FormData = z.infer<typeof FormSchema>

export default function Form({ reqfn }: { reqfn: ({ email, name, password }: CredentialsTypes) => void }) {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(FormSchema)
    })

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        reqfn(data);
        console.log(data)
        setIsLoading(false)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    const inputClasses = "px-4 py-2 w-full rounded-md outline-none focus:ring-1"

    return (
        <div className="w-full mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        {...register("name")}
                        className={inputClasses}
                    />
                    {errors.name && <p className="text-sm text-red-700">{errors.name.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        className={inputClasses}
                    />
                    {errors.email && <p className="text-sm text-red-700">{errors.email.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
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
                            className="absolute right-0 top-0 h-full px-3 py-2 bg-white rounded-md"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-sm text-red-700">{errors.password.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </div>
    )
}
