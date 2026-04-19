import Banner_1 from '@/assets/images/banners/1.jpg';
import Banner_2 from '@/assets/images/banners/2.jpg';
import Banner_3 from '@/assets/images/banners/3.jpg';
import Banner_4 from '@/assets/images/banners/4.jpg';
import Aima from '@/assets/images/others/aima-logo.jpg';
import Clat from '@/assets/images/others/clat-logo.jpg';
import Uceed from '@/assets/images/others/uceed-logo.jpg';

import {
  IconHome,
  IconInfoCircle,
  IconSchool,
  IconCertificate,
  IconBuilding,
  IconCalendarEvent,
  IconFileText,
  IconForms,
  IconWorld,
  IconBook,
  IconUsers,
  IconShield,
  IconHeartHandshake,
  IconBriefcase,
  IconFlask,
  IconScale,
} from "@tabler/icons-react";
import {IconCalculator,IconDeviceDesktopAnalytics,IconUser,IconBooks} from "@tabler/icons-react";

import Events_1 from '@/assets/images/events/1.jpg';
import Events_2 from '@/assets/images/events/2.jpg';
import Events_3 from '@/assets/images/events/3.jpg';

import School_1 from '@/assets/images/schools/1.avif';
import School_2 from '@/assets/images/schools/2.avif';
import School_3 from '@/assets/images/schools/4.jpg';

export const menuData = [
  {
    id: 1,
    menu_name: "HOME",
    link: "/",
    icon: IconHome,
    sub_menu: []
  },
  {
    id: 2,
    menu_name: "ABOUT SNU",
    link: "",
    icon: IconInfoCircle,
    sub_menu: [
      {
        id: 1,
        parent_menu_id: 2,
        menu_name: "About The Sister Nivedita University",
        icon: IconBuilding,
        link: "/about-snu/about-the-sister-nivedita-university/13"
      },
      {
        id: 2,
        parent_menu_id: 2,
        menu_name: "Vision And Mission",
        icon: IconHeartHandshake,
        link: "/about-snu/vision-and-mission/14"
      },
      {
        id: 3,
        parent_menu_id: 2,
        menu_name: "Founder And Leadership",
        icon: IconUsers,
        link: "/about-snu/founder-and-leadership/15"
      },
      {
        id: 4,
        parent_menu_id: 2,
        menu_name: "Authorities of The University",
        icon: IconScale,
        link: "/about-snu/authorities-of-the-university/16"
      },
      {
        id: 5,
        parent_menu_id: 2,
        menu_name: "Government Recognition",
        icon: IconCertificate,
        link: "/about-snu/government-recognition/17"
      }
    ]
  },
  {
    id: 3,
    menu_name: "ACADEMICS",
    link: "",
    icon: IconSchool,
    sub_menu: [
      {
        id: 1,
        parent_menu_id: 3,
        menu_name: "School of Arts, Media & Design",
        icon: IconBook,
        link: "/school/school-of-arts-media-and-design/25"
      },
      {
        id: 2,
        parent_menu_id: 3,
        menu_name: "School of Humanities, Languages & Social Sciences",
        icon: IconUsers,
        link: "/school/school-of-humanities-languages-and-social-sciences/27"
      },
      {
        id: 3,
        parent_menu_id: 3,
        menu_name: "School of Law, Business & Governance",
        icon: IconBriefcase,
        link: "/school/school-of-law-business-and-governance/26"
      },
      {
        id: 4,
        parent_menu_id: 3,
        menu_name: "School of Life, Agricultural & Biotechnological Sciences",
        icon: IconFlask,
        link: "/school/school-of-life-agricultural-and-biotechnological-sciences/23"
      },
      {
        id: 5,
        parent_menu_id: 3,
        menu_name: "School of Nursing, Health & Pharmaceutical Sciences",
        icon: IconHeartHandshake,
        link: "/school/school-of-nursing-health-and-pharmaceutical-sciences/28"
      },
      {
        id: 6,
        parent_menu_id: 3,
        menu_name: "School of Science & Technology",
        icon: IconFlask,
        link: "/school/school-of-science-and-technology/24"
      },
      {
        id: 7,
        parent_menu_id: 3,
        menu_name: "School of Lifelong Learning",
        icon: IconBook,
        link: "/school/school-of-lifelong-learning/30"
      }
    ]
  },
  {
    id: 4,
    menu_name: "ADMISSION",
    link: "",
    icon: IconCertificate,
    sub_menu: [
      {
        id: 1,
        parent_menu_id: 4,
        menu_name: "Admission Process",
        icon: IconFileText,
        link: "/admission/admission-process/58"
      },
      {
        id: 2,
        parent_menu_id: 4,
        menu_name: "Scholarship Programs",
        icon: IconCertificate,
        link: "/admission/scholarship-programs/38"
      },
      {
        id: 3,
        parent_menu_id: 4,
        menu_name: "Admission for International Students",
        icon: IconWorld,
        link: "/admission/admission-for-international-students/61"
      },
      {
        id: 4,
        parent_menu_id: 4,
        menu_name: "Student credit card",
        icon: IconFileText,
        link: "/admission/student-credit-card/60"
      },
      {
        id: 5,
        parent_menu_id: 4,
        menu_name: "Student Bank Loan",
        icon: IconFileText,
        link: "/admission/student-bank-loan/59"
      },
      {
        id: 6,
        parent_menu_id: 4,
        menu_name: "Academic Calendar",
        icon: IconCalendarEvent,
        link: "/admission/academic-calendar/63"
      },
      {
        id: 7,
        parent_menu_id: 4,
        menu_name: "Fee Structure",
        icon: IconFileText,
        link: "https://snuniv.ac.in/fees-structure.aspx"
      },
      {
        id: 8,
        parent_menu_id: 4,
        menu_name: "PhD Admission",
        icon: IconCertificate,
        link: "https://phd.snuniv.ac.in/"
      },
      {
        id: 9,
        parent_menu_id: 4,
        menu_name: "PhD Important Announcement 2025-2026",
        icon: IconFileText,
        link: "/admission/phd-important-announcement-2025-2026/99"
      }
    ]
  },
  {
    id: 5,
    menu_name: "CAMPUS LIFE",
    link: "",
    icon: IconBuilding,
    sub_menu: [
      {
        id: 1,
        parent_menu_id: 5,
        menu_name: "Our Campus",
        icon: IconBuilding,
        link: "/campus-life/our-campus/45"
      },
      {
        id: 2,
        parent_menu_id: 5,
        menu_name: "Our Facilities",
        icon: IconBuilding,
        link: "/campus-life/our-facilities/46"
      },
      {
        id: 3,
        parent_menu_id: 5,
        menu_name: "Extra Curricular Activities",
        icon: IconUsers,
        link: "/campus-life/extra-curricular-activities/48"
      },
      {
        id: 4,
        parent_menu_id: 5,
        menu_name: "Safety & Security",
        icon: IconShield,
        link: "/campus-life/safety-and-security/49"
      },
      {
        id: 5,
        parent_menu_id: 5,
        menu_name: "Anti Ragging Policy & Committee",
        icon: IconShield,
        link: "/campus-life/anti-ragging-policy-and-committee/50"
      },
      {
        id: 6,
        parent_menu_id: 5,
        menu_name: "Student Grievance",
        icon: IconUsers,
        link: "https://snuniv.ac.in/student-grievance-login.aspx"
      },
      {
        id: 7,
        parent_menu_id: 5,
        menu_name: "SNU Ethics Committee",
        icon: IconScale,
        link: "/campus-life/sister-nivedita-university-ethics-committee/106"
      },
      {
        id: 8,
        parent_menu_id: 5,
        menu_name: "SNU - NCC",
        icon: IconUsers,
        link: "/campus-life/snu-ncc/110"
      }
    ]
  },
  {
    id: 6,
    menu_name: "EVENTS",
    link: "https://snuniv.ac.in/eventsall.aspx",
    icon: IconCalendarEvent,
    sub_menu: []
  },
  {
    id: 7,
    menu_name: "EXAM NOTICE",
    link: "https://snuniv.ac.in/exam-circulars.aspx",
    icon: IconFileText,
    sub_menu: []
  },
  {
    id: 8,
    menu_name: "STUDENT FORM",
    link: "/exam-notice/student-form/76",
    icon: IconForms,
    sub_menu: []
  },
  {
    id: 9,
    menu_name: "WILP",
    link: "https://wilp.snuniv.ac.in/",
    icon: IconWorld,
    sub_menu: []
  }
];


