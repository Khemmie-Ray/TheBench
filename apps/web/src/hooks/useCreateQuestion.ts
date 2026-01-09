import {
    useWriteContract,
    useWaitForTransactionReceipt,
  } from "wagmi";
  import type { Address } from "viem";
  import { celoSepolia, celo } from "viem/chains";
  
  const CONTRACT_ADDRESS: Address =
    "0x9f0997c0CD7E5C7Db88f96973f54ed37C3ecA9Fa";
  
  const CONTRACT_ABI = [
    {
      type: "function",
      name: "createQuestion",
      inputs: [
        { name: "_ask", type: "string" },
        { name: "_optionA", type: "string" },
        { name: "_optionB", type: "string" },
      ],
      outputs: [{ name: "qId", type: "uint256" }],
    },
  ] as const;
  
  const useCreateQuestion = () => {
    const {
      writeContractAsync,
      data: hash,
      isPending,
      error,
    } = useWriteContract();
  
    const {
      isLoading: isConfirming,
      isSuccess,
      error: receiptError,
    } = useWaitForTransactionReceipt({
      hash,
    });
  
    const createQuestion = async (
      ask: string,
      optionA: string,
      optionB: string
    ) => {
      if (!ask.trim()) throw new Error("Please describe your dilemma");
      if (!optionA.trim()) throw new Error("Please provide Option A");
      if (!optionB.trim()) throw new Error("Please provide Option B");
      if (optionA.trim() === optionB.trim())
        throw new Error("Options must differ");
  
      try {
        const txHash = await writeContractAsync({
          chainId: celoSepolia.id,  
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "createQuestion",
          args: [ask.trim(), optionA.trim(), optionB.trim()],
        });
  
        return txHash;
      } catch (err) {
        console.error("createQuestion error:", err);
        throw err;
      }
    };
  
    return {
      createQuestion,
      hash,
      isPending,
      isConfirming,
      isSuccess,
      error: error || receiptError,
    };
  };
  
  export default useCreateQuestion;  