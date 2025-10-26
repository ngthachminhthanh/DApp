import React, { useState, useEffect } from "react";
import TokenIcon from "@/assets/icons/menu-token-icon.svg?react";
import NFTIcon from "@/assets/icons/menu-nft-icon.svg?react";
import XIcon from "@/assets/icons/menu-x-icon.svg?react";
import TelegramIcon from "@/assets/icons/menu-telegram-icon.svg?react";
import DashboardIcon from "@/assets/icons/menu-dashboard-icon.svg?react";
import { Button, Separator } from "../ui";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router-dom";

const AppSidebar: React.FC = () => {
  const [openToken, setOpenToken] = useState(false);
  const [openNFT, setOpenNFT] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/create-token") || pathname.startsWith("/token-list")) {
      setOpenToken(true);
    }
    if (pathname.startsWith("/nft-collection") || pathname.startsWith("/nft-list")) {
      setOpenNFT(true);
    }
  }, [pathname]);

  return (
    <Sidebar
      variant="inset"
      className="!p-0 hidden md:flex flex-col justify-between border-r bg-white w-64"
    >
      <SidebarContent>
        <SidebarHeader>
          <div className="h-16 flex justify-center items-center w-full">
            <h1 className="text-center text-lg font-bold text-teal-700">ACW3</h1>
          </div>
          <Separator />
        </SidebarHeader>

        <nav className="space-y-3 mt-2 px-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-base font-normal md:pl-8"
          >
            <DashboardIcon className="h-5 w-5"/>
            Dashboard
          </Button>

          <div>
            <Button
              variant="ghost"
              onClick={() => setOpenToken(!openToken)}
              className="w-full justify-start gap-2 text-base font-normal md:pl-8"
            >
              <TokenIcon className="h-5 w-5" />
              Token
            </Button>

            <div
              className={`!ml-6 md:!ml-10 mt-1 overflow-hidden space-y-1 border-l-4 pl-2 transition-all duration-300 ease-in-out ${
                openToken ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Button
                variant={pathname === "/create-token" ? "default" : "ghost"}
                onClick={() => navigate("/create-token")}
                className="w-full justify-start text-md font-normal rounded-full px-3"
              >
                Token Creator
              </Button>
              <Button
                variant={pathname === "/token-list" ? "default" : "ghost"}
                onClick={() => navigate("/token-list")}
                className="w-full justify-start text-md font-normal rounded-full px-3"
              >
                Token List
              </Button>
            </div>
          </div>

          <div>
            <Button
              variant="ghost"
              onClick={() => setOpenNFT(!openNFT)}
              className="w-full justify-start gap-2 text-base font-normal md:pl-8"
            >
              <NFTIcon className="h-5 w-5" />
              NFT
            </Button>

            <div
              className={`!ml-6 md:!ml-10 mt-1 overflow-hidden space-y-1 border-l-4 pl-2 transition-all duration-300 ease-in-out ${
                openNFT ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <Button
                variant={pathname === "/nft-collection" ? "default" : "ghost"}
                onClick={() => navigate("/nft-collection")}
                className="w-full justify-start text-md font-normal rounded-full px-3"
              >
                NFT Collection
              </Button>
              <Button
                variant={pathname === "/nft-list" ? "default" : "ghost"}
                onClick={() => navigate("/nft-list")}
                className="w-full justify-start text-md font-normal rounded-full px-3"
              >
                NFT List
              </Button>
            </div>
          </div>
        </nav>
      </SidebarContent>

      <SidebarFooter className="space-y-3 mb-2 px-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-base font-normal md:pl-8"
        >
          <XIcon className="h-5 w-5" />
          Twitter / X
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-base font-normal md:pl-8"
        >
          <TelegramIcon className="h-5 w-5" />
          Telegram
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
