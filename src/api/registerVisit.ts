import { useMutation } from "@tanstack/react-query";

import env from "@/config";
import { getUserCountryByTimeZone } from "@/utils/getUserCountryByTimeZone";

const registerVisit = async () => {
  const country = getUserCountryByTimeZone();

  if (!country) {
    return;
  }

  const response = await fetch(`${env.VITE_API_URL}/metrics/visits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country,
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar a métrica de visita.");
  }
};

export const useRegisterVisit = () => {
  return useMutation({
    mutationFn: () => registerVisit(),
  });
};
