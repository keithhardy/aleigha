"use client";

import { User } from "./table-types";

export function expandedUserRow(user: User) {
  return <div>{JSON.stringify(user)}</div>;
}
