import { logOut } from "@/lib/session";

export const LogoutForm = () => {
  return (
    <form action={logOut}>
      <button className="p-2 text-lg font-normal hover:text-dark_pink">
        LOG OUT
      </button>
    </form>
  );
};
