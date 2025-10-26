export type UserProfile = {
  _id: string;
  walletAddress: string;
  username: string | null;
  bio: string | null;
  telegramUrl: string | null;
  githubUrl: string | null;
  xUrl: string | null;
};

export type NFT = {
  id: number;
  name: string;
  address: string;
  supplyPercent: number;
  progress: number;
  image: string;
};

export type TokenMintFormData = {
  amountPerMint: number;
  mintFee: number;
};

export type NFTMintFormData = {
  files: File[] | null;
  mintFee: number;
};

export type Token = {
  _id: number;
  address: `0x${string}`;
  name: string;
  symbol: string;
  maxSupply: string;
  totalSupply: string;
  balance: number;
  progress: number;
  image: string;
};

export type CreateTokenFormData = {
  image: File;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  description: string;
  websiteUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;
  xUrl?: string;
  maxSupply?: number;
  amountPerMint?: number;
  mintFee?: number;
};

export type CreateTokenResponse = {
  message: string;
  data: {
    image: string;
    name: string;
    symbol: string;
    decimals: number;
    supply: number;
    description: string;
    websiteUrl: string;
    telegramUrl: string;
    discordUrl: string;
    xUrl: string;
  };
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
};

export type GetUserTokensResponse = {
  message: string;
  data: Token[];
  pagination: Pagination;
};

export type CreateNFTFormData = {
  name: string;
  symbol: string;
  totalSupply: number;
};

export type ProfileFormData = {
  username: string | null;
  bio: string | null;
  telegramUrl: string | null;
  xUrl: string | null;
  githubUrl: string | null;
};

export type SignInFormData = {
  walletAddress: string;
  password: string;
};

export type SignUpFormData = {
  walletAddress: string;
  password: string;
  confirmPassword: string;
};

export type RequestResponse = {
  message: string;
};
