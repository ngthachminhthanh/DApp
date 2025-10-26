export const shortenAddress = (address?: string | null) => {
  if (!address) return "";
  return `${address.slice(0, 7)}...${address.slice(-5)}`;
};
