import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavMenus = ({ menus = [] }) => {
  const location = useLocation();

  const sortedMenus = [...menus]
    .filter((m) => m.active)
    .sort((a, b) => a.group - b.group);

  return (
    <Sidebar>
      <SidebarContent>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              {sortedMenus.map((menu) => {
                const isActive =
                  location.pathname === menu.link ||
                  menu.sub_menu?.some((s) => s.link === location.pathname);

                return (
                  <SidebarMenuItem key={menu.id}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={menu.link || "#"} className="flex items-center gap-2">

                        {menu.icon && <menu.icon size={16} />}

                        <span>{menu.menu_name}</span>

                      </NavLink>
                    </SidebarMenuButton>

                    {/* SUB MENU */}
                    {menu.sub_menu?.length > 0 && (
                      <div className="ml-6 mt-1 flex flex-col gap-1">
                        {menu.sub_menu
                          .filter((s) => s.active)
                          .sort((a, b) => a.display_position - b.display_position)
                          .map((sub) => (
                            <NavLink
                              key={sub.id}
                              to={sub.link}
                              className={({ isActive }) =>
                                `text-xs px-2 py-1 rounded-md ${
                                  isActive
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-primary"
                                }`
                              }
                            >
                              {sub.menu_name}
                            </NavLink>
                          ))}
                      </div>
                    )}

                  </SidebarMenuItem>
                );
              })}

            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
};

export default NavMenus;