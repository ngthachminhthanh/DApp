import React from "react";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Input, Label, Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { type CreateNFTFormData } from "@/types";
import { useForm } from "react-hook-form";

const NFTCollection: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNFTFormData>({
    defaultValues: {
      name: "",
      symbol: "",
      totalSupply: 1,
    },
  });

  const onSubmit = (data: CreateNFTFormData) => {
    console.log("Form data:", data);
  };

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            <Header title="NFT Creator" />

            <main className="md:flex justify-center gap-4 px-4 py-10 bg-gray-100 h-full">
              <div className="md:w-[852px] min-w-[70%]">
                <Card className="rounded-[8px] shadow-sm">
                  <CardContent className="p-6 md:py-10 md:px-6">
                    <h2 className="text-center text-xl font-semibold !mb-8">
                      Create NFT Collection
                    </h2>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                        <div className="flex flex-col !space-y-1">
                          <Label className="!my-2">
                            <span className="text-red-500">*</span> Name
                          </Label>
                          <Input
                            placeholder="Ex: Zoken"
                            {...register("name", {
                              required: "Name is required",
                              maxLength: {
                                value: 32,
                                message: "Max 32 characters allowed",
                              },
                            })}
                          />
                          <p className="text-xs text-gray-500">
                            Max 32 characters in your name
                          </p>
                          {errors.name && (
                            <p className="text-xs text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col !space-y-1">
                          <Label className="!my-2">
                            <span className="text-red-500">*</span> Symbol
                          </Label>
                          <Input
                            placeholder="Ex: ZKN"
                            {...register("symbol", {
                              required: "Symbol is required",
                              maxLength: {
                                value: 8,
                                message: "Max 8 characters allowed",
                              },
                            })}
                          />
                          <p className="text-xs text-gray-500">
                            Max 8 characters in your symbol
                          </p>
                          {errors.symbol && (
                            <p className="text-xs text-red-500">
                              {errors.symbol.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col !space-y-1 !mt-2">
                        <Label className="!my-2">
                          <span className="text-red-500">*</span> Total Supply
                        </Label>
                        <Input
                          type="number"
                          {...register("totalSupply", {
                            required: "Total supply is required",
                            min: { value: 1, message: "Must be at least 1" },
                          })}
                        />
                        <p className="text-xs text-gray-500">
                          Most token use 10B
                        </p>
                        {errors.totalSupply && (
                          <p className="text-xs text-red-500">
                            {errors.totalSupply.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 !mt-6"
                      >
                        Create
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default NFTCollection;
