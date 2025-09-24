import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { z } from "zod";

type AuthMode = "signup" | "login";

function buyerAccount() {
  const [active, setActive] = useState<AuthMode>("signup");

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

              <div className="m-5 flex items-center">
                {active === "signup" ? (
                  <form className="">
                    {/* first & last name */}
                    <div className="flex gap-10">
                      {/* first name */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          First Name
                        </label>
                        <input
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
                        <input
                          type="text"
                          placeholder="Name"
                          className="border w-80 p-2 rounded-lg"
                        />
                      </div>

                      {/* postcode */}
                      <div className="flex-1">
                        <label className="block font-poppins text-sm font-medium mb-1">
                          Postcode
                        </label>
                        <input
                          type="text"
                          placeholder="postcode"
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
                        type="text"
                        placeholder="Password"
                        className="border w-170 p-2 rounded-lg"
                      />
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

export default buyerAccount;
