import React from "react";
import Image from "next/image";

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
          <Image src="https://res.cloudinary.com/dy7el0ucd/image/upload/v1765135364/gavel_elbnbr.svg" alt="" width={200} height={200} className="mx-auto"/>
          <div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;