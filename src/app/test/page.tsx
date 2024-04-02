"use client";

const page = async () => {
  const newPost = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={newPost}>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default page;
