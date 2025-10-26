import { useForm } from "react-hook-form";
import { Input, Button, Label } from "@/components/ui";
import { type TokenMintFormData } from "@/types";
import { useMintToken } from "@/hooks/useMintToken";
import { toast } from "sonner";

interface TokenMintModalProps {
  tokenAddress: `0x${string}`;
  tokenName: string;
}

export default function TokenMintModal({ tokenAddress, tokenName }: TokenMintModalProps) {
  const { mintToken, isPending, isConfirming, isSuccess } = useMintToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenMintFormData>({
    defaultValues: {
      amountPerMint: 10,
      mintFee: 0.012,
    },
  });

  const onSubmit = async (data: TokenMintFormData) => {
    try {
      await mintToken({
        tokenAddress: tokenAddress,
        mintFee: data.mintFee,
      });
      toast.success("Mint transaction sent!");
    } catch (err: any) {
      toast.error(err?.message || "Mint failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="!space-y-4 rounded-2xl">
      <h2 className="text-center font-bold text-lg">{tokenName} Token</h2>

      <div className="space-y-1">
        <Label htmlFor="amountPerMint">Amount Per Mint</Label>
        <Input
          id="amountPerMint"
          type="number"
          {...register("amountPerMint", {
            valueAsNumber: true,
            required: "Amount Per Mint is required",
          })}
          className="h-11 rounded-xl !mt-2"
        />
        {errors.amountPerMint && (
          <p className="text-red-500 text-xs !mt-1">
            {errors.amountPerMint.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="mintFee">Mint Fee</Label>
        <div className="relative">
          <Input
            id="mintFee"
            type="number"
            step="0.001"
            {...register("mintFee", {
              valueAsNumber: true,
              required: "Mint Fee is required",
            })}
            className="h-11 rounded-xl pr-12 !mt-2"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            ZKN
          </span>
        </div>
        {errors.mintFee && (
          <p className="text-red-500 text-xs !mt-1">{errors.mintFee.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending || isConfirming}
        className="w-full rounded-full h-11"
      >
        {isPending
          ? "Minting..."
          : isConfirming
          ? "Waiting for confirmation..."
          : isSuccess
          ? "Minted!"
          : "Mint"}
      </Button>
    </form>
  );
}