export const dashboard_data = [
  {
    id:1,
    image:Banner_1
  },
  {
    id:2,
    image:Banner_2
  },
  {
    id:3,
    image:Banner_3
  },
  {
    id:4,
    image:Banner_4
  }
]


export const platforms = [
  {
    title: "AIMA MAT",
    desc: "(for admission to MBA)",
    img: Aima,
  },
  {
    title: "UCEED 2025",
    desc: "(for admission to B.Des)",
    img: Uceed,
  },
  {
    title: "CLAT 25",
    desc: "(for admission to Law programs)",
    img: Clat,
  },
]

export const features = [
    {
        id: "01",
        title: "Curriculum",
        desc: "Dynamic curriculum designed to transform education.",
        icon: IconCalculator,
        image:
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "Tech Classroom",
        desc: "Smart classrooms with digital learning tools.",
        icon: IconDeviceDesktopAnalytics,
        image:
            "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1200",
    },
    {
        id: "03",
        title: "Experts",
        desc: "Learn from industry-leading educators.",
        icon: IconUser,
        image:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200",
    },
    {
        id: "04",
        title: "Digital Library",
        desc: "Access thousands of digital resources anytime.",
        icon: IconBooks,
        image:
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200",
    },
];


export const events = [
    {
        title: "Orientation Program 2025",
        desc: "Welcoming new students with campus introduction & sessions.",
        image:Events_1,
        date: "12 Jan",
    },
    {
        title: "Faculty Development Program",
        desc: "Enhancing teaching excellence with modern methodologies.",
        image:Events_2,
        date: "28 Feb",
    },
    {
        title: "Graduation Ceremony",
        desc: "Celebrating academic achievements and future journeys.",
        image:Events_3,
        date: "15 Mar",
    },
    {
        title: "Faculty Development Program",
        desc: "Enhancing teaching excellence with modern methodologies.",
        image:Events_2,
        date: "28 Feb",
    },
    {
        title: "Graduation Ceremony",
        desc: "Celebrating academic achievements and future journeys.",
        image:Events_3,
        date: "15 Mar",
    },
];

export const snu_schools = [
  {
    title: "School of Law",
    desc:"",
    date:"15 Mar",
    image: School_1,
  },
  {
    title: "School of Agriculture",
    desc:"",
    date:"15 Mar",
    image: School_2,
  },
  {
    title: "School of Lifelong Learning",
    desc:"",
    date:"15 Mar",
    image: Events_1,
  },
  {
    title: "School of Nursing",
    desc:"",
    date:"15 Mar",
    image: School_3,
  },
  {
    title: "School of Nursing",
    desc:"",
    date:"15 Mar",
    image: School_3,
  },
   {
    title: "School of Nursing",
    desc:"",
    date:"15 Mar",
    image: School_3,
  },
];