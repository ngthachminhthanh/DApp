import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";
import type { UserProfile, ProfileFormData } from "@/types";
import { toast } from "sonner";

const USER_PROFILE_KEY = ["userProfile"];

export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: USER_PROFILE_KEY,
    queryFn: async () => {
      const res = await axiosClient.get("/users/profile");
      return res.data;
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UserProfile, Error, ProfileFormData>({
    mutationFn: async (payload) => {
      const res = await axiosClient.put("/users/profile", payload);
      toast.success("Updated profile successfully!");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_PROFILE_KEY });
    },
  });
};
