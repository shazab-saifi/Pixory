import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import Button from "./Button"
import { CredentialsTypes } from "@/lib/types"


export default function Form({ reqfn }: { reqfn: ({email, name, password}: CredentialsTypes) => void }) {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        reqfn(formData);
        console.log(formData)
        setIsLoading(false)
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    }

    const inputClasses = "px-4 py-2 w-full rounded-md outline-none focus:ring-1"

    return (
        <div className="w-full mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={inputClasses}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <div className="relative flex items-center justify-center">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={inputClasses}
                            required
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
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
