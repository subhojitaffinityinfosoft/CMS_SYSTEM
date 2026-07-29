import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Eye, EyeOff, Shield, GraduationCap, User } from "lucide-react"
import { motion } from "framer-motion"
import { Usersdata } from './UserMaster'
import { EncryptText, SetStorage } from '@/lib/Storage';
const loginSchema = z.object({
  userName: z.string().min(1, "Username required"),
  password: z.string().min(1, "Password required"),
  userType: z.string().default("admin"),
})

const tabs = [
  { value: "admin", label: "Admin", icon: Shield },
  { value: "teacher", label: "Teacher", icon: GraduationCap },
  { value: "student", label: "Student", icon: User },
]

const roleData = {
  admin: {
    title: "Admin Control Center",
    subtitle: "Manage the entire platform securely and efficiently.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80", // Dark tech workspace
    features: ["System configuration", "User management", "Security protocols"]
  },
  teacher: {
    title: "Teacher Workspace",
    subtitle: "Organize your classes, materials, and monitor growth.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80", // Moody bookshelves/library
    features: ["Class attendance", "Upload materials", "Student progress"]
  },
  student: {
    title: "Student Portal",
    subtitle: "Access all your learning resources in one place.",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80", // Open book/study focus
    features: ["Learning modules", "Grades & results", "Peer connection"]
  },
}

export default function PremiumLogin() {
  const navigate = useNavigate()
  const [role, setRole] = useState("admin")
  const [show, setShow] = useState(false)
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
      userType: "admin",
    },
  })

  const handleTabChange = (val) => {
    setRole(val)
    form.setValue("userType", val)
  }

  const onSubmit = (data) => {
    console.log("LOGIN DATA:", data);
    console.log(Usersdata)
    const user = Usersdata.find((u) => u.username === data.userName && u.password === data.password && u.userType === data.userType);
    console.log(user)
    if (!user) {
      alert("Invalid credentials");
      return;
    }

    console.log("LOGGED USER:", user);

    SetStorage(import.meta.env.VITE_USER_TYPE, EncryptText(user.userType));
    SetStorage(import.meta.env.VITE_ROLE, EncryptText(user.role));
    SetStorage(import.meta.env.VITE_SUBROLE, EncryptText(user.subRole));

    if (user.userType === "admin") {
      navigate('./outlet')
    } else if (user.userType === "teacher") {
      navigate('./outlet/teacher-outlet');
    } else {
      navigate('./student');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
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

        <motion.div
          key={role}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 hidden lg:block"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            General College
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800">
            {roleData[role].title}
          </h2>

          <p className="text-gray-700 text-lg">
            {roleData[role].subtitle}
          </p>

          <div className="space-y-2 text-gray-600">
            {role === "admin" && (
              <>
                <p>✔ Manage users & system</p>
                <p>✔ Control access & permissions</p>
                <p>✔ Monitor full platform</p>
              </>
            )}

            {role === "teacher" && (
              <>
                <p>✔ Manage classes & attendance</p>
                <p>✔ Upload study materials</p>
                <p>✔ Track student progress</p>
              </>
            )}

            {role === "student" && (
              <>
                <p>✔ Access learning resources</p>
                <p>✔ View results & attendance</p>
                <p>✔ Stay connected with teachers</p>
              </>
            )}
          </div>
        </motion.div>

        {/* 🔥 RIGHT LOGIN CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="
          w-full max-w-md ml-auto
          rounded-2xl p-8
          bg-white/40 backdrop-blur-xl
          border border-white/30
          shadow-xl
          text-gray-900
        "
        >
          {/* 🔥 CARD HEADER */}
          <div className="text-center mb-6 space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                GC
              </div>
            </div>

            <h2 className="text-2xl font-semibold">
              General College
            </h2>

            <p className="text-gray-600 text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={role} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 h-14 p-1 rounded-xl bg-white/60 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="
                    flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm font-medium
                    text-gray-600 hover:text-black
                    data-[state=active]:!bg-primary
                    data-[state=active]:!text-white
                  "
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>

          {/* FORM */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6 text-xl">

              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-800">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter username"
                        className="bg-white/70 border-gray-300"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-800">Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          {...field}
                          type={show ? "text" : "password"}
                          placeholder="********"
                          className="pr-10 bg-white/70 border-gray-300"
                        />
                      </FormControl>

                      <span
                        onClick={() => setShow(!show)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
                      >
                        {show ? <EyeOff size={16} /> : <Eye size={16} />}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="default"
                className="w-full font-semibold text-base h-11 rounded-lg shadow-md"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </motion.div>

      </div>
    </div>
  )

}