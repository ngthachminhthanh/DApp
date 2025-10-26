import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import type { UserProfile, SignInFormData, RequestResponse } from "@/types";
import { toast } from "sonner";
import { useAccount, useConnect, useDisconnect, useSignMessage, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { data: balance } = useBalance({ address });

  const requestMessage = useMutation({
    mutationFn: async (walletAddress: string): Promise<RequestResponse> => {
      const res = await axiosClient.post("/request", {
        address: walletAddress,
      });
      return res.data;
    },
  });

  const signIn = useMutation({
    mutationFn: async (payload: SignInFormData) => {
      const res = await axiosClient.post("/users/sign-in", payload);
      return res.data;
    },
  });

  const handleWeb3Login = async () => {
    try {
      let account = address;

      if (!isConnected) {
        const { accounts } = await connectAsync({
          connector: injected(),
        });
        account = accounts?.[0];
      }

      if (!account) {
        toast.error(
          "Unable to retrieve wallet address. Please reconnect your wallet."
        );
        throw new Error("Unable to retrieve wallet address.");
      }

      // const { message } = await requestMessage.mutateAsync(account);
      // const signature = await signMessageAsync({ message });
      const signature = "123456"
      
      const token = await signIn.mutateAsync({
        walletAddress: account,
        password: signature,
      });
      
      localStorage.setItem("access_token", token);
      toast.success("Wallet connected successfully!");
      navigate("/create-token", { replace: true });
    } catch (err: any) {
      if (err?.message?.includes("User rejected")) {
        toast.error("You rejected the request on MetaMask.");
      } else if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err?.code === "ACTION_REJECTED") {
        toast.error("Connection request was rejected.");
      } else {
        toast.error("Login failed. Please try again.");
      }
      throw err;
    }
  };

  const logOut = () => {
    try {
      localStorage.removeItem("access_token");
      queryClient.clear();
      setUser(null);
      disconnect();
      navigate("/", { replace: true });
      toast.success("Successfully logged out!");
    } catch (err: any) {
      toast.error(err?.message || "Logout failed. Please try again.");
    }
  };

  return {
    user,
    isLoggedIn: !!(localStorage.getItem("access_token") && address),
    address,
    isConnected,
    balance,
    handleWeb3Login,
    logOut,
  };
}
