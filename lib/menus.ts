

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {

  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard/analytics",
          label: t("dashboard"),
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [
            {
              href: "/dashboard/analytics",
              label: t("analytics"),
              active: pathname === "/dashboard/analytics",
              icon: "heroicons:arrow-trending-up",
              children: [],
            },
            {
              href: "/dashboard/customer-list",
              label: t("customerList"),
              active: pathname === "/dashboard/customer-list",
              children: [],
              icon: "heroicons:users",
            },
            {
              href: "/dashboard/order-list",
              label: t("orderList"),
              active: pathname === "/dashboard/order-list",
              children: [],
              icon: "heroicons:document-text",
            },
            {
              href: "/dashboard/return-list",
              label: t("returnList"),
              active: pathname === "/dashboard/return-list",
              children: [],
              icon: "heroicons:document-text",
            },
            {
              href: "/dashboard/product-list",
              label: t("productList"),
              active: pathname === "/dashboard/product-list",
              children: [],
              icon: "heroicons:document-text",
            },
            {
              href: "/dashboard/inventory-management",
              label: t("Inventory Management"),
              active: pathname === "/dashboard/inventory-management",
              children: [],
              icon: "heroicons:document-text",
            },
            {
              href: "/dashboard/banking",
              label: t("banking"),
              active: pathname === "/dashboard/banking",
              icon: "heroicons:credit-card",
              children: [],
            },
            {
              href: "/dashboard/user-rules",
              label: t("User Rules"),
              active: pathname === "/dashboard/user-rules",
              children: [],
              icon: "heroicons:document-text",
            },
            {
              href: "/dashboard/sales",
              label: t("sales"),
              active: pathname === "/dashboard/sales",
              children: [],
              icon: "heroicons:document-text",
            },
            {
              href: "/dashboard/settings",
              label: t("settings"),
              active: pathname === "/dashboard/settings",
              children: [],
              icon: "heroicons:document-text",
            },
          ],
        },
      ],
    },
    {
      groupLabel: t("Upcoming Features"),
      id: "app",
      menus: [
        {
          id: "chat",
          href: "/app/chat",
          label: t("chat"),
          active: pathname.includes("/app/chat"),
          icon: "heroicons-outline:chat",
          submenus: [],
        },
        {
          id: "email",
          href: "/app/email",
          label: t("email"),
          active: pathname.includes("/app/email"),
          icon: "heroicons-outline:mail",
          submenus: [],
        },
        {
          id: "kanban",
          href: "/app/kanban",
          label: t("kanban"),
          active: pathname.includes("/app/kanban"),
          icon: "heroicons-outline:view-boards",
          submenus: [],
        },
        {
          id: "calendar",
          href: "/app/calendar",
          label: t("calendar"),
          active:pathname.includes("/app/calendar"),
          icon: "heroicons-outline:calendar",
          submenus: [],
        },
        {
          id: "todo",
          href: "/app/todo",
          label: t("todo"),
          active:pathname.includes("/app/todo"),
          icon: "heroicons-outline:clipboard-check",
          submenus: [],
        },
      ],
    },
  ];
}
export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard/analytics",
          label: t("dashboard"),
          active: pathname.includes("/dashboard"),
          icon: "heroicons-outline:home",
          submenus: [
            {
              href: "/dashboard/analytics",
              label: t("analytics"),
              active: pathname === "/dashboard/analytics",
              icon: "heroicons:arrow-trending-up",
              children: [],
            },
            {
              href: "/dashboard/dash-ecom",
              label: t("ecommerce"),
              active: pathname === "/dashboard/dash-ecom",
              icon: "heroicons:shopping-cart",
              children: [],
            },
            {
              href: "/dashboard/project",
              label: t("project"),
              active: pathname === "/dashboard/project",
              icon: "heroicons:document",
              children: [],
            },
            {
              href: "/dashboard/crm",
              label: t("crm"),
              active: pathname === "/dashboard/crm",
              icon: "heroicons:share",
              children: [],
            },
            {
              href: "/dashboard/banking",
              label: t("banking"),
              active: pathname === "/dashboard/banking",
              icon: "heroicons:credit-card",
              children: [],
            },
          ],
        },
      ],
    },

    {
      groupLabel: t("apps"),
      id: "app",
      menus: [
        {
          id: "app",
          href: "/app/chat",
          label: t("apps"),
          active: pathname.includes("/app/chat"),
          icon: "heroicons-outline:chat",
          submenus: [
            {
              href: "/app/chat",
              label: t("chat"),
              active: pathname === "/app/chat",
              icon: "heroicons-outline:chat",
              children: [],
            },
            {
              href: "/app/email",
              label: t("email"),
              active: pathname === "/app/email",
              icon: "heroicons-outline:mail",
              children: [],
            },
            {
              href: "/app/kanban",
              label: t("kanban"),
              active: pathname === "/app/kanban",
              icon: "heroicons-outline:view-boards",
              children: [],
            },
            {
              href: "/app/calendar",
              label: t("calendar"),
              active: pathname === "/app/calendar",
              icon: "heroicons-outline:calendar",
              children: [],
            },
            {
              href: "/app/todo",
              label: t("todo"),
              active: pathname === "/app/todo",
              icon: "heroicons-outline:clipboard-check",
              children: [],
            },
          ],
        },
      ],
    },
  ];
}


