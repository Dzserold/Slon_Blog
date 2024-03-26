"use client";
import { Login } from "@/lib/login";

const page = () => {
  const register = async (FormData: any) => {
    const email = FormData.get("email");
    const password = FormData.get("password");
    const res = await Login({
      email,
      password,
    });
    console.log(res);
  };

  return (
    <div>
      <form
        action={register}
        className="flex flex-col gap-3 text-dark"
      >
        <input
          name="email"
          placeholder="Email"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="email"
        />

        <input
          name="password"
          placeholder="Password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
          type="password"
        />

        <button
          type="submit"
          className="inline-block text-lg font-bold rounded-md bg-pink hover:bg-dark_pink"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default page;
