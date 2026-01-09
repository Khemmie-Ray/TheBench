"use client";

import React, { useState } from "react";
import Link from "next/link";

const Profile = () => {
  const [id, setId] = useState();

  return (
    <main className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12">
      <section className="flex justify-between items-center border border-black/20 px-2 text-[12px] rounded-lg py-4">
        <div className="w-[32%] text-center">
          <p className="uppercase mb-2">Seeks</p>
          <p className="font-bold text-[20px]">10</p>
        </div>
        <div className="w-[32%] text-center border-r  border-l border-black/20">
          <p className="uppercase mb-2">Assess</p>
          <p className="font-bold text-[20px]">10</p>
        </div>
        <div className="w-[32%] text-center">
          <p className="uppercase mb-2">Seeks</p>
          <p className="font-bold text-[20px]">10</p>
        </div>
      </section>
      <section className="my-5 border border-black/20 rounded-lg p-4 shadow-md">
        <Link href={`/profile/${id}`}>
          <h2 className="text-[18px] font-bold mb-2">Question</h2>
          <p className="text-[14px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            enim!
          </p>
          <div className="flex justify-between items-center  px-2 text-[12px] rounded-lg py-4 my-2">
            <div className="w-[48%] text-center border-r border-black/20">
              <p className="uppercase mb-2">option a</p>
              <p className="font-bold text-[20px]">10</p>
            </div>
            <div className="w-[48%] text-center">
              <p className="uppercase mb-2">option b</p>
              <p className="font-bold text-[20px]">10</p>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
};

export default Profile;
