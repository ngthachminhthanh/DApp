import React from "react";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button, Progress } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CopyButton } from "@/components/common/CopyButton";
import nft_avatar_1 from "@/assets/images/nft-avatar-1.png";
import nft_avatar_2 from "@/assets/images/nft-avatar-2.png";
import token_avatar_4 from "@/assets/images/token-avatar-4.png";
import NFTMintModal from "./components/NFTMintModal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { type NFT } from "@/types";

const nfts: NFT[] = [
  {
    id: 1,
    name: "Goodman",
    address: "0x4eb697...A0FB2A",
    supplyPercent: 100,
    progress: 100,
    image: nft_avatar_1,
  },
  {
    id: 2,
    name: "Goodman",
    address: "0x4eb697...A0FB2A",
    supplyPercent: 100,
    progress: 100,
    image: token_avatar_4,
  },
  {
    id: 3,
    name: "Goodman",
    address: "0x4eb697...A0FB2A",
    supplyPercent: 100,
    progress: 100,
    image: nft_avatar_2,
  },
];

const NFTList: React.FC = () => {
  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            <Header title="NFT List" />

            <main className="md:flex justify-center gap-4 px-4 py-10 bg-gray-100 h-full">
              <div className="w-full">
                <div className="hidden md:block">
                  <div className="text-[#787575] grid grid-cols-[4fr_1fr_1fr_1fr] gap-4 items-center border-b font-medium py-3 bg-white rounded-[8px] !mb-2">
                    <div className="pl-4 text-left text-black">NFT</div>
                    <div className="flex justify-center">% of Supply</div>
                    <div className="flex justify-center">Mint Progress</div>
                    <div className="flex justify-center">Action</div>
                  </div>

                  {nfts.map((nft) => (
                    <div
                      key={nft.id}
                      className="grid grid-cols-[4fr_1fr_1fr_1fr] gap-4 items-center border-b py-3 bg-white rounded-[8px]"
                    >
                      <div className="flex items-center gap-3 pl-4 text-left">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={nft.image} alt={nft.name} />
                        </Avatar>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1 font-semibold">
                            {nft.name}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {nft.address}
                            <CopyButton text={nft.address} />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center font-medium">
                        {nft.supplyPercent}%
                      </div>
                      <div className="flex justify-center">
                        <Progress value={nft.progress} className="h-2 w-full" />
                      </div>
                      <div className="flex justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full"
                            >
                              Mint
                            </Button>
                          </DialogTrigger>

                          <DialogContent
                            aria-describedby={undefined}
                            className="sm:max-w-[400px] bg-white rounded-2xl border-0 shadow-xl p-0"
                          >
                            <DialogTitle className="sr-only">
                              Mint Action
                            </DialogTitle>
                            <NFTMintModal />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 md:hidden">
                  {nfts.map((nft) => (
                    <Card key={nft.id} className="!mb-4 md:!mb-0">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={nft.image} alt={nft.name} />
                          </Avatar>
                          <div>
                            <div className="font-semibold">{nft.name}</div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              {nft.address}
                              <CopyButton text={nft.address} />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm !mt-2">
                          <span>% of Supply:</span>
                          <span className="font-medium">
                            {nft.supplyPercent}%
                          </span>
                        </div>

                        <Progress value={nft.progress} className="h-2 !mt-2" />

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="rounded-full w-full h-11 !mt-4"
                            >
                              Mint
                            </Button>
                          </DialogTrigger>

                          <DialogContent
                            aria-describedby={undefined}
                            className="sm:max-w-[400px] bg-white rounded-2xl border-0 shadow-xl"
                          >
                            <DialogTitle className="sr-only">
                              Mint Action
                            </DialogTitle>
                            <NFTMintModal />
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default NFTList;
