import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { CountrySelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { useAuth } from "../../backend/AuthContext";
import supabase from "../../supabaseClient";

type AuthMode = "signup" | "login";

// Profiles table expects: first_name, last_name, email, auth_id, country_name, phone_no, postcode
const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(5, { message: "Phone number is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email address is required" }),
  password: z.string().min(8, { message: "Incorrect password" }),
});

type SignupFields = z.infer<typeof signupSchema>;
type LoginFields = z.infer<typeof loginSchema>;

export default function BuyerAccount() {
  const [active, setActive] = useState<AuthMode>("login");
  const navigate = useNavigate();
  const {
    signInWithEmail,
    signUpWithEmail,
    loading: authLoading,
    error: authError,
    user,
  } = useAuth();

  // If already logged in, redirect away from login/signup page
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const signupForm = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });
  const loginForm = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignupSubmit: SubmitHandler<SignupFields> = async (data) => {
    try {
      // Call auth context to sign up
      await signUpWithEmail(data.email, data.password);

      // Try to read the current session for the new user
      const { data: sessionResp, error: sessionErr } =
        await supabase.auth.getSession();
      if (sessionErr) throw sessionErr;
      const session = (sessionResp as any).session;
      const authUser = session?.user ?? null;

      if (!authUser) {
        // If email confirmation is required, inform the user
        signupForm.setError("root", {
          message:
            "Signup initiated. Please check your email to confirm. After confirming, sign in to complete profile creation.",
        });
        return;
      }

      // Insert profile
      const { error: insertErr } = await supabase.from("Profiles").insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          auth_id: authUser.id,
          country_name: data.country,
          phone_no: data.phoneNumber,
          postcode: data.postcode,
        },
      ]);
      if (insertErr) throw insertErr;

      navigate("/dashboard");
    } catch (err: any) {
      const message = (err && err.message) || authError || "Signup failed";
      signupForm.setError("root", { message });
    }
  };

  const handleLoginSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      await signInWithEmail(data.email, data.password);
      navigate("/dashboard");
    } catch (err: any) {
      const message = (err && err.message) || authError || "Login failed";
      loginForm.setError("root", { message });
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div
        className="flex-[1] bg-cover bg-center"
        style={{ backgroundImage: "url('./bg.png')" }}
      ></div>

      <div className="flex-[5] bg-whtie items-center">
        <div className="m-5 bg-[#E3DBD9]/50 p-6 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="m-5 flex flex-col items-center">
              <div className="flex w-200 h-12 border-1 border-black rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setActive("signup")}
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
                  onClick={() => setActive("login")}
                  className={`flex-1 font-bold font-poppins ${
                    active === "login"
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  Log in
                </button>
              </div>

              <div className="mt-8 flex flex-col items-center">
                {active === "signup" ? (
                  <form
                    className="flex flex-col items-center"
                    onSubmit={signupForm.handleSubmit(handleSignupSubmit)}
                  >
                    {signupForm.formState.errors.root && (
                      <p className="text-red-600 mb-4">
                        {signupForm.formState.errors.root.message as string}
                      </p>
                    )}

                    <div className="flex gap-10">
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          {...signupForm.register("firstName")}
                          type="text"
                          placeholder="First name"
                          className="border w-80 p-2 rounded-lg"
                        />
                        {signupForm.formState.errors.firstName && (
                          <p className="text-red-500 text-sm">
                            {signupForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          {...signupForm.register("lastName")}
                          type="text"
                          placeholder="Last name"
                          className="border w-80 p-2 rounded-lg"
                        />
                        {signupForm.formState.errors.lastName && (
                          <p className="text-red-500 text-sm">
                            {signupForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

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
                      {signupForm.formState.errors.phoneNumber && (
                        <p className="text-red-500 text-sm">
                          {signupForm.formState.errors.phoneNumber.message}
                        </p>
                      )}
                    </div>

                    <div className="flex mt-4 gap-10">
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Country
                        </label>
                        <div className="border rounded-lg w-80">
                          <CountrySelect
                            containerClassName="form-group"
                            inputClassName=""
                            onChange={(country: any) =>
                              signupForm.setValue("country", country.name, {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
                            }
                            placeHolder="Select Country"
                          />
                        </div>
                        {signupForm.formState.errors.country && (
                          <p className="text-red-500 text-sm">
                            {signupForm.formState.errors.country.message}
                          </p>
                        )}
                      </div>

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
                        {signupForm.formState.errors.postcode && (
                          <p className="text-red-500 text-sm">
                            {signupForm.formState.errors.postcode.message}
                          </p>
                        )}
                      </div>
                    </div>

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

                    <div className="flex mt-10 items-center">
                      <button
                        type="submit"
                        disabled={
                          signupForm.formState.isSubmitting || authLoading
                        }
                        className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl hover:bg-[#ffc106] cursor-pointer text-1xl text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                      >
                        {signupForm.formState.isSubmitting || authLoading
                          ? "Loading..."
                          : "Sign up"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    className="flex flex-col items-center"
                    onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                  >
                    {loginForm.formState.errors.root && (
                      <p className="text-red-600 mb-4">
                        {loginForm.formState.errors.root.message as string}
                      </p>
                    )}

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

                    <div className="flex mt-10 items-center">
                      <button
                        type="submit"
                        disabled={
                          loginForm.formState.isSubmitting || authLoading
                        }
                        className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl hover:bg-[#ffc106] cursor-pointer text-1xl text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                      >
                        {loginForm.formState.isSubmitting || authLoading
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
      />
    </div>
  );
}
