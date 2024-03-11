import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Login</h1>
      <h3 className="mb-3 text-sm font-light">
        If you have an account already, please log in
      </h3>
      <form className="flex flex-col gap-3 text-dark">
        <input
          placeholder="Email"
          type="email"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
        />
        <input
          placeholder="Password"
          type="password"
          className="px-3 py-1 border-4 border-black rounded-md outline-none w-72 text-md focus:border-dark_pink"
        />

        <button className="inline-block text-lg font-bold rounded-md bg-pink hover:bg-dark_pink">
          LOGIN
        </button>
      </form>
      <h3 className="mt-3 text-sm font-light">
        Don&apos;t have an account?
        <Link
          className="ml-1 text-base text-pink hover:text-dark_pink"
          href="/register"
        >
          Register
        </Link>
      </h3>
    </div>
  );
};

export default LoginForm;
