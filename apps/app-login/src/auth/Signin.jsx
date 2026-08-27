import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, GraduationCap, User } from "lucide-react"
import { motion } from "framer-motion"
import { Usersdata } from './UserMaster'
import { EncryptText, SetStorage } from '@/lib/Storage'
import FormComponent from "@/components/ux/FormComponent"

const tabs = [
  { value: "admin", label: "Admin", icon: Shield },
  { value: "teacher", label: "Teacher", icon: GraduationCap },
  { value: "student", label: "Student", icon: User },
]

const roleData = {
  admin: {
    title: "Admin Control Center",
    subtitle: "Manage the entire platform securely and efficiently.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
  },
  teacher: {
    title: "Teacher Workspace",
    subtitle: "Organize your classes, materials, and monitor growth.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80",
  },
  student: {
    title: "Student Portal",
    subtitle: "Access all your learning resources in one place.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80",
  },
}

export default function PremiumLogin() {
  const navigate = useNavigate()
  const [role, setRole] = useState("admin")

  // 1. Define your dynamic form fields array
  const loginFormConfig = [
    {
      acceseriesKey: "userName",
      label: "Username",
      placeholder: "Enter username",
      type: "input",
      validation: z.string().min(1, "*Username is required"),
    },
    {
      acceseriesKey: "password",
      label: "Password",
      placeholder: "********",
      type: "password",
      validation: z.string().min(1, "*Password is required"),
    },
  ]

  const handleTabChange = (val) => {
    setRole(val)
  }

  // 2. Handle form submission
  const onSubmit = (formData) => {
    // Merge selected tab role with inputs
    const data = { ...formData, userType: role }

    console.log("LOGIN DATA:", data)
    const user = Usersdata.find(
      (u) => u.username === data.userName && u.password === data.password && u.userType === data.userType
    )

    if (!user) {
      alert("Invalid credentials")
      return
    }

    console.log("LOGGED USER:", user)

    SetStorage(import.meta.env.VITE_USER_TYPE, EncryptText(user.userType))
    SetStorage(import.meta.env.VITE_ROLE, EncryptText(user.role))
    SetStorage(import.meta.env.VITE_SUBROLE, EncryptText(user.subRole))

    if (user.userType === "admin") {
      navigate("/admin-outlet")
    } else if (user.userType === "teacher") {
      navigate("/teacher-outlet")
    } else {
      navigate("/student")
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.img
        key={role}
        src={roleData[role].image}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-transparent backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center px-4">
        {/* LEFT COLUMN - ROLE DETAILS */}
        <motion.div
          key={role}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 hidden lg:block"
        >
          <h1 className="text-4xl font-bold text-gray-900">General College</h1>
          <h2 className="text-2xl font-semibold text-gray-800">{roleData[role].title}</h2>
          <p className="text-gray-700 text-lg">{roleData[role].subtitle}</p>
        </motion.div>

        {/* RIGHT LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md ml-auto rounded-2xl p-8 bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl text-gray-900"
        >
          {/* CARD HEADER */}
          <div className="text-center mb-6 space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                GC
              </div>
            </div>
            <h2 className="text-2xl font-semibold">General College</h2>
            <p className="text-gray-600 text-sm">Sign in to your account</p>
          </div>

          {/* ROLE SELECTOR TABS */}
          <Tabs value={role} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 h-14 p-1 rounded-xl bg-white/60 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-600 hover:text-black data-[state=active]:!bg-primary data-[state=active]:!text-white"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>

          {/* 🔥 DYNAMIC FORM COMPONENT REPLACING MANUAL FORM FIELDS */}
          <FormComponent
            formField={loginFormConfig}
            onSubmit={onSubmit}
            submitBtnText="Sign In"
          />
        </motion.div>
      </div>
    </div>
  )
}
