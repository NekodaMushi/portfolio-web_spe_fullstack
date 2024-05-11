// CustomPagination.tsx
"use server";
import Link from "next/link";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
}) => {
  return (
    <div className="mt-4 flex justify-center">
      <Link
        href={`${basePath}?page=${Math.max(currentPage - 1, 1)}`}
        aria-disabled={currentPage <= 1}
      >
        <a
          className={`mx-1 rounded px-4 py-2 ${currentPage <= 1 ? "cursor-not-allowed bg-gray-300 text-gray-500" : "bg-gray-100 text-gray-800"}`}
        >
          Previous
        </a>
      </Link>
      <Link
        href={`${basePath}?page=${Math.min(currentPage + 1, totalPages)}`}
        aria-disabled={currentPage >= totalPages}
      >
        <a
          className={`mx-1 rounded px-4 py-2 ${currentPage >= totalPages ? "cursor-not-allowed bg-gray-300 text-gray-500" : "bg-gray-100 text-gray-800"}`}
        >
          Next
        </a>
      </Link>
    </div>
  );
};

export default CustomPagination;
