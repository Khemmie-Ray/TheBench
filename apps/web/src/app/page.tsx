import React from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <main className="flex-1">
      <section className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md mx-auto p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stuck? Get clarity here.
          </h1>

          <p className="text-lg text-gray-600 mb-6">
            Share your dilemma, set two options, and let the crowd guide your
            next move.
          </p>
          <Image
            src="https://res.cloudinary.com/dy7el0ucd/image/upload/v1765135364/gavel_elbnbr.svg"
            alt=""
            width={200}
            height={200}
            className="mx-auto"
          />
          <div className="flex justify-between items-center my-8">
            <Link
              href="/seek"
              className="p-3 rounded-lg bg-[#1A1A1A] text-white w-[48%] hover:bg-[#E5E5E5] font-bold shadow-lg hover:text-[#1A1A1A]"
            >
              Seek
            </Link>
            <Link
              href="/assessor"
              className="p-3 rounded-lg border shadow-lg border-[#1A1A1A]/50 text-[#1A1A1A] font-bold w-[48%] hover:bg-[#E5E5E5] hover:border-none"
            >
              Assessor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
