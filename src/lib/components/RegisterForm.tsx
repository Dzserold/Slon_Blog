import Input from "@/lib/components/Input";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="p-4 text-3xl font-bold">Register</h1>
      <h3 className="mb-3 text-sm font-light">
        If you would like to create an account, please register
      </h3>
      <form className="flex flex-col gap-3 text-dark">
        <Input placeholder="Email" type="email" name="email" />
        <Input placeholder="Password" type="password" name="password" />
        <Input placeholder="Password" type="password" name="password" />
        <button className="inline-block text-lg font-bold rounded-md bg-pink hover:bg-dark_pink">
          LOGIN
        </button>
      </form>
      <h3 className="mt-3 text-sm font-light">
        Already have an account?
        <Link
          className="ml-1 text-base text-pink hover:text-dark_pink"
          href="/login"
        >
          Login
        </Link>
      </h3>
    </div>
  );
};

export default LoginForm;
