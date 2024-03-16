import LoginForm from "@/app/components/LoginForm";

interface Props {
  callbackUrl?: string;
}

const page = (props: Props) => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
