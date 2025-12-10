"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import useCreateQuestion from "@/hooks/useCreateQuestion";

const Seek: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [optionA, setOptionA] = useState<string>("");
  const [optionB, setOptionB] = useState<string>("");
  const MAX_CHARS = 280;

  const { isConnected } = useAccount();
  const {
    createQuestion,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  } = useCreateQuestion();

  const countChars = (str: string): number => str.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    const charCount = countChars(value);

    if (charCount <= MAX_CHARS) {
      setText(value);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const tx = await createQuestion(text, optionA, optionB);
      console.log(tx)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to create question";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (isPending) {
      toast.loading("Waiting for wallet confirmation...", {
        id: "transaction-status",
      });
    }
  }, [isPending]);


  useEffect(() => {
    if (isConfirming && hash) {
      toast.loading("Transaction submitted! Waiting for confirmation...", {
        id: "transaction-status",
        description: "This may take a few moments",
      });
    }
  }, [isConfirming, hash]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Question created successfully!", {
        id: "transaction-status",
        description: hash ? "Transaction confirmed on blockchain" : undefined,
        action: hash
          ? {
              label: "View on Etherscan",
              onClick: () =>
                window.open(`https://etherscan.io/tx/${hash}`, "_blank"),
            }
          : undefined,
      });

      setText("");
      setOptionA("");
      setOptionB("");
    }
  }, [isSuccess, hash]);

  useEffect(() => {
    if (error) {
      toast.dismiss("transaction-status");

      const errorMessage = error.message || "Transaction failed";

      if (errorMessage.includes("User rejected") || errorMessage.includes("User denied")) {
        toast.error("Transaction rejected by user");
      } else if (errorMessage.includes("insufficient funds")) {
        toast.error("Insufficient funds for transaction");
      } else {
        toast.error("Transaction failed", {
          description: errorMessage.slice(0, 100),
        });
      }
    }
  }, [error]);

  const charCount = countChars(text);
  const isOverLimit = charCount > MAX_CHARS;
  const isSubmitting = isPending || isConfirming;

  return (
    <div className="lg:w-[40%] mx-auto md:w-[50%] w-[90%] my-12">
      <h2 className="text-[28px] text-center font-semibold mb-6">
        Seek Clarity.
      </h2>

      <div className="space-y-4">
        <div className="my-4">
          <label className="block text-[16px] font-medium mb-1">
            Describe your dilemma
          </label>
          <textarea
            className={`w-full border rounded-lg p-3 text-[13px] h-40 focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] ${
              isOverLimit ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="What's on your mind?"
            value={text}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <p
            className={`text-xs mt-1 ${
              isOverLimit ? "text-red-500" : "text-gray-500"
            }`}
          >
            {charCount}/{MAX_CHARS} characters
          </p>
        </div>

        <div className="mb-3">
          <label className="block text-[16px] font-medium mb-1">
            Option A
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
            placeholder="First option"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-[16px] font-medium mb-1">
            Option B
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1A1A1A]"
            placeholder="Second option"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-20"></div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || !isConnected || isOverLimit}
          className={`w-full p-3 rounded-lg shadow-lg font-medium transition-all ${
            isSubmitting || !isConnected || isOverLimit
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"
          }`}
        >
          {!isConnected
            ? "Connect Wallet to Submit"
            : isSubmitting
            ? "Processing..."
            : "Submit Question"}
        </button>

        {!isConnected && (
          <p className="text-center text-sm text-gray-600 mt-2">
            Please connect your wallet to create a question
          </p>
        )}
      </div>
    </div>
  );
};

export default Seek;