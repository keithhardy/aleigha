export type PagesConfig = {
  metadata: {
    title: string;
  };
  title: string;
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
    title: "Dashboard",
    description: "View insights and activity.",
    callToAction: { text: "Docs", href: "/documentation" },
  },
  logs: {
    metadata: { title: "Reiyen – Logs" },
    title: "Logs",
    description: "View system logs and activity history.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  certificates: {
    metadata: { title: "Reiyen – Certificates" },
    title: "Certificates",
    description: "Browse and manage certificates.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  certificateCreate: {
    metadata: { title: "Reiyen – Create Certificate" },
    title: "Create Certificate",
    description: "Add a new certificate.",
    backLink: { text: "Back to Certificates", href: "/certificates" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  properties: {
    metadata: { title: "Reiyen – Properties" },
    title: "Properties",
    description: "Manage client properties.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyCreate: {
    metadata: { title: "Reiyen – Create Property" },
    title: "Create Property",
    description: "Add a new property.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyImport: {
    metadata: { title: "Reiyen – Import Properties" },
    title: "Import Properties",
    description: "Import new properties.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyUpdate: {
    metadata: { title: "Reiyen – Update Property" },
    title: "Update Property",
    description: "Edit property information.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  propertyDelete: {
    metadata: { title: "Reiyen – Delete Property" },
    title: "Delete Property",
    description: "Delete an existing property.",
    backLink: { text: "Back to Properties", href: "/properties" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clients: {
    metadata: { title: "Reiyen – Clients" },
    title: "Clients",
    description: "Manage your client list.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clientCreate: {
    metadata: { title: "Reiyen – Create Client" },
    title: "Create Client",
    description: "Add a new client.",
    backLink: { text: "Back to Clients", href: "/clients" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clientUpdate: {
    metadata: { title: "Reiyen – Update Client" },
    title: "Update Client",
    description: "Edit client details.",
    backLink: { text: "Back to Clients", href: "/clients" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  clientDelete: {
    metadata: { title: "Reiyen – Delete Client" },
    title: "Delete Client",
    description: "Remove a client.",
    backLink: { text: "Back to Clients", href: "/clients" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  users: {
    metadata: { title: "Reiyen – Users" },
    title: "Users",
    description: "Manage user accounts.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  userCreate: {
    metadata: { title: "Reiyen – Create User" },
    title: "Create User",
    description: "Add a new user.",
    backLink: { text: "Back to Users", href: "/users" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  userUpdate: {
    metadata: { title: "Reiyen – Update User" },
    title: "Update User",
    description: "Edit user information.",
    backLink: { text: "Back to Users", href: "/users" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  userDelete: {
    metadata: { title: "Reiyen – Delete User" },
    title: "Delete User",
    description: "Remove a user account.",
    backLink: { text: "Back to Users", href: "/users" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  help: {
    metadata: { title: "Reiyen – Help" },
    title: "Help",
    description: "Get support and guidance.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  documentation: {
    metadata: { title: "Reiyen – Documentation" },
    title: "Documentation",
    description: "View platform documentation.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  changelog: {
    metadata: { title: "Reiyen – Changelog" },
    title: "Changelog",
    description: "See what’s new and improved.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  settings: {
    metadata: { title: "Reiyen – Settings" },
    title: "Settings",
    description: "Configure your organization.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  cookiePolicy: {
    metadata: { title: "Reiyen – Cookie Policy" },
    title: "Cookie Policy",
    description: "How we use cookies and how you can manage them.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  privacyPolicy: {
    metadata: { title: "Reiyen – Privacy Policy" },
    title: "Privacy Policy",
    description: "How we handle your personal information.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
  termsOfService: {
    metadata: { title: "Reiyen – Terms of Service" },
    title: "Terms of Service",
    description: "Rules for using Reiyen’s services.",
    backLink: { text: "Back to Dashboard", href: "/" },
    callToAction: { text: "Docs", href: "/documentation" },
  },
};
