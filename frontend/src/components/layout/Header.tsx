import React from "react";
import { Separator } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/icons/profile-user-icon.svg?react";
import LogoutIcon from "../../assets/icons/profile-logout-icon.svg?react";
import ChevrondownIcon from "../../assets/icons/chevron-down-icon.svg?react";
import AppsCyclone_avatar from "../../assets/images/AppsCyclone-avatar.png";
import { useAuthContext } from "@/hooks/useAuthContext";
import { shortenAddress } from "@/utils/format";
import { formatUnits } from "viem";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { balance, address, logOut } = useAuthContext();
  const formattedBalance =
    balance && balance.value !== undefined
      ? formatUnits(balance.value, balance.decimals)
      : "0.0";

  return (
    <>
      <header className="min-h-16 flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <button className="flex items-center gap-2 rounded-full px-3 py-1 hover:bg-gray-100 transition">
              <div className="w-8 h-8 rounded-full bg-teal-500">
                <img src={AppsCyclone_avatar} alt="AppsCyclone avatar" />
              </div>

              <div className="flex flex-col items-start leading-tight text-left mr-4">
                <span className="text-sm font-medium text-gray-900">
                  {address ? shortenAddress(address) : "0x4aq...gfr6j5lda"}
                </span>
                <span className="text-xs text-gray-500">
                  {formattedBalance} {balance?.symbol || ""}
                </span>
              </div>

              <ChevrondownIcon></ChevrondownIcon>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              <UserIcon></UserIcon>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => logOut()}>
              <LogoutIcon></LogoutIcon>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Separator />
    </>
  );
};

export default Header;
