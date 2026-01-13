"use client";
import { useMiniApp } from "@/contexts/miniapp-context";
// import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

const UserProfile = () => {
  const { context, isMiniAppReady } = useMiniApp();

  // Wallet connection hooks
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors } = useConnect();

  const user = context?.user;
  // Use connected wallet address if available, otherwise fall back to user custody/verification
  const walletAddress =
    address || user?.custody || user?.verifications?.[0] || "0x1e4B...605B";
  const displayName = user?.displayName || user?.username || "User";
  const username = user?.username || "@user";
  const pfpUrl = user?.pfpUrl;

  // Auto-connect wallet when miniapp is ready
  useEffect(() => {
    if (
      isMiniAppReady &&
      !isConnected &&
      !isConnecting &&
      connectors.length > 0
    ) {
      const farcasterConnector = connectors.find((c) => c.id === "farcaster");
      if (farcasterConnector) {
        connect({ connector: farcasterConnector });
      }
    }
  }, [isMiniAppReady, isConnected, isConnecting, connectors, connect]);

  const formatAddress = (address: string) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!isMiniAppReady) {
    return (
      <main className="flex-1">
        <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="w-full max-w-md mx-auto p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mb-8 lg:mb-0 md:mb-0 flex items-center justify-between">
      <div className="text-center lg:mr-10 md:mr-10">
        <div className="w-12 h-12  bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center overflow-hidden">
          {pfpUrl ? (
            <img
              src={pfpUrl}
              alt="Profile"
              className="w-[30px] h-[30px] object-cover rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          )}
        </div>
        <p className="text-gray-500 text-[12px]">
          {username.startsWith("@") ? username : `@${username}`}
        </p>
      </div>
      <div className="flex flex-col">
        <div
          className={`flex items-center gap-1 justify-end text-xs ${
            isConnected
              ? "text-green-600"
              : isConnecting
              ? "text-yellow-600"
              : "text-gray-500"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isConnected
                ? "bg-green-500"
                : isConnecting
                ? "bg-yellow-500"
                : "bg-gray-400"
            }`}
          ></div>
          {isConnected
            ? "Connected"
            : isConnecting
            ? "Connecting..."
            : "Disconnected"}
        </div>
        <p className="text-sm text-gray-700 font-mono ml-auto">
          {formatAddress(walletAddress)}
        </p>
      </div>
    </main>
  );
};

export default UserProfile;
