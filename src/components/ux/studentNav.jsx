"use client";

import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef} from "react";
import { IconChevronDown, IconMenu, IconX } from "@tabler/icons-react";
import { menuData } from "@/constant/dummy_data";

const Navbar = () => {
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      setScrolled(current > 20);

      if (current > lastScroll.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-20" : "translate-y-0"
      } ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 shadow-sm"
          : "bg-background"
      }`}
    >
      {/* Gradient Line */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-6 h-[60px]">

        {/* LEFT: APP NAME (instead of logo) */}
        <h1 className="text-sm font-semibold text-primary">
          MyApp
        </h1>

        {/* DESKTOP MENU */}
        <ul className="hidden lg:flex items-center gap-2">
          {menuData.map((menu) => {
            const isActive =
              location.pathname === menu.link ||
              menu.sub_menu?.some((s) => s.link === location.pathname);

            return (
              <li
                key={menu.id}
                className="relative"
                onMouseEnter={() => setActiveMenu(menu.menu_name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <NavLink
                  to={menu.link ?? "#"}
                  className={`flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium rounded-full transition
                  ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {menu.icon && <menu.icon size={14} />}

                  {menu.menu_name}

                  {menu?.sub_menu?.length > 0 && (
                    <IconChevronDown
                      size={12}
                      className={`transition-transform ${
                        activeMenu === menu.menu_name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </NavLink>

                {/* DROPDOWN */}
                {menu?.sub_menu?.length > 0 &&
                  activeMenu === menu.menu_name && (
                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2">
                      <div className="w-[420px] rounded-xl border bg-background shadow-lg p-4">
                        <div className="grid grid-cols-2 gap-2">
                          {menu.sub_menu.map((sub) => (
                            <NavLink
                              key={sub.id}
                              to={sub.link}
                              className="flex items-center gap-2 p-2 rounded-lg text-xs hover:bg-primary/5"
                            >
                              {sub.icon && (
                                <sub.icon size={14} className="text-primary" />
                              )}
                              {sub.menu_name}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
              </li>
            );
          })}
        </ul>

        {/* MOBILE BUTTON */}
        <button onClick={() => setMobileOpen(true)} className="lg:hidden">
          <IconMenu size={22} />
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed top-0 left-0 h-full w-72 bg-background p-5 z-50">
            <div className="flex justify-between mb-5">
              <span className="font-semibold">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <IconX size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              {menuData.map((menu) => (
                <div key={menu.id}>
                  {menu.link && (
                    <NavLink
                      to={menu.link}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 font-medium ${
                          isActive ? "text-primary" : ""
                        }`
                      }
                    >
                      {menu.icon && <menu.icon size={16} />}
                      {menu.menu_name}
                    </NavLink>
                  )}

                  {menu?.sub_menu?.length > 0 && (
                    <div className="pl-4 mt-1 flex flex-col gap-1 text-xs">
                      {menu.sub_menu.map((sub) => (
                        <NavLink
                          key={sub.id}
                          to={sub.link}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2 ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`
                          }
                        >
                          {sub.icon && <sub.icon size={14} />}
                          {sub.menu_name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;