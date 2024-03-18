import prisma from "@/lib/client";

const page = async () => {
  const u = await prisma.user.findUnique({
    where: { email: "f.dzserold@gmail.com" },
  });
  console.log(u);

  return (
    <div>
      <p>Hello</p>
    </div>
  );
};

export default page;
