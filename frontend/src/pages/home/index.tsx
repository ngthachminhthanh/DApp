import React from "react";
import w3_background from "@/assets/images/w3-background.png";
import TelegramIcon from "@/assets/icons/connect-telegram-icon.svg?react";
import XIcon from "@/assets/icons/connect-x-icon.svg?react";
import DocsIcon from "@/assets/icons/connect-docs-icon.svg?react";
import { Button } from "@/components/ui";
import { useAuthContext } from "@/hooks/useAuthContext";

const Home: React.FC = () => {
  const { handleWeb3Login } = useAuthContext();

  const handleConnectWallet = async () => {
    await handleWeb3Login();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 h-[74px]">
        <div className="text-xl font-bold text-teal-700">ACW3</div>
        <Button
          onClick={handleConnectWallet}
          className="w-[126px] h-[38px] rounded-[100px] text-white"
        >
          Connect
        </Button>
      </header>

      <main className="h-[calc(100vh-134px)] !mt-[74px] !mb-[60px] text-center bg-gray-100">
        <div className="w-full h-[calc(100vh-134px)] overflow-hidden shadow p-4">
          <img
            src={w3_background}
            alt="ACW3 background"
            className="w-full h-full object-cover md:object-fill object-center rounded-[8px]"
          />
        </div>

        <div className="fixed top-[50%] md:top-[42%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-[40px] font-semibold text-gray-900 !mb-6">
            Tokens & NFT with Ease
          </h1>
          <p className="text-2xl !mt-2 text-gray-600 max-w-xl">
            Launch Token, Liquidity, Airdrops and much more. <br />
            Effortless and without coding.
          </p>
          <button
            onClick={handleConnectWallet}
            className="cursor-pointer !mt-6 px-8 py-4 rounded-full bg-white text-teal-600 font-medium shadow hover:shadow-md transition"
          >
            Connect Your Wallet
          </button>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 h-[60px] flex justify-between space-x-6 text-sm text-gray-600 px-6 py-4 border-t">
        <div className="flex gap-6">
          <a href="#" className="hover:underline">
            Feature Request
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
        <div className="flex gap-4">
          <TelegramIcon className="w-5 h-5 cursor-pointer" />
          <XIcon className="w-5 h-5 cursor-pointer" />
          <DocsIcon className="w-5 h-5 cursor-pointer" />
        </div>
      </footer>
    </>
  );
};

export default Home;
