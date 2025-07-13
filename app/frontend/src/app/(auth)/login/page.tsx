// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 	});
// 	const [errors, setErrors] = useState<{ [key: string]: string }>({});
// 	const [isLoading, setIsLoading] = useState(false);
// 	const router = useRouter();

// 	const handleInputChange = (field: string, value: string) => {
// 		setFormData((prev) => ({ ...prev, [field]: value }));
// 		if (errors[field]) {
// 			setErrors((prev) => ({ ...prev, [field]: "" }));
// 		}
// 	};

// 	const validateForm = () => {
// 		const newErrors: { [key: string]: string } = {};

// 		if (!formData.email) {
// 			newErrors.email = "Email or phone  is required";
// 		} else if (
// 			formData.email.includes("@") &&
// 			!/\S+@\S+\.\S+/.test(formData.email)
// 		) {
// 			newErrors.email = "Please enter a valid email address";
// 		}

// 		if (!formData.password) {
// 			newErrors.password = "Password is required";
// 		} else if (formData.password.length < 6) {
// 			newErrors.password = "Password must be at least 8 characters";
// 		}

// 		setErrors(newErrors);
// 		return Object.keys(newErrors).length === 0;
// 	};

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		setIsLoading(true);
// 		setErrors({});

// 		if (!validateForm()) {
// 			setIsLoading(false);
// 			return;
// 		}

// 		try {
// 			const email = formData.email;
// 			const password = formData.password;
// 			const response = await fetch("/api/auth/login", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ email, password }),
// 			});
// 			if (!response.ok) {
// 				const errorData = await response.json();
// 				setErrors({ general: errorData.message });
// 			}

// 			setFormData({ email: "", password: "" });
// 			router.push("/admin");
// 		} catch (error) {
// 			setErrors({
// 				general:
// 					error instanceof Error
// 						? error.message
// 						: "Login failed. Please check your credentials.",
// 			});
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<div className="w-screen h-screen flex items-center justify-center">
// 			<div className="grid md:grid-cols-2 h-full w-full px-12 gap-8 items-center place-content-center">
// 				{/* Left Side - Illustration */}
// 				<div
// 					className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg
// 					p-8 flex items-center justify-center min-h-[500px]"
// 				></div>

// 				{/* Right Side - Login Form */}
// 				<div className="w-full max-w-md space-y-8 px-4">
// 					<div className="text-center lg:text-left">
// 						<h1 className="text-3xl font-semibold text-gray-900 mb-2">
// 							Log in to Exclusive
// 						</h1>
// 						<p className="text-gray-600">Enter your details below</p>
// 					</div>
// 					<form onSubmit={handleSubmit} className="space-y-6">
// 						{errors.general && (
// 							<div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
// 								{errors.general}
// 							</div>
// 						)}
// 						{/* Email */}
// 						<div className="space-y-1">
// 							<Label htmlFor="email">Email</Label>
// 							<Input
// 								id="email"
// 								type="text"
// 								value={formData.email}
// 								onChange={(e) => handleInputChange("email", e.target.value)}
// 								className={`border-0 border-b-2 rounded-none px-0 py-3 pl-4 focus:ring-0 ${
// 									errors.email
// 										? "border-red-500"
// 										: "border-gray-300 focus:border-black"
// 								}`}
// 								disabled={isLoading}
// 							/>
// 							{errors.email && (
// 								<p className="text-red-500 text-sm mt-1">{errors.email}</p>
// 							)}
// 						</div>
// 						{/* Password */}
// 						<div className="space-y-1">
// 							<Label htmlFor="password">Password</Label>
// 							<Input
// 								id="password"
// 								type="password"
// 								value={formData.password}
// 								onChange={(e) => handleInputChange("password", e.target.value)}
// 								className={`border-0 border-b-2 rounded-none px-0 py-3 focus:ring-0 ${
// 									errors.password
// 										? "border-red-500"
// 										: "border-gray-300 focus:border-black"
// 								}`}
// 								disabled={isLoading}
// 							/>
// 							{errors.password && (
// 								<p className="text-red-500 text-sm mt-1">{errors.password}</p>
// 							)}
// 						</div>

// 						<Button
// 							type="submit"
// 							className="bg-black text-white hover:bg-gray-800 px-8 py-2 rounded-md"
// 							disabled={isLoading}
// 						>
// 							{isLoading ? "Logging in..." : "Log In"}
// 						</Button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }




"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.email) {
      newErrors.email = "Email or phone is required"
    } else if (formData.email.includes("@") && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const email = formData.email
      const password = formData.password
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setErrors({ general: errorData.message })
      }

      setFormData({ email: "", password: "" })
      router.push("/admin")
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Login failed. Please check your credentials.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Side - Admin Branding */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-12 flex flex-col items-center justify-center text-white">
          <div className="text-center space-y-8">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <Shield className="w-8 h-8" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Admin Portal</h2>
              <p className="text-slate-300 max-w-sm">
                Secure access to your administrative dashboard and management tools.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3 opacity-10">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-12 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Log in to Exclusive</h1>
              <p className="text-gray-600">Enter your details below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{errors.general}</span>
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`pl-10 h-11 border rounded-lg transition-colors ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-gray-900 focus:ring-gray-100"
                    }`}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={`pl-10 pr-10 h-11 border rounded-lg transition-colors ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-300 focus:border-gray-900 focus:ring-gray-100"
                    }`}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
