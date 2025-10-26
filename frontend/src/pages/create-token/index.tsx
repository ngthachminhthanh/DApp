import React, { useState } from "react";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Controller, useForm } from "react-hook-form";
import {
  Input,
  Textarea,
  Button,
  Label,
  Switch,
  Loading,
} from "@/components/ui";
import { Card } from "@/components/ui/card";
import HttpIcon from "@/assets/icons/http-icon.svg?react";
import TelegramIcon from "@/assets/icons/connect-telegram-icon.svg?react";
import DiscordIcon from "@/assets/icons/profile-discord-icon.svg?react";
import UploadIcon from "@/assets/icons/upload-icon.svg?react";
import { cn } from "@/lib/utils";
import { type CreateTokenFormData } from "@/types";
import { useCreateToken } from "@/hooks/useCreateToken";

const CreateToken: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<CreateTokenFormData>();
  const { mutate: createToken, isPending } = useCreateToken();

  const description = watch("description", "");
  const descLength = description?.length || 0;

  const onSubmit = (data: CreateTokenFormData) => {
    const payload = {
      image: data.image as File,
      name: data.name,
      symbol: data.symbol,
      decimals: Number(data.decimals),
      supply: Number(data.supply),
      amountPerMint: Number(data.amountPerMint),
      description: data.description,
      websiteUrl: data.websiteUrl,
      telegramUrl: data.telegramUrl,
      discordUrl: data.discordUrl,
      xUrl: data.xUrl,
    };

    createToken(payload);
  };

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            <Header title="Token Creator" />

            <main className="md:flex justify-center gap-4 px-4 py-10 bg-gray-100 h-fit">
              <div className="max-w-[852px] min-w-[70%] mx-auto py-10 bg-white px-8">
                <h1 className="text-2xl font-bold text-center">
                  Token Creator
                </h1>
                <p className=" text-[#787575] text-center !mt-2 !mb-6 font-normal">
                  Easily Create your own Token in just 7+1 steps without Coding.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="md:grid grid-cols-2 gap-6">
                    <div className="space-y-2 !mt-4 md:!mt-0">
                      <Label>
                        <span className="text-red-500">* </span>Name
                      </Label>
                      <Input
                        placeholder="Ex: Zoken"
                        {...register("name", {
                          required: "Name is required",
                          maxLength: {
                            value: 32,
                            message: "Max 32 characters",
                          },
                        })}
                        className="!mt-1"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 !mt-2">
                        Max 32 characters in your name
                      </p>
                    </div>

                    <div className="space-y-2 !mt-4 md:!mt-0">
                      <Label>
                        <span className="text-red-500">* </span>Symbol
                      </Label>
                      <Input
                        placeholder="Ex: ZKN"
                        {...register("symbol", {
                          required: "Symbol is required",
                          maxLength: { value: 8, message: "Max 8 characters" },
                        })}
                        className="!mt-1"
                      />
                      {errors.symbol && (
                        <p className="text-xs text-red-500">
                          {errors.symbol.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 !mt-2">
                        Max 8 characters in your symbol
                      </p>
                    </div>

                    <div className="space-y-2 !mt-4 md:!mt-0">
                      <Label>
                        <span className="text-red-500">* </span>Decimal
                      </Label>
                      <Input
                        type="number"
                        defaultValue={6}
                        {...register("decimals", {
                          required: "Decimal is required",
                          min: { value: 0, message: "Must be >= 0" },
                          max: { value: 18, message: "Must be <= 18" },
                        })}
                        className="!mt-1"
                      />
                      {errors.decimals && (
                        <p className="text-xs text-red-500">
                          {errors.decimals.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 !mt-2">
                        Most token use 6 decimals
                      </p>
                    </div>

                    <div className="space-y-2 !mt-4 md:!mt-0">
                      <Label>
                        <span className="text-red-500">* </span>Supply
                      </Label>
                      <Input
                        type="number"
                        defaultValue={1}
                        {...register("supply", {
                          required: "Supply is required",
                          min: { value: 1, message: "Must be > 0" },
                        })}
                        className="!mt-1"
                      />
                      {errors.supply && (
                        <p className="text-xs text-red-500">
                          {errors.supply.message}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 !mt-2">
                        Most token use 10B
                      </p>
                    </div>

                    <div className="space-y-2 !mt-4 md:!mt-0 col-span-2">
                      <Label>
                        <span className="text-red-500">* </span>Amount per mint
                      </Label>
                      <Input
                        type="number"
                        defaultValue={6}
                        {...register("amountPerMint", {
                          required: "Amount per mint is required",
                          min: { value: 1, message: "Must be > 0" },
                        })}
                        className="!mt-1"
                      />
                      {errors.amountPerMint && (
                        <p className="text-xs text-red-500">
                          {errors.amountPerMint.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 !mt-4 md:!mt-0 h-fit">
                      <Label>
                        <span className="text-red-500">* </span>Image
                      </Label>

                      {errors.image && (
                        <p className="text-xs text-red-500">
                          {errors.image.message}
                        </p>
                      )}

                      <Controller
                        name="image"
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                          <Card
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDragOver(true);
                            }}
                            onDragLeave={() => setIsDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragOver(false);
                              if (
                                e.dataTransfer.files &&
                                e.dataTransfer.files[0]
                              ) {
                                const file = e.dataTransfer.files[0];
                                setFile(file);
                                field.onChange(file);
                              }
                            }}
                            className={cn(
                              "h-full w-full flex items-center justify-center border-2 border-dashed cursor-pointer relative !mt-1",
                              isDragOver && "bg-gray-50 border-primary"
                            )}
                          >
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  const file = e.target.files[0];
                                  setFile(file);
                                  field.onChange(file);
                                }
                              }}
                            />
                            {file ? (
                              <div className="flex flex-col items-center justify-center p-6">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="preview"
                                  className="w-16 h-16 rounded-md object-cover"
                                />
                                <p className="!mt-2 text-sm">{file.name}</p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center p-6 text-[#787575] text-center">
                                <UploadIcon className="w-6 h-6" />
                                <p className="!my-1 text[#787575] font-semibold">
                                  Drag and drop here to upload
                                </p>
                                <span className="text-xs">
                                  png, .jpg, 1000x1000px
                                </span>
                              </div>
                            )}
                          </Card>
                        )}
                      />
                    </div>

                    <div className="space-y-2 !mt-4 md:!mt-0">
                      <div className="flex items-center justify-between !mt-1">
                        <Label>
                          <span className="text-red-500">* </span>Description
                        </Label>
                        <p className="text-xs text-gray-500">
                          {descLength}/500
                        </p>
                      </div>
                      {errors.description && (
                        <p className="text-xs text-red-500">
                          {errors.description.message}
                        </p>
                      )}
                      <Textarea
                        placeholder="Ex: First community token on Zoken..."
                        maxLength={500}
                        {...register("description", {
                          required: "Description is required",
                          maxLength: {
                            value: 500,
                            message: "Max 500 characters",
                          },
                        })}
                        className="!mt-2"
                        rows={5}
                      />
                    </div>
                  </div>

                  <div className="space-y-4 !mt-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-lg">
                          Add Social Links & Tags
                        </Label>
                        <p className="text-xs text-gray-500 !mt-2">
                          Max 32 characters in your name
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="!mt-4 flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <p>Website: </p>
                        <div className="relative w-2/3 md:w-5/6">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <HttpIcon className="w-5 h-5" />
                          </span>
                          <Input
                            placeholder="https://"
                            {...register("websiteUrl")}
                            className="w-full pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Telegram: </p>
                        <div className="relative w-2/3 md:w-5/6">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <TelegramIcon className="w-5 h-5" />
                          </span>
                          <Input
                            placeholder="https://t.me/"
                            {...register("telegramUrl")}
                            className="w-full pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Discord: </p>
                        <div className="relative w-2/3 md:w-5/6">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <DiscordIcon className="w-5 h-5" />
                          </span>
                          <Input
                            placeholder="https://discord.com/"
                            {...register("discordUrl")}
                            className="w-full pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p>Twitter: </p>
                        <div className="relative w-2/3 md:w-5/6">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <HttpIcon className="w-5 h-5" />
                          </span>
                          <Input
                            placeholder="https://twitter.com/"
                            {...register("xUrl")}
                            className="w-full pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full rounded-full py-6"
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loading type="spinner" size={20} />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default CreateToken;
