export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Admin" | "Manager" | "Planner" | "Operative" | "Client";
  signature: string | null;
  createdAt: Date;
  updatedAt: Date;
};
