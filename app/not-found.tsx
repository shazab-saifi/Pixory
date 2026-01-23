import Footer from "@/components/Footer/Footer";
import Navbar2 from "@/components/Navbar/Navbar2";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Navbar2 />
      <div className="my-48 flex max-h-[600px] gap-16 p-8 sm:my-42">
        <div className="flex flex-col justify-evenly gap-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-medium">Oops!</h2>
            <p className="max-w-md text-wrap text-gray-800">
              We couldn&apos;t find this page.
              <br />
              It might have been moved, deleted, or you may have mistyped the
              address.
              <br />
              Please check the URL or return to the homepage.
            </p>
          </div>
          <Link
            className="w-fit cursor-pointer rounded-lg bg-black px-4 py-2 text-center font-medium text-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-colors hover:bg-black/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            href="/"
          >
            Return Home
          </Link>
        </div>
        <Image
          src="/404.jpg"
          width={400}
          height={600}
          alt="404 image"
          className="hidden rounded-xl md:block"
        />
      </div>
      <Footer />
    </div>
  );
}
