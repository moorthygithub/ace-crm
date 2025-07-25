import * as React from "react";
import {
  AudioWaveform,
  BadgeIndianRupee,
  Blocks,
  Command,
  Folder,
  Frame,
  GalleryVerticalEnd,
  Map,
  NotebookText,
  ReceiptText,
  Settings,
  Settings2,
  TicketPlus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMainUser } from "./nav-main-user";

const isItemAllowed = (item, pageControl, userId) => {
  const itemUrl = item.url?.replace(/^\//, "");
  return pageControl.some(
    (control) =>
      control.page === item.title &&
      control.url === itemUrl &&
      control.userIds.includes(userId) &&
      control.status === "Active"
  );
};

const filterMenuItems = (items, pageControl, userId) => {
  if (!items) return [];

  return items.reduce((acc, item) => {
    if (item.items) {
      const filteredItems = filterMenuItems(item.items, pageControl, userId);
      if (filteredItems.length > 0) {
        acc.push({
          ...item,
          items: filteredItems,
        });
      }
    } else if (isItemAllowed(item, pageControl, userId)) {
      acc.push(item);
    }
    return acc;
  }, []);
};

export function AppSidebar({ ...props }) {
  const nameL = localStorage.getItem("name");
  const emailL = localStorage.getItem("email");
  const companyName = localStorage.getItem("companyName");
  const userId = localStorage.getItem("id");
  const pageControl = JSON.parse(localStorage.getItem("pageControl")) || [];

  const initialData = {
    user: {
      name: `${nameL}`,
      email: `${emailL}`,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: `${companyName}`,
        logo: GalleryVerticalEnd,
        plan: "",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/home",
        icon: Frame,
        isActive: false,
      },
      {
        title: "Master",
        url: "#",
        isActive: false,
        icon: Settings2,
        items: [
          {
            title: "Company",
            url: "/master/branch",
          },
          {
            title: "State",
            url: "/master/state",
          },
          {
            title: "Bank",
            url: "/master/bank",
          },
          {
            title: "Buyer",
            url: "/master/buyer",
          },
          {
            title: "Scheme",
            url: "/master/scheme",
          },
          {
            title: "Country",
            url: "/master/country",
          },
          {
            title: "Container Size",
            url: "/master/containersize",
          },
          {
            title: "Payment TermsC",
            url: "/master/paymentTermC",
          },
          {
            title: "Description of Goods",
            url: "/master/descriptionGoods",
          },
          {
            title: "Bag Type",
            url: "/master/bagType",
          },
          {
            title: "Custom Description",
            url: "/master/customdescription",
          },
          {
            title: "Type",
            url: "/master/type",
          },
          {
            title: "Quality",
            url: "/master/quality",
          },
          {
            title: "Item",
            url: "/master/item",
          },
          {
            title: "Marking",
            url: "/master/marking",
          },
          {
            title: "Port of Loading",
            url: "/master/portofloading",
          },
          {
            title: "GR Code",
            url: "/master/grcode",
          },
          {
            title: "Product",
            url: "/master/product",
          },
          {
            title: "Product Description",
            url: "/master/productdescription",
          },
          {
            title: "Shipper",
            url: "/master/shipper",
          },
          {
            title: "Vessel",
            url: "/master/vessel",
          },
          {
            title: "Pre Recepits",
            url: "/master/prerecepits",
          },
          {
            title: "Vendor",
            url: "/master/vendor",
          },
          {
            title: "Purchase Product",
            url: "/master/purchase-product",
          },
        ],
      },
      {
        title: "Contract",
        url: "/contract",
        icon: Blocks,
        isActive: false,
      },
      {
        title: "Invoice",
        url: "/invoice",
        icon: NotebookText,
        isActive: false,
      },

      {
        title: "Purchase",
        url: "#",
        icon: TicketPlus,
        isActive: false,
        items: [
          {
            title: "Purchase Order",
            url: "/purchase-order",
          },
          {
            title: "Purchase",
            url: "/purchase/market-purchase",
          },
          {
            title: "Production",
            url: "/purchase/market-production",
          },
          {
            title: "Processing",
            url: "/purchase/market-processing",
          },
          {
            title: "Dispatch",
            url: "/purchase/market-dispatch",
          },
          {
            title: "Stock",
            url: "/purchase/stock",
          },
        ],
      },
      {
        title: "Payment",
        url: "#",
        icon: BadgeIndianRupee,
        isActive: false,
        items: [
          {
            title: "PaymentList",
            url: "/payment-payment-list",
          },
          {
            title: "PaymentPending",
            url: "/payment-payment-pending",
          },
          {
            title: "PaymentClose",
            url: "/payment-payment-close",
          },
        ],
      },
      {
        title: "Duty DrawBack",
        url: "#",
        icon: ReceiptText,
        isActive: false,
        items: [
          {
            title: "Pending",
            url: "/dutydrawback/pending",
          },
          {
            title: "Received",
            url: "/dutydrawback/received",
          },
        ],
      },
      {
        title: "Reports",
        url: "#",
        icon: ReceiptText,
        isActive: false,
        items: [
          {
            title: "BuyerR",
            url: "/report/buyer-report",
          },
          {
            title: "ContractR",
            url: "/report/contract-form",
          },
          {
            title: "Sales Accounts",
            url: "/report/sales-account-form",
          },
          {
            title: "DutyDrawBack",
            url: "/report/duty-drawback",
          },
          {
            title: "Sales Summary",
            url: "/report/sales-data-form",
          },
          {
            title: "Purchase Summary",
            url: "/report/monthwise-purchase-form",
          },
          {
            title: "Product Stock",
            url: "/report/product-stock",
          },
        ],
      },
      {
        title: "Costing",
        url: "/costing",
        icon: NotebookText,
        isActive: false,
      },
      {
        title: "Folder",
        url: "/folder",
        icon: Folder,
        isActive: false,
      },
    ],

    userManagement: [
      {
        name: "User Management",
        url: "/userManagement",
        icon: Frame,
      },
      {
        name: "UserType",
        url: "/user-type",
        icon: Settings,
      },
    ],
  };

  // Filter menu items based on user permissions
  const filteredNavMain = filterMenuItems(
    initialData.navMain,
    pageControl,
    userId
  );
  // const filteredProjects = filterMenuItems(initialData.projects.map(p => ({
  //   title: p.name,
  //   url: p.url
  // })), pageControl, userId).map(p => ({
  //   name: p.title,
  //   url: p.url,
  //   icon: initialData.projects.find(orig => orig.name === p.title)?.icon || Frame
  // }));
  const filteredUserManagement = filterMenuItems(
    initialData.userManagement.map((p) => ({
      title: p.name,
      url: p.url,
    })),
    pageControl,
    userId
  ).map((p) => ({
    name: p.title,
    url: p.url,
    icon:
      initialData.userManagement.find((orig) => orig.name === p.title)?.icon ||
      Frame,
  }));

  const data = {
    ...initialData,
    navMain: filteredNavMain,
    // projects: filteredProjects,
    userManagement: filteredUserManagement,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="sidebar-content">
        {/* <NavProjects projects={data.projects} /> */}
        <NavMain items={data.navMain} />
        <NavMainUser projects={data.userManagement} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
