import { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import StandardERC20ABI from "@/abis/StandardERC20ABI.json";
import { toast } from "sonner";
import { TOKEN_FACTORY_ADDRESS } from "@/constants";
import type { Token } from "@/types";
import axiosClient from "@/api/axiosClient";

export const useUserTokens = () => {
  const { address } = useAccount();
  const publicClient = usePublicClient()!;
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      if (!address) return;
      setIsLoading(true);

      const latest = await publicClient.getBlockNumber();
      const fromBlock = latest - 10_000n;
      try {
        const logs = await publicClient.getLogs({
          address: TOKEN_FACTORY_ADDRESS,
          event: {
            name: "TokenDeployed",
            type: "event",
            inputs: [
              { indexed: true, name: "owner", type: "address" },
              { indexed: false, name: "newToken", type: "address" },
              { indexed: false, name: "name", type: "string" },
              { indexed: false, name: "symbol", type: "string" },
              { indexed: false, name: "maxSupply", type: "uint256" },
              { indexed: false, name: "amountPerMint", type: "uint256" },
              { indexed: false, name: "mintFee", type: "uint256" },
            ],
          },
          fromBlock,
          toBlock: latest,
        });

        const userTokens = logs
          .filter(
            (log) => log.args.owner?.toLowerCase() === address.toLowerCase()
          )
          .map((log) => log.args.newToken as `0x${string}`);

        if (userTokens.length === 0) {
          toast.warning(`Not found any tokens of address: ${address}`);
          setTokens([]);
          setIsLoading(false);
          return;
        }

        let backendTokens: any[] = [];
        try {
          const res: any = await axiosClient.get("/tokens/user", {
            params: { limit: 100 },
          });
          backendTokens = res.data || [];
        } catch (err) {
          console.error("Failed to fetch backend tokens", err);
        }

        const tokenDetails = await Promise.all(
          userTokens.map(async (tokenAddr, index) => {
            try {
              const [
                name,
                symbol,
                totalSupply,
                maxSupply,
                balance,
              ] = await Promise.all([
                publicClient.readContract({
                  address: tokenAddr,
                  abi: StandardERC20ABI,
                  functionName: "name",
                }),
                publicClient.readContract({
                  address: tokenAddr,
                  abi: StandardERC20ABI,
                  functionName: "symbol",
                }),
                publicClient.readContract({
                  address: tokenAddr,
                  abi: StandardERC20ABI,
                  functionName: "totalSupply",
                }),
                publicClient.readContract({
                  address: tokenAddr,
                  abi: StandardERC20ABI,
                  functionName: "maxSupply",
                }),
                publicClient.readContract({
                  address: tokenAddr,
                  abi: StandardERC20ABI,
                  functionName: "balanceOf",
                  args: [address],
                }),
                publicClient.readContract({
                  address: tokenAddr,
                  abi: StandardERC20ABI,
                  functionName: "mintProcess",
                }),
              ]);

              const progress =
                (Number(totalSupply) / Number(maxSupply || 1)) * 100;

              const backendToken = backendTokens.find(
                (t: any) =>
                  t.name === String(name) && t.symbol === String(symbol)
              );

              const baseUrlInfo =
                import.meta.env.VITE_API_BASE_URL || "http://localhost:5035/v1";
              const mediaBaseUrl = baseUrlInfo.replace(/\/v1\/?$/, "");

              const imageUrl = backendToken?.image
                ? `${mediaBaseUrl}${backendToken.image}`
                : "/default-token-image.png";

              const token: Token = {
                _id: index + 1,
                address: tokenAddr,
                name: String(name),
                symbol: String(symbol),
                maxSupply: String(maxSupply),
                totalSupply: String(totalSupply),
                balance: Number(balance),
                progress,
                image: imageUrl,
              };

              return token;
            } catch (err: any) {
              toast.error(err?.message || "Error fetching token details");
              return null;
            }
          })
        );

        setTokens(tokenDetails.filter((t): t is Token => t !== null));
      } catch (error: any) {
        toast.error(error?.message || "Error fetching token events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [address, publicClient]);

  return { tokens, isLoading };
};
