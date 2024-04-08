import { seedPost } from "@/lib/seed";

const page = async () => {
  const posts = await seedPost();

  return <div></div>;
};

export default page;
