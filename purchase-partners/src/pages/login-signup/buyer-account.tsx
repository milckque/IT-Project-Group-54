import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

type AuthMode = "signup" | "login";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phoneNumber: z.string().min(5),
  country: z.string().min(1),
  postcode: z.string().min(1),
  username: z.string().min(1).max(50),
  password: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

function BuyerAccount() {
  const [active, setActive] = useState<AuthMode>("signup");

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div
        className="flex-[1] bg-cover bg-center"
        style={{ backgroundImage: "url('./bg.png')" }}
      ></div>

      <div className="flex-[5] bg-whtie items-center">
        <div className="m-10 bg-[#E3DBD9]/50 p-6 rounded-xl">
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

              {/* form starts here */}
              <div className="m-5 flex flex-col items-center">
                {active === "signup" ? (
                  <form
                    className="flex flex-col items-center"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* first & last name */}
                    <div className="flex gap-10">
                      {/* first name */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
                          {...register("firstName")}
                          type="text"
                          placeholder="Name"
                          className="border w-80 p-2 rounded-lg"
                        />
                      </div>

                      {/* last name */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Last Name
                        </label>
                        <input
                          {...register("lastName")}
                          type="text"
                          placeholder="Name"
                          className="border w-80 p-2 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* email */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className="border w-170 p-2 rounded-lg"
                      />
                    </div>

                    {/* phone number */}
                    <div className="mt-4">
                      <label className="block font-poppins text-sm font-medium mb-1">
                        Phone number
                      </label>
                      <input
                        {...register("phoneNumber")}
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
                              setValue("country", country.name, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                              // setCountryid(country.id);
                              // console.log("Selected country:", country);
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
                          {...register("postcode")}
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
                        {...register("username")}
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
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="border w-170 p-2 rounded-lg"
                      />
                    </div>

                    {/* submit button */}
                    <div className="flex mt-10 items-center">
                      <button
                        type="submit"
                        className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl cursor-pointer text-1xl 
                    text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? "Loading..." : "Sign up"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <form className=" flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="Email"
                      className="border p-2"
                    />
                  </form>
                )}

                {/* <div className="mt-10">
                  {active === "signup" ? (
                    <button
                      type="submit"
                      className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl cursor-pointer text-1xl 
                    text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "Loading..." : "Sign up"}
                    </button>
                  ) : (
                    <button
                      className="w-80 h-15 bg-black rounded-full shadow-lg hover:shadow-xl cursor-pointer text-1xl 
                    text-white text-center font-inter font-medium flex items-center justify-center gap-2"
                    >
                      Log in
                    </button>
                  )}
                </div> */}
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

// const formSchema = z.object({
//   email: z.string().email(),
//   username: z.string().min(3).max(50),
//   password: z.string().min(8),
// });

export default BuyerAccount;
