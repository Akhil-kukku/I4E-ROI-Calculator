import api from "./api";
import type { RoiRequest, RoiResponse } from "@/types/roi";

export async function calculateRoi(payload: RoiRequest): Promise<RoiResponse> {
  const { data } = await api.post<RoiResponse>("/roi", payload);
  return data;
}
