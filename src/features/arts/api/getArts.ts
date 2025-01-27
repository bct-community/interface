import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import env from "@/config";

const ArtsSchema = z.object({
  arts: z.array(
    z.object({
      creator: z.string(),
      description: z.string(),
      name: z.string(),
      url: z.string(),
      xProfile: z.string(),
    }),
  ),
  page: z.number(),
  next: z.boolean(),
});

export type Arts = z.infer<typeof ArtsSchema>;

const getArts = async () => {
  const response = await fetch(`${env.VITE_API_URL}/arts?page=1`);
  const data = await response.json();

  return data as Arts;
};

export const useArts = () =>
  useQuery({
    queryKey: ["arts"],
    queryFn: getArts,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });
