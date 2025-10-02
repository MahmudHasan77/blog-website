import Link from "next/link";
import './not-found.css'
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
export default function NotFound() {
  return (
    <div className="notFoundDiv">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
        <div className="text-orange-500 text-center py-1 relative w-80 mx-auto">
          <Link
          prefetch={true}
            href={"/"}
            className="border-b font-semibold text-sm border-orange-300 border-dashed pb-0.5"
          >
            Go to Home Page
            <span className="absolute top-3 right-1/5">
              <MdKeyboardDoubleArrowLeft />
            </span>
            <span className="absolute top-3 left-1/5">
              <MdKeyboardDoubleArrowLeft />
            </span>
          </Link>
        </div>
    </div>
  );
}
