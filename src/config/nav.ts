import { SidebarLink } from "@/components/SidebarItems";
import { ChartNoAxesCombined, Cog, Globe, History, HomeIcon, User } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  {
    href: "/calculate",
    title: "Calculate Emission",
    icon: ChartNoAxesCombined,
  },
  {
    href: "/records",
    title: "Past Records",
    icon: History,
  },
  { href: "/settings", title: "Settings", icon: Cog },
  { href: "/account", title: "Account", icon: User },
];

export const additionalLinks: AdditionalLinks[] = [];
