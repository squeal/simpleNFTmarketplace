export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Simple NFT Marketplace",
  description: "A too large take home assignment to evaluate potential hires",
  navItems: [
    {
      label: "Buy",
      href: "/",
    },
    {
      label: "List",
      href: "/list",
    },
  ],
};
