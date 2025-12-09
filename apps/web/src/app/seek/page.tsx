"use client";

import React, { useState } from "react";

const Seek = () => {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const wordCount = value.trim().split(/\s+/).length;

    if (wordCount <= 280) {
      setText(value);
    }
  };

  return (
    <div className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12">
      <h2 className="text-[28px] text-center font-semibold mb-6">Seek Clarity.</h2>

      <div className="space-y-4">
        <div className="my-4">
          <label className="block text-[16px] font-medium mb-1">
            Describe your dilemma
          </label>
          <textarea
            className="w-full border rounded-lg p-3 text-[13px] h-40"
            placeholder="What's on your mind?"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 mt-1">
            {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}/280 words
          </p>
        </div>

        <div className="mb-3">
          <label className="block text-[16px] font-medium mb-1">Option A</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3 text-[13px]"
            placeholder="First option"
          />
        </div>
        <div>
          <label className="block text-[16px] font-medium mb-1">Option B</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3 text-[13px]"
            placeholder="Second option"
          />
        </div>
        <div className="mt-20"></div>
        <button
          type="button"
          className="w-full bg-[#1A1A1A] text-white p-3 rounded-lg shadow-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Seek;
