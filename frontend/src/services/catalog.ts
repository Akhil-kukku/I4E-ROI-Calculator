import api from "./api";
import type { CatalogOptions } from "@/types/roi";

export async function getCatalogOptions(): Promise<CatalogOptions> {
  const { data } = await api.get<CatalogOptions>("/catalog/options");
  return data;
}

export async function getColleges(params: {
  country: string;
  stream: string;
  level: string;
}): Promise<string[]> {
  const { data } = await api.get<{ colleges: string[] }>("/catalog/colleges", { params });
  return data.colleges;
}

export async function getCourses(params: {
  country: string;
  stream: string;
  level: string;
  college_name: string;
}): Promise<string[]> {
  const { data } = await api.get<{ courses: string[] }>("/catalog/courses", { params });
  return data.courses;
}
