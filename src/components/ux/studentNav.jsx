"use client";

import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const StudentNav = ({ NavMenus = [] }) => {
  const menuRef = useRef(null);
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  const sortedMenus = [...NavMenus]
    .filter(menu => menu.active)
    .sort((a, b) => a.group - b.group);


  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${hidden ? "-translate-y-20" : "translate-y-0"
        } ${scrolled
          ? "backdrop-blur-xl bg-background/70 shadow-sm"
          : "bg-background"
        }`}
    >
      {/* Gradient Line */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-6 h-[60px]">

        <h1 className="text-sm font-semibold text-primary">
          Welcome Subhojit Paul
        </h1>

        {/* DESKTOP MENU */}
        <ul ref={menuRef} className="hidden lg:flex items-center gap-2">
          {sortedMenus.map((menu) => {
            const isActive =
              location.pathname === menu.link ||
              menu.sub_menu?.some((s) => s.link === location.pathname);

            return (
              <li key={menu.id} className="relative">
  
  <div
    onMouseEnter={() => setActiveMenu(menu.id)}
    className="flex items-center"
  >
    <NavLink
      to={menu.link ?? "#"}
      className={`flex items-center gap-1 px-3 py-1.5 text-[12px] font-medium rounded-full transition
      ${activeMenu === menu.id
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
      }`}
    >
      {menu.icon && <menu.icon size={14} />}
      {menu.menu_name}

      {menu?.sub_menu?.length > 0 && (
        <ChevronDown
          size={12}
          className={`transition-transform ${
            activeMenu === menu.id ? "rotate-180" : ""
          }`}
        />
      )}
    </NavLink>
  </div>

  {/* DROPDOWN WRAP (IMPORTANT) */}
  {menu?.sub_menu?.length > 0 &&
    activeMenu === menu.id && (
      <div
        onMouseEnter={() => setActiveMenu(menu.id)}
        onMouseLeave={() => setActiveMenu(null)}
        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="w-[420px] rounded-xl border bg-background shadow-lg p-4">
          <div className="grid grid-cols-2 gap-2">
            {menu.sub_menu
              ?.filter(sub => sub.active)
              .sort((a, b) => a.display_position - b.display_position)
              .map((sub) => (
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
          <Menu size={22} />
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
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              {sortedMenus.map((menu) => (
                <div key={menu.id}>
                  {menu.link && (
                    <NavLink
                      to={menu.link}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 font-medium ${isActive ? "text-primary" : ""
                        }`
                      }
                    >
                      {menu.icon && <menu.icon size={16} />}
                      {menu.menu_name}
                    </NavLink>
                  )}

                  {menu?.sub_menu?.length > 0 && (
                    <div className="pl-4 mt-1 flex flex-col gap-1 text-xs">
                      {menu.sub_menu
                        ?.filter(sub => sub.active)
                        .sort((a, b) => a.display_position - b.display_position).map((sub) => (
                          <NavLink
                            key={sub.id}
                            to={sub.link}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center gap-2 ${isActive
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

export default StudentNav;