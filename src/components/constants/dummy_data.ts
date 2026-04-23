import {
  Home,
  Info,
  School,
  Award,
  Building,
  Calendar,
  FileText,
  Globe,
  Book,
  Users,
  Shield,
  HeartHandshake,
  Briefcase,
  FlaskConical,
  Scale
} from "lucide-react";

/* ================= MENU ================= */

export const menuData = [
  {
    id: 1,
    menu_name: "HOME",
    link: "/dashboard",
    icon: Home,
    group: 1, // main menu position
    active: true,
    sub_menu: []
  },
  {
    id: 2,
    menu_name: "ABOUT",
    link: "",
    icon: Info,
    group: 2,
    active: true,
    sub_menu: [
      {
        id: 1,
        menu_name: "About The University",
        icon: Building,
        link: "/about",
        group: 2,
        display_position: 1,
        active: true
      },
      {
        id: 2,
        menu_name: "Vision & Mission",
        icon: HeartHandshake,
        link: "/vision",
        group: 2,
        display_position: 2,
        active: true
      },
      {
        id: 3,
        menu_name: "Leadership",
        icon: Users,
        link: "/leadership",
        group: 2,
        display_position: 3,
        active: true
      },
      {
        id: 4,
        menu_name: "Authorities",
        icon: Scale,
        link: "/authorities",
        group: 2,
        display_position: 4,
        active: true
      },
      {
        id: 5,
        menu_name: "Recognition",
        icon: Award,
        link: "/recognition",
        group: 2,
        display_position: 5,
        active: true
      }
    ]
  },
  {
    id: 3,
    menu_name: "ACADEMICS",
    link: "",
    icon: School,
    group: 3,
    active: true,
    sub_menu: [
      {
        id: 1,
        menu_name: "Arts & Design",
        icon: Book,
        link: "/arts",
        group: 3,
        display_position: 1,
        active: true
      },
      {
        id: 2,
        menu_name: "Humanities",
        icon: Users,
        link: "/humanities",
        group: 3,
        display_position: 2,
        active: true
      },
      {
        id: 3,
        menu_name: "Law & Business",
        icon: Briefcase,
        link: "/law",
        group: 3,
        display_position: 3,
        active: true
      },
      {
        id: 4,
        menu_name: "Life Sciences",
        icon: FlaskConical,
        link: "/science",
        group: 3,
        display_position: 4,
        active: true
      }
    ]
  }
];