import React from "react";
import AppSidebar from "../../components/layout/AppSidebar";
import Header from "../../components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button, Progress, Loading } from "@/components/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TokenMintModal from "./components/TokenMintModal";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CopyButton } from "@/components/common/CopyButton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUserTokens } from "@/hooks/useUserTokens";
import type { Token } from "@/types";
import { shortenAddress } from "@/utils/format";

const TokenList: React.FC = () => {
  const { tokens, isLoading } = useUserTokens();
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(tokens.length / pageSize);
  const currentTokens = tokens.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderSkeletons = () => (
    <>
      {Array.from({ length: pageSize }).map((_, i) => (
        <div
          key={i}
          className="grid grid-col-1 grid-cols-[4fr_1fr_1fr_1fr_1fr] gap-4 items-center border-b py-3 bg-white rounded-[8px]"
        >
          <div className="flex items-center gap-3 pl-4 text-left">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <Loading type="skeleton" width={40} height={40} />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <Loading type="skeleton" size={40} />
              <Loading type="skeleton" size={40} />
            </div>
          </div>
          {[1, 2, 3, 4].map((k) => (
            <div key={k} className="flex justify-center">
              <Loading type="skeleton" size={32} />
            </div>
          ))}
        </div>
      ))}
    </>
  );

  const renderMobileSkeletons = () => (
    <>
      {Array.from({ length: pageSize }).map((_, i) => (
        <Card key={i} className="!mb-4 md:!mb-0">
          <CardContent className="p-4 !space-y-3">
            <div className="flex items-center gap-3">
              <Loading type="skeleton" width={40} height={40} />
              <div className="flex flex-col gap-2 w-full">
                <Loading type="skeleton" width="60%" height={16} />
                <Loading type="skeleton" width="40%" height={14} />
              </div>
            </div>
            {[1, 2, 3].map((k) => (
              <div key={k} className="flex justify-between text-sm !mt-2">
                <Loading type="skeleton" width="80%" height={14} />
                <Loading type="skeleton" width="60%" height={14} />
              </div>
            ))}
            <Loading type="skeleton" width="100%" height={40} />
          </CardContent>
        </Card>
      ))}
    </>
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 min-w-0">
          <Header title="Token List" />

          <main className="md:flex justify-center gap-4 px-4 py-10 bg-gray-100 h-full">
            <div className="w-full">
              <div className="hidden md:block">
                <div className="text-[#787575] grid grid-cols-[4fr_1fr_1fr_1fr_1fr] gap-4 items-center border-b font-medium py-3 bg-white rounded-[8px] !mb-2">
                  <div className="pl-4 text-left text-black">Tokens</div>
                  <div className="flex justify-center">Balance</div>
                  <div className="flex justify-center">% of Supply</div>
                  <div className="flex justify-center">Mint Progress</div>
                  <div className="flex justify-center">Action</div>
                </div>

                {isLoading ? (
                  renderSkeletons()
                ) : currentTokens.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg">
                    No tokens found on-chain.
                  </div>
                ) : (
                  <>
                    {currentTokens.map((token: Token) => (
                      <div
                        key={token._id}
                        className="grid grid-cols-[4fr_1fr_1fr_1fr_1fr] gap-4 items-center border-b py-3 bg-white rounded-[8px]"
                      >
                        <div className="flex items-center gap-3 pl-4 text-left">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={token.image || "/default-token.png"}
                              alt={token.name}
                            />
                            <AvatarFallback>{token.symbol}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1 font-semibold">
                              {token.name}
                              <span className="text-gray-500 text-sm">
                                {token.symbol}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              {shortenAddress(token.address)}
                              <CopyButton text={token.address.toString()} />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center font-medium">
                          {token.balance}
                        </div>
                        <div className="flex justify-center font-medium">
                          {(
                            (Number(token.totalSupply) /
                              Number(token.maxSupply || 1)) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                        <div className="flex justify-center">
                          <Progress
                            value={token.progress}
                            className="h-2 w-full"
                          />
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
                              className="sm:max-w-[400px] bg-white rounded-2xl border-0 shadow-xl"
                            >
                              <DialogTitle className="sr-only">
                                Mint Action
                              </DialogTitle>
                              <TokenMintModal
                                tokenAddress={token.address as `0x${string}`}
                                tokenName={token.name}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}

                    {totalPages > 1 && (
                      <div className="flex justify-center !mt-6">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious
                                onClick={() =>
                                  handlePageChange(currentPage - 1)
                                }
                                className={
                                  currentPage === 1
                                    ? "pointer-events-none opacity-50"
                                    : ""
                                }
                              />
                            </PaginationItem>

                            {Array.from({ length: totalPages }).map(
                              (_, index) => (
                                <PaginationItem key={index}>
                                  <PaginationLink
                                    onClick={() => handlePageChange(index + 1)}
                                    isActive={currentPage === index + 1}
                                  >
                                    {index + 1}
                                  </PaginationLink>
                                </PaginationItem>
                              )
                            )}

                            <PaginationItem>
                              <PaginationNext
                                onClick={() =>
                                  handlePageChange(currentPage + 1)
                                }
                                className={
                                  currentPage === totalPages
                                    ? "pointer-events-none opacity-50"
                                    : ""
                                }
                              />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="!space-y-4 md:hidden">
                {isLoading ? (
                  renderMobileSkeletons()
                ) : currentTokens.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 bg-white rounded-lg">
                    No tokens found.
                  </div>
                ) : (
                  currentTokens.map((token: Token) => (
                    <Card key={token._id} className="!mb-4 md:!mb-0">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={token.image || "/default-token.png"}
                              alt={token.name}
                            />
                            <AvatarFallback>{token.symbol}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">
                              {token.name}{" "}
                              <span className="text-gray-500">
                                {token.symbol}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              {shortenAddress(token.address)}
                              <CopyButton text={token.address} />
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between text-sm !mt-2">
                          <span>Balance:</span>
                          <span className="font-medium">{token.balance}</span>
                        </div>
                        <div className="flex justify-between text-sm !mt-2">
                          <span>% of Supply:</span>
                          <span className="font-medium">
                            {(
                              (Number(token.totalSupply) /
                                Number(token.maxSupply || 1)) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </div>

                        <Progress
                          value={token.progress}
                          className="h-2 !mt-2"
                        />

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
                            <TokenMintModal
                              tokenAddress={token.address as `0x${string}`}
                              tokenName={token.name}
                            />
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TokenList;
