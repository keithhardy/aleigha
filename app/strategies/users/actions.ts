"use server";

import { userService } from "@/di/factories/user-service-factory";

import { Filters } from "./components/table/useFilters";

export async function getUsers(filters?: Filters) {
  return userService.getUsers(filters);
}

export async function getFacets(filters?: Filters) {
  return userService.getFacets(filters);
}
