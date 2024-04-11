"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  length: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  length,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "12";

  return (
    <div className="flex justify-center gap-2 py-2">
      <button
        className={`${
          !hasPrevPage ? "bg-dark_pink" : "bg-pink"
        } rounded-md text-dark text-white p-1 hover:scale-105`}
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(
            `posts/?page=${
              Number(page) - 1
            }&per_page=${per_page}`
          );
        }}
      >
        Prev page
      </button>

      <div>
        {page} / {Math.ceil(length / Number(per_page))}
      </div>

      <button
        className={`${
          !hasNextPage ? "bg-dark_pink" : "bg-pink"
        } rounded-md text-white p-1 text-dark hover:scale-105`}
        disabled={!hasNextPage}
        onClick={() => {
          router.push(
            `posts/?page=${
              Number(page) + 1
            }&per_page=${per_page}`
          );
        }}
      >
        Next page
      </button>
    </div>
  );
};

export default PaginationControls;
