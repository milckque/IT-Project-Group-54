import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

type AuthMode = "signup" | "login";

const signupSchema = z.object({
  sellerName: z.string().min(1, { message: "Seller name is required" }),
  storeName: z.string().min(1, { message: "Store name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(5),
  country: z.string().min(1),
  postcode: z.string().min(1),
  username: z.string().min(3).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email address is required" }),
  password: z.string().min(8, { message: "Incorrect password" }),
});

type SignupFields = z.infer<typeof signupSchema>;
type LoginFields = z.infer<typeof loginSchema>;

function SellerAccount() {
  const [active, setActive] = useState<AuthMode>("signup");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  const signupForm = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  const loginForm = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignupSubmit: SubmitHandler<SignupFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("signup", data);
      navigate("/seller-dashboard");
    } catch (error) {
      signupForm.setError("root", { message: "This email is already taken" });
    }
  };

  const handleLoginSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      setShowForgotPassword(false); // Reset on new attempt
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("login", data);
      navigate("/seller-dashboard");
    } catch (error) {
      setShowForgotPassword(true);
      loginForm.setError("root", { message: "Incorrect email or password" });
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div
        className="flex-[1] bg-cover bg-center"
        style={{ backgroundImage: "url('./bg.png')" }}
      ></div>

      <div className="flex-[5] bg-whtie items-center justify-center flex">  
        <div className="m-5 bg-[#E3DBD9]/50 p-6 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="m-5 flex flex-col items-center">
              <div className="flex w-200 h-12 border-1 border-black rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setActive("signup");
                    setShowForgotPassword(false);
                  }}
                  className={`flex-1 font-bold font-poppins ${
                    active === "signup"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Sign up
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActive("login");
                    setShowForgotPassword(false);
                  }}
                  className={`flex-1 font-bold font-poppins ${
                    active === "login"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Log in
                </button>
              </div>

              {/* sign up form starts here */}
              <div className="mt-8 flex flex-col items-center">
                {active === "signup" ? (
                  <form
                    className="flex flex-col items-center"
                    onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
                  >
                    {/* first & last name */}
                    <div className="flex gap-10">
                      {/* Seller name */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Seller Name
                        </label>
                        <input
                          {...signupForm.register("sellerName")}
                          type="text"
                          placeholder="Name"
                          className="border w-80 p-2 rounded-lg"
                        />
                        {signupForm.formState.errors.sellerName && (
                          <p className="text-red-500 text-sm">
                            {signupForm.formState.errors.sellerName.message}
                          </p>
                        )}
                      </div>

                      {/* Store name */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Store Name
                        </label>
                        <input
                          {...signupForm.register("storeName")}
                          type="text"
                          placeholder="Name"
                          className="border w-80 p-2 rounded-lg"
                        />
                        {signupForm.formState.errors.storeName && (
                          <p className="text-red-500 text-sm">
                            {signupForm.formState.errors.storeName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* email */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        {...signupForm.register("email")}
                        type="email"
                        placeholder="Email"
                        className="border w-170 p-2 rounded-lg"
                      />
                      {signupForm.formState.errors.email && (
                        <p className="text-red-500 text-sm">
                          {signupForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* phone number */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        Phone number
                      </label>
                      <input
                        {...signupForm.register("phoneNumber")}
                        type="tel"
                        placeholder="Phone number"
                        className="border w-170 p-2 rounded-lg"
                      />
                    </div>

                    {/* country & postcode */}
                    <div className="flex mt-4 gap-10">
                      {/* country */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Country
                        </label>
                        <div className="border rounded-lg w-80">
                          <CountrySelect
                            containerClassName="form-group"
                            inputClassName=""
                            onChange={(country: any) => {
                              signupForm.setValue("country", country.name, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }}
                            placeHolder="Select Country"
                          />
                        </div>
                      </div>

                      {/* postcode */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Postcode
                        </label>
                        <input
                          {...signupForm.register("postcode")}
                          type="text"
                          placeholder="Postcode"
                          className="border w-80 p-2 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* username */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        User name
                      </label>
                      <input
                        {...signupForm.register("username")}
                        type="text"
                        placeholder="User name"
                        className="border w-170 p-2 rounded-lg"
                      />
                    </div>

                    {/* password */}
                  <div className="mt-4">
                    <label className="block font-poppins text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      {...signupForm.register("password")}
                      type="password"
                      placeholder="Password"
                      className="border w-170 p-2 rounded-lg"
                    />
                    {signupForm.formState.errors.password && (
                      <p className="text-red-500 text-sm">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* confirm password */}
                  <div className="mt-4">
                    <label className="block font-poppins text-sm font-medium mb-1">
                      Confirm Password
                    </label>
                    <input
                      {...signupForm.register("confirmPassword")}
                      type="password"
                      placeholder="Confirm Password"
                      className="border w-170 p-2 rounded-lg"
                    />
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {signupForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                    {/* submit button */}
                    <div className="flex mt-10 items-center">
                      <button
                        type="submit"
                        className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl hover:bg-[#ffc106] cursor-pointer text-1xl 
                    text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                      >
                        {signupForm.formState.isSubmitting
                          ? "Loading..."
                          : "Sign up"}
                      </button>
                    </div>
                  </form>
                ) : (
                  // log in form
                  <form
                    className="flex flex-col items-center"
                    onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                  >
                    {loginForm.formState.errors.root && (
                      <p className="text-red-600 mb-4">
                        {loginForm.formState.errors.root.message as string}
                      </p>
                    )}

                    {/* email */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        {...loginForm.register("email")}
                        type="email"
                        placeholder="Email"
                        className="border w-170 p-2 rounded-lg"
                      />
                      {loginForm.formState.errors.email && (
                        <p className="text-red-500 text-sm">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* password */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        Password
                      </label>
                      <input
                        {...loginForm.register("password")}
                        type="password"
                        placeholder="Password"
                        className="border w-170 p-2 rounded-lg"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-red-500 text-sm">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Forgot Password Button */}
                    {showForgotPassword && (
                      <div className="mt-3 w-170">
                        <button
                          type="button"
                          className="text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* submit button */}
                    <div className="flex mt-10 items-center">
                      <button
                        type="submit"
                        className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl hover:bg-[#ffc106] cursor-pointer text-1xl 
                    text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                      >
                        {loginForm.formState.isSubmitting
                          ? "Loading..."
                          : "Log in"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex-[1] bg-cover bg-center"
        style={{ backgroundImage: "url('./bg.png')" }}
      ></div>
    </div>
  );
}

export default SellerAccount;