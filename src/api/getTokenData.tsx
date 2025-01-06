import env from "@/config";
import { useQuery } from "@tanstack/react-query";

type TokenData = {
  tokenPriceInUSD: string;
  volumeIn24H: string;
  changeIn1H: string;
  changeIn24H: string;
  marketCap: string;
  transactions24H: string;
  sell24H: string;
  buy24H: string;
  totalSupply: string;
  holders: string;
};

const getTokenData = async () => {
  try {
    const response = await fetch(`${env.VITE_API_URL}/token`);
    const data = await response.json();
    return data as TokenData;
  } catch {
    console.error("Failed to fetch token data");
  }
};

export const useTokenData = () =>
  useQuery({
    queryKey: ["tokenData"],
    queryFn: getTokenData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
