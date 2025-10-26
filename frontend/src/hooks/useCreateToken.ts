import { useMutation } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import { toast } from "sonner";
import type { CreateTokenFormData, CreateTokenResponse } from "@/types";
import TokenFactoryABI from "@/abis/TokenFactoryABI.json";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState, useEffect } from "react";
import { TOKEN_FACTORY_ADDRESS } from "@/constants";

export function useCreateToken() {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const { writeContractAsync } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}` | undefined,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Smart contract executed successfully!");
    }
  }, [isSuccess]);

  return useMutation<CreateTokenResponse, Error, CreateTokenFormData>({
    mutationFn: async (payload) => {
      try {
        const tx = await writeContractAsync({
          address: TOKEN_FACTORY_ADDRESS,
          abi: TokenFactoryABI,
          functionName: "createStandardToken",
          args: [
            payload.name,
            payload.symbol,
            BigInt(payload.supply || 1) * 10n ** BigInt(payload.decimals),
            BigInt(payload.maxSupply || 100) *
              10n ** BigInt(payload.decimals),
            BigInt(payload.amountPerMint || 1),
            BigInt(payload.mintFee || 1),
          ],
          gas: 1_000_000n,
        });

        setTxHash(tx);

        const formData = new FormData();
        formData.append("image", payload.image);
        formData.append("name", payload.name);
        formData.append("symbol", payload.symbol);
        formData.append("decimals", String(payload.decimals));
        formData.append("supply", String(payload.supply));
        formData.append("description", payload.description);

        if (payload.websiteUrl)
          formData.append("websiteUrl", payload.websiteUrl);
        if (payload.telegramUrl)
          formData.append("telegramUrl", payload.telegramUrl);
        if (payload.discordUrl)
          formData.append("discordUrl", payload.discordUrl);
        if (payload.xUrl) formData.append("xUrl", payload.xUrl);

        const res = await axiosClient.post("/tokens", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      } catch (err: any) {
        throw new Error("Failed to send transaction to smart contract");
      }
    },
    onSuccess: (res) => {
      toast.success(res.message || "Token created successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create token");
    },
  });
}
