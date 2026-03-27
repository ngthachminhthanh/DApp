import React, { useState } from "react";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfileDialog from "./components/EditProfileDialog";
import nft_avatar_1 from "../../assets/images/nft-avatar-1.png";
import nft_avatar_2 from "../../assets/images/nft-avatar-2.png";
import token_avatar_1 from "../../assets/images/token-avatar-1.png";
import token_avatar_2 from "../../assets/images/token-avatar-2.png";
import token_avatar_3 from "../../assets/images/token-avatar-3.png";
import token_avatar_4 from "../../assets/images/token-avatar-4.png";
import AppsCyclone_avatar from "../../assets/images/AppsCyclone-avatar.png";
import XIcon from "../../assets/icons/connect-x-icon.svg?react";
import GithubIcon from "../../assets/icons/profile-github-icon.svg?react";
import TelegramIcon from "../../assets/icons/connect-telegram-icon.svg?react";
import CopyIcon from "../../assets/icons/profile-copy-icon.svg?react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { shortenAddress } from "@/utils/format";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("tokens");
  const { data: profile } = useUserProfile();

  const tokens = [
    {
      name: "Goodman",
      address: "0x4eb697...A0fB2A",
      img: token_avatar_1,
      balance: 200,
      totalOfSupply: 200,
      percentOfSupply: "100%",
      symbol: "GM",
    },
    {
      name: "Goodman",
      address: "0x4eb697...A0fB2A",
      img: token_avatar_2,
      balance: 200,
      totalOfSupply: 200,
      percentOfSupply: "100%",
      symbol: "GM",
    },
    {
      name: "Goodman",
      address: "0x4eb697...A0fB2A",
      img: token_avatar_3,
      balance: 200,
      totalOfSupply: 200,
      percentOfSupply: "100%",
      symbol: "GM",
    },
    {
      name: "Goodman",
      address: "0x4eb697...A0fB2A",
      img: token_avatar_4,
      balance: 200,
      totalOfSupply: 200,
      percentOfSupply: "100%",
      symbol: "GM",
    },
  ];

  const nfts = [
    {
      name: "Tropolis Club",
      address: "0x4eb697...A0fB2A",
      img: nft_avatar_1,
      supply: 200,
      percent: "100%",
    },
    {
      name: "Lil Pudgy",
      address: "0x4eb697...A0fB2A",
      img: token_avatar_4,
      supply: 200,
      percent: "100%",
    },
    {
      name: "Goodman",
      address: "0x4eb697...A0fB2A",
      img: nft_avatar_2,
      supply: 200,
      percent: "100%",
    },
  ];

  return (
    <>
      <SidebarProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />

          <SidebarInset className="flex flex-col flex-1 min-w-0">
            <Header title="Profile" />

            <main className="md:flex gap-4 p-4 bg-gray-100 h-full">
              <Card className="md:w-64 w-full max-h-fit rounded-[8px] !mb-4 md:mb-0">
                <CardContent className="flex flex-col gap-4 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Avatar className="relative overflow-visible">
                      <AvatarImage
                        src={AppsCyclone_avatar}
                        alt="Apps Cyclone Technology avatar"
                      />
                      <AvatarFallback>Apps Cyclone Technology</AvatarFallback>
                      <div className="absolute top-[-6px] right-[-6px] bg-[#FFD5B3] rounded-full p-2 w-6 h-6 flex items-center justify-center text-[11px] font-bold">
                        <span>2</span>/<span>2</span>
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-bold">{profile?.username || "John"}</p>
                      <p className="text-xs text-gray-500 font-medium">
                        {profile ? shortenAddress(profile.walletAddress) : "0x4aq...gfr6j5lda"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">Balance</p>
                    <p className="font-normal text-gray-500">200 ZKN</p>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">Biography</p>
                    <p className="font-normal text-gray-500">
                      {profile?.bio || "None"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[18px] font-medium">Social Links</p>
                    <div className="flex gap-2">
                      <XIcon className="w-6 h-6"></XIcon>
                      <TelegramIcon className="w-6 h-6"></TelegramIcon>
                      <GithubIcon className="w-6 h-6"></GithubIcon>
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-[38px] rounded-[100px] text-white">
                        Edit Profile
                      </Button>
                    </DialogTrigger>

                    <DialogContent
                      aria-describedby={undefined}
                      className="sm:max-w-[400px] p-0 bg-white rounded-2xl border-0 shadow-xl px-6 md:px-0"
                    >
                      <DialogTitle className="sr-only">
                        Edit Profile
                      </DialogTitle>
                      <EditProfileDialog />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <div className="flex-1 flex flex-col gap-4 pb-8">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="rounded-[8px]">
                    <CardContent className="p-4">
                      <p className="text-gray-500 text-sm">Total Tokens</p>
                      <p className="text-xl font-semibold">0</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-[8px]">
                    <CardContent className="p-4">
                      <p className="text-gray-500 text-sm">Total NFTs</p>
                      <p className="text-xl font-semibold">0</p>
                    </CardContent>
                  </Card>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="tokens" className="cursor-pointer">
                      Tokens
                    </TabsTrigger>
                    <TabsTrigger value="nfts" className="cursor-pointer">
                      NFTs
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="tokens">
                    <Card>
                      <CardContent className="p-4">
                        <table className="hidden md:table w-full text-sm">
                          <thead className="border-b">
                            <tr>
                              <th className="p-3 text-left">Token</th>
                              <th className="p-3 text-center">Balance</th>
                              <th className="p-3 text-center">% of Supply</th>
                              <th className="p-3 text-right">
                                Total of Supply
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tokens.map((token, idx) => (
                              <tr
                                key={idx}
                                className="border-b last:border-none"
                              >
                                <td className="flex items-center gap-2 p-3">
                                  <img
                                    src={token.img}
                                    alt={token.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <p className="font-medium">
                                      {token.name}{" "}
                                      <span className="text-gray-500">
                                        {token.symbol}
                                      </span>
                                    </p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                      {token.address}
                                      <CopyIcon
                                        className="w-4 h-4"
                                        onClick={() =>
                                          navigator.clipboard.writeText(
                                            token.address
                                          )
                                        }
                                      />
                                    </p>
                                  </div>
                                </td>
                                <td className="p-3 text-center">
                                  {token.balance}
                                </td>
                                <td className="p-3 text-center">
                                  {token.percentOfSupply}
                                </td>
                                <td className="p-3 text-right">
                                  {token.totalOfSupply}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="space-y-4 md:hidden">
                          {tokens.map((token, idx) => (
                            <div
                              key={idx}
                              className="p-3 border rounded-xl flex items-center gap-3"
                            >
                              <img
                                src={token.img}
                                alt={token.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1">
                                <p className="font-medium">
                                  {token.name}{" "}
                                  <span className="text-gray-500">
                                    {token.symbol}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  {token.address}
                                  <CopyIcon className="w-4 h-4" />
                                </p>
                                <div className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
                                  <span className="text-gray-500">
                                    Balance:
                                  </span>
                                  <span className="font-bold text-right">
                                    {token.balance}
                                  </span>

                                  <span className="text-gray-500">
                                    % Supply:
                                  </span>
                                  <span className="font-bold text-right">
                                    {token.percentOfSupply}
                                  </span>

                                  <span className="text-gray-500">Total:</span>
                                  <span className="font-bold text-right">
                                    {token.totalOfSupply}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="nfts">
                    <Card>
                      <CardContent className="p-4">
                        <table className="hidden md:table w-full text-sm">
                          <thead className="border-b">
                            <tr>
                              <th className="p-3 text-left">NFT</th>
                              <th colSpan={2} className="p-3 text-center">
                                <div className="flex justify-end md:gap-12">
                                  <span className="font-semibold text-gray-500 w-24">
                                    % of Supply
                                  </span>
                                  <span className="font-semibold text-gray-500 w-32 text-right">
                                    Total of Supply
                                  </span>
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {nfts.map((nft, idx) => (
                              <tr
                                key={idx}
                                className="border-b last:border-none"
                              >
                                <td className="flex items-center gap-2 p-3 text-left">
                                  <img
                                    src={nft.img}
                                    alt={nft.name}
                                    className="w-8 h-8 rounded-full"
                                  />
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">{nft.name}</p>
                                    </div>
                                    <p className="flex items-center gap-1 text-xs text-gray-500">
                                      {nft.address}
                                      <CopyIcon
                                        className="w-4 h-4"
                                        onClick={() =>
                                          navigator.clipboard.writeText(
                                            nft.address
                                          )
                                        }
                                      />
                                    </p>
                                  </div>
                                </td>
                                <td colSpan={2} className="p-3 text-center">
                                  <div className="flex justify-end md:gap-12">
                                    <span className="font-bold w-24">
                                      {nft.percent}
                                    </span>
                                    <span className="font-bold w-32 text-right">
                                      {nft.supply}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="space-y-4 md:hidden">
                          {nfts.map((token, idx) => (
                            <div
                              key={idx}
                              className="p-3 border rounded-xl flex items-center gap-3"
                            >
                              <img
                                src={token.img}
                                alt={token.name}
                                className="w-10 h-10 rounded-full"
                              />
                              <div className="flex-1">
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                  {token.address}
                                  <CopyIcon className="w-4 h-4" />
                                </p>
                                <div className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
                                  <span className="text-gray-500">
                                    % Supply:
                                  </span>
                                  <span className="font-bold text-right">
                                    {token.percent}
                                  </span>

                                  <span className="text-gray-500">Total:</span>
                                  <span className="font-bold text-right">
                                    {token.supply}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Profile;
