import { logOut } from "@/lib/functions";

export const LogoutForm = () => {
  return (
    <form action={logOut}>
      <button className="p-2 text-lg font-bold hover:text-dark_pink">
        Log Out
      </button>
    </form>
  );
};
