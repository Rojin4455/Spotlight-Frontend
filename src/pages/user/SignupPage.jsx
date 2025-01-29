import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../axios/axiosConfig";
import { toast } from "sonner";

export default function SignUpPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    console.log("data: ", data)
    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axiosInstance.post('accounts/user/signup/',{
            data
        })
        if (response.status === 201){
            toast.success("User Created Successfully!")
            navigate('/login')
        }else{
            console.error("error response: ", response)
            toast.error("something went wrong")
        }

      
    //   navigate("/login");
    } catch (err) {
        if (err.response && err.response.status === 400) {
            
            const errorData = err.response.data;
            console.error("Error response data: ", errorData);
    
            
            if (errorData.email) {
                toast.error(`${errorData.email[0]}`);
            }else if (errorData.username) {
                toast.error(`${errorData.username[0]}`);
            } else if (errorData.password) {
                toast.error(`${errorData.password[0]}`);
            } else {
                toast.error("Something went wrong with your request.");
            }
        } else {
            console.error("Unexpected error: ", err);
            toast.error("An unexpected error occurred.");
        }
    }
    
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] flex flex-col">
      <nav className="flex items-center justify-between px-16 py-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#403D39] to-[#EB5E28] bg-clip-text text-transparent">
          SPOTLIGHT.
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create an account</h1>
            <p className="text-gray-600">Join Spotlight today</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-fifth outline-none ${
                  errors.username ? "border-red-500" : ""
                }`}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Username can only contain letters, numbers and underscores",
                  },
                })}
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-fifth outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-fifth outline-none ${
                  errors.password ? "border-red-500" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                  },
                })}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={`w-full p-3 border rounded-lg focus:ring-1 focus:ring-fifth outline-none ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-primary text-fifth py-3 rounded-full hover:bg-primaryhover transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-secondary hover:text-primary font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}