export type PagesConfig = {
  metadata: {
    title: string;
  };
  header: string;
  description?: string;
  backLink?: {
    text: string;
    href: string;
  };
  callToAction?: {
    text: string;
    href: string;
  };
};

export const pagesConfig: Record<string, PagesConfig> = {
  dashboard: {
    metadata: { title: "Reiyen – Dashboard" },
    header: "Dashboard",
    description: "View insights and activity.",
    callToAction: { text: "Docs", href: "/documentation" },
  },
  logs: {
    metadata: { title: "Reiyen – Logs" },
    header: "Logs",
    description: "View system logs and activity history.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  certificates: {
    metadata: { title: "Reiyen – Certificates" },
    header: "Certificates",
    description: "Browse and manage certificates.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  properties: {
    metadata: { title: "Reiyen – Properties" },
    header: "Properties",
    description: "Manage client properties.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyCreate: {
    metadata: { title: "Reiyen – Create Property" },
    header: "Create Property",
    description: "Add a new property.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyUpdate: {
    metadata: { title: "Reiyen – Update Property" },
    header: "Update Property",
    description: "Edit property information.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyDelete: {
    metadata: { title: "Reiyen – Delete Property" },
    header: "Delete Property",
    description: "Delete an existing property.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clients: {
    metadata: { title: "Reiyen – Clients" },
    header: "Clients",
    description: "Manage your client list.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clientCreate: {
    metadata: { title: "Reiyen – Create Client" },
    header: "Create Client",
    description: "Add a new client.",
    backLink: { text: "Back to Clients", href: "/clients" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clientUpdate: {
    metadata: { title: "Reiyen – Update Client" },
    header: "Update Client",
    description: "Edit client details.",
    backLink: { text: "Back to Clients", href: "/clients" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clientDelete: {
    metadata: { title: "Reiyen – Delete Client" },
    header: "Delete Client",
    description: "Remove a client.",
    backLink: { text: "Back to Clients", href: "/clients" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  users: {
    metadata: { title: "Reiyen – Users" },
    header: "Users",
    description: "Manage user accounts.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  userCreate: {
    metadata: { title: "Reiyen – Create User" },
    header: "Create User",
    description: "Add a new user.",
    backLink: { text: "Back to Users", href: "/users" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  userUpdate: {
    metadata: { title: "Reiyen – Update User" },
    header: "Update User",
    description: "Edit user information.",
    backLink: { text: "Back to Users", href: "/users" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  userDelete: {
    metadata: { title: "Reiyen – Delete User" },
    header: "Delete User",
    description: "Remove a user account.",
    backLink: { text: "Back to Users", href: "/users" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  help: {
    metadata: { title: "Reiyen – Help" },
    header: "Help",
    description: "Get support and guidance.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  documentation: {
    metadata: { title: "Reiyen – Documentation" },
    header: "Documentation",
    description: "View platform documentation.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  changelog: {
    metadata: { title: "Reiyen – Changelog" },
    header: "Changelog",
    description: "See what’s new and improved.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  settings: {
    metadata: { title: "Reiyen – Settings" },
    header: "Settings",
    description: "Configure your organization.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  cookiePolicy: {
    metadata: { title: "Reiyen – Cookie Policy" },
    header: "Cookie Policy",
    description: "How we use cookies and how you can manage them.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  privacyPolicy: {
    metadata: { title: "Reiyen – Privacy Policy" },
    header: "Privacy Policy",
    description: "How we handle your personal information.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  termsOfService: {
    metadata: { title: "Reiyen – Terms of Service" },
    header: "Terms of Service",
    description: "Rules for using Reiyen’s services.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
};
