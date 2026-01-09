import React from "react";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundBack } from "react-icons/io";

const QuestionStats = () => {
  return (
    <main className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-8">
      <div className="bg-black inline-flex p-2 rounded-lg mb-3">
        <Link href="/profile">
          <IoMdArrowRoundBack className="text-white text-lg" />
        </Link>
      </div>
      <section className="flex justify-between items-center mb-3 font-semibold text-[14px]">
        <div>
          <p>Total votes: </p>
          <p>Votes left: </p>
        </div>
        <div className="bg-green-200 text-black px-6 font-semibold py-2 rounded-full text-[12px]">
          <p>Active</p>
        </div>
      </section>
      <section className="my-5 border border-black/20 rounded-lg p-4">
        <h2 className="text-[18px] font-bold mb-2">Question</h2>
        <p className="text-[14px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, enim!
        </p>
        <div className="flex justify-between items-center  px-2 text-[12px] rounded-lg py-4 my-2">
          <div className="w-[48%] text-center border-r border-black/20">
            <p className="uppercase mb-2 flex items-center justify-center">
              <GoDotFill className="text-lg text-green-400 mr-2" /> option a{" "}
            </p>
            <p className="font-bold text-[20px]">11</p>
            <p>60%</p>
          </div>
          <div className="w-[48%] text-center">
            <p className="uppercase mb-2 flex items-center justify-center">
              <GoDotFill className="text-lg text-red-400 mr-2" /> option b{" "}
            </p>
            <p className="font-bold text-[20px]">9</p>
            <p>40%</p>
          </div>
        </div>
        <div className="my-4 border-t border-black/20 py-4">
          <h2 className="font-bold mb-4">Comments</h2>
          <div>
            <p className="text-[12px] flex items-center mb-3">
              {" "}
              <GoDotFill className="text-xl text-green-400 mr-2" /> Lorem ipsum
              dolor sit amet consectetur.
            </p>
            <p className="text-[12px] flex items-center mb-3">
              {" "}
              <GoDotFill className="text-xl text-red-400 mr-2" /> Lorem ipsum
              dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuestionStats;
