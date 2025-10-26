import {
  useWriteContract,
  useWaitForTransactionReceipt,
  usePublicClient,
} from "wagmi";
import StandardERC20ABI from "@/abis/StandardERC20ABI.json";
import { toast } from "sonner";

interface MintParams {
  tokenAddress: `0x${string}`;
  mintFee: number;
}

export function useMintToken() {
  const publicClient = usePublicClient()!;
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const {
    isLoading: isConfirming,
    isSuccess,
    isError,
  } = useWaitForTransactionReceipt({
    hash,
  });

  const mintToken = async ({ tokenAddress }: MintParams) => {
    try {
      const fee: any = await publicClient.readContract({
        address: tokenAddress,
        abi: StandardERC20ABI,
        functionName: "mintFee",
      });

      await writeContract({
        abi: StandardERC20ABI,
        address: tokenAddress,
        functionName: "mint",
        value: fee,
        gas: 800000n,
      });
    } catch (err: any) {
      toast.error(err.message || "Mint token failed");
    }
  };

  return {
    mintToken,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
  };
}
