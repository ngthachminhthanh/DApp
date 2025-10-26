import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import XIcon from "@/assets/icons/connect-x-icon.svg?react";
import TelegramIcon from "@/assets/icons/connect-telegram-icon.svg?react";
import GithubIcon from "@/assets/icons/profile-github-icon.svg?react";
import { type ProfileFormData } from "@/types";
import { useUserProfile, useUpdateUserProfile } from "@/hooks/useUserProfile";

const REGEX = {
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[^\s]*)?$/,
  telegram: /^(https?:\/\/)?(t\.me|telegram\.me)\/[A-Za-z0-9_]{5,}$/,
  github: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
};

const MESSAGES = {
  required: "This field is required",
  invalidXUrl: "Please enter a valid X URL",
  invalidTelegram: "Please enter a valid Telegram URL",
  invalidGithub: "Please enter a valid GitHub profile URL",
  bioTooLong: "Biography must be under 200 characters",
};

const SOCIAL_FIELDS = [
  {
    name: "xUrl",
    icon: XIcon,
    placeholder: "Not Connected",
    pattern: REGEX.url,
    message: MESSAGES.invalidXUrl,
  },
  {
    name: "telegramUrl",
    icon: TelegramIcon,
    placeholder: "Not Connected",
    pattern: REGEX.telegram,
    message: MESSAGES.invalidTelegram,
  },
  {
    name: "githubUrl",
    icon: GithubIcon,
    placeholder: "Not Connected",
    pattern: REGEX.github,
    message: MESSAGES.invalidGithub,
  },
];

export default function EditProfileDialog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: "",
      bio: "",
      telegramUrl: "",
      xUrl: "",
      githubUrl: "",
    },
  });

  const { data: profile } = useUserProfile();
  const updateProfile = useUpdateUserProfile();

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data);
  };

  useEffect(() => {
    if (profile) reset(profile);
  }, [profile, reset]);

  return (
    <div className="p-4 space-y-4 rounded-[16px]">
      <h2 className="text-center font-semibold">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 !mt-6">
        <div>
          <label className="block text-sm font-medium !mb-2">Name</label>
          <Input
            {...register("username", { required: MESSAGES.required })}
            placeholder="John"
            className="border-teal-400 focus-visible:ring-teal-400 bg-[#F5FBFB]"
          />
          {errors.username && (
            <p className="text-red-500 text-sm !my-2">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium !mb-2 !mt-4">
            Biography
          </label>
          <Textarea
            {...register("bio", {
              maxLength: { value: 200, message: MESSAGES.bioTooLong },
            })}
            placeholder="Write your biography here!"
            rows={4}
            className="resize-none bg-[#F5FBFB]"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm !my-2">{errors.bio.message}</p>
          )}
        </div>

        <Button type="submit" className="text-white !mt-2 !mb-3">
          Save
        </Button>

        <div>
          <p className="font-medium">Social Links</p>
          <div className="!space-y-2 !mt-2">
            {SOCIAL_FIELDS.map(
              ({ name, icon: Icon, placeholder, pattern, message }) => {
                const fieldName = name as keyof ProfileFormData;

                return (
                  <div key={name} className="relative w-full">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
                      <Icon className="w-6 h-6" />
                    </span>
                    <Input
                      {...register(fieldName, {
                        pattern: { value: pattern, message },
                      })}
                      placeholder={placeholder}
                      className="pl-10"
                    />
                    {errors[fieldName] && (
                      <p className="text-red-500 text-sm">
                        {errors[fieldName]?.message as string}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full rounded-full bg-[#D2E5E7] text-gray-500 !mt-4"
          variant="secondary"
        >
          Save
        </Button>
      </form>
    </div>
  );
}
