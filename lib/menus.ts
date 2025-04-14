import { roleRoutes } from "@/lib/roleRoutes";

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

export function getMenuList(pathname: string, t: any, role: string): Group[] {
  const allowedRoutes = new Set(roleRoutes[role] || []);
  const isAllowed = (href: string) =>
      allowedRoutes.has("*") || allowedRoutes.has(href);

  const allMenus: Group[] = [
    {
      groupLabel: t("dashboard"),
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: "/dashboard/analytics",
          label: t("dashboard"),
          icon: "heroicons-outline:home",
          submenus: [
            {
              href: "/dashboard/analytics",
              active: pathname === "/dashboard/analytics",
              label: t("analytics"),
              children: [],
              icon: "heroicons:arrow-trending-up",
            },
            {
              href: "/dashboard/customer-list",
              active: pathname === "/dashboard/customer-list",
              label: t("customerList"),
              icon: "heroicons:users",
              children: [],
            },
            {
              href: "/dashboard/order-list",
              active: pathname === "/dashboard/order-list",
              label: t("orderList"),
              icon: "heroicons:document-text",
              children: [],
            },
            {
              href: "/dashboard/return-list",
              active: pathname === "/dashboard/return-list",
              label: t("returnList"),
              icon: "heroicons:document-text",
              children: [],
            },
            {
              href: "/dashboard/product-list",
              active: pathname === "/dashboard/product-list",
              label: t("productList"),
              icon: "heroicons:document-text",
              children: [],
            },
            {
              href: "/dashboard/inventory-management",
              active: pathname === "/dashboard/inventory-management",
              label: t("Inventory Management"),
              icon: "heroicons:document-text",
              children: [],
            },
            {
              href: "/dashboard/banking",
              active: pathname === "/dashboard/banking",
              label: t("banking"),
              icon: "heroicons:credit-card",
              children: [],
            },
            {
              href: "/dashboard/user-rules",
              active: pathname === "/dashboard/user-rules",
              label: t("User Rules"),
              icon: "heroicons:document-text",
              children: [],
            },
            {
              href: "/dashboard/sales",
              active: pathname === "/dashboard/sales",
              label: t("sales"),
              icon: "heroicons:document-text",
              children: [],
            },
            {
              href: "/dashboard/settings",
              active: pathname === "/dashboard/settings",
              label: t("settings"),
              icon: "heroicons:document-text",
              children: [],
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
          active: pathname === "/app/chat",
          label: t("chat"),
          icon: "heroicons-outline:chat",
          submenus: [],
        },
        {
          id: "email",
          href: "/app/email",
          active: pathname === "/app/email",
          label: t("email"),
          icon: "heroicons-outline:mail",
          submenus: [],
        },
        {
          id: "kanban",
          href: "/app/kanban",
          active: pathname === "/app/kanban",
          label: t("kanban"),
          icon: "heroicons-outline:view-boards",
          submenus: [],
        },
        {
          id: "calendar",
          active: pathname === "/app/calendar",
          href: "/app/calendar",
          label: t("calendar"),
          icon: "heroicons-outline:calendar",
          submenus: [],
        },
        {
          id: "todo",
          active: pathname === "/app/todo",
          href: "/app/todo",
          label: t("todo"),
          icon: "heroicons-outline:clipboard-check",
          submenus: [],
        },
      ],
    },
  ];

  const filteredGroups: Group[] = [];

  for (const group of allMenus) {
    const filteredMenus = [];

    for (const menu of group.menus) {
      const filteredSubmenus = menu.submenus?.filter((sub) =>
          isAllowed(sub.href)
      ) ?? [];

      const includeMenu =
          isAllowed(menu.href) || filteredSubmenus.length > 0;

      if (includeMenu) {
        filteredMenus.push({
          ...menu,
          active:
              menu.href && pathname.startsWith(menu.href),
          submenus: filteredSubmenus.map((sub) => ({
            ...sub,
            active: pathname === sub.href,
          })),
        });
      }
    }

    if (filteredMenus.length > 0) {
      filteredGroups.push({
        ...group,
        menus: filteredMenus,
      });
    }
  }

  return filteredGroups;
}

export function getHorizontalMenuList(pathname: string, t: any, role: string): Group[] {
  const allowedRoutes: Record<string, string[]> = {
    admin: [
      "/dashboard/analytics",
      "/dashboard/dash-ecom",
      "/dashboard/project",
      "/dashboard/crm",
      "/dashboard/banking",
      "/app/chat",
      "/app/email",
      "/app/kanban",
      "/app/calendar",
      "/app/todo",
    ],
    "inventory manager": [
      "/dashboard/analytics",
      "/dashboard/banking",
      "/app/calendar",
    ],
    sales: [
      "/dashboard/analytics",
      "/dashboard/project",
      "/dashboard/crm",
      "/app/chat",
      "/app/email",
    ],
  };

  const routes = allowedRoutes[role] || [];

  const filterSubmenus = (submenus: Submenu[]): Submenu[] => {
    return submenus
        .map((submenu) => ({
          ...submenu,
          children: submenu.children || [],
          active: pathname === submenu.href,
        }))
        .filter((submenu) => routes.includes(submenu.href));
  };

  const groups: Group[] = [
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
          submenus: filterSubmenus([
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
          ]),
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
          active: pathname.includes("/app"),
          icon: "heroicons-outline:chat",
          submenus: filterSubmenus([
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
          ]),
        },
      ],
    },
  ];

  // remove empty menus
  return groups
      .map((group) => ({
        ...group,
        menus: group.menus.filter((menu) => menu.submenus.length > 0),
      }))
      .filter((group) => group.menus.length > 0);
}

