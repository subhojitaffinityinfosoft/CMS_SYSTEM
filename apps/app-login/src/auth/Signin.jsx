import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, GraduationCap, User, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Usersdata } from './UserMaster'
import { EncryptText, SetStorage } from '@/lib/Storage'
import FormComponent from "@/components/ux/FormComponent"
import { UnitMultiSelect, SeasonSelector, Button } from "shared-ui"

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
  const [loginError, setLoginError] = useState(null)
  
  // Step tracking for 2-step login
  const [step, setStep] = useState(1)
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  // Local state for unit and season selections (since MFE contexts don't share perfectly)
  const [selectedUnits, setSelectedUnits] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(null)

  // 1. Define your dynamic form fields array
  const loginFormConfig = [
    {
      acceseriesKey: "username",
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
    if (step === 2) return // prevent tab change in step 2
    setRole(val)
    setLoginError(null)
  }

  // 2. Handle initial credentials submission (Step 1)
  const onSubmit = (formData) => {
    // Merge selected tab role with inputs
    const data = { ...formData, userType: role }

    const user = Usersdata.find(
      (u) => u.username === data.username && u.password === data.password && u.userType === data.userType
    )

    if (!user) {
      setLoginError("Invalid credentials. Please check your username and password.")
      return
    }

    setLoginError(null)

    // Store encrypted user session data
    SetStorage(import.meta.env.VITE_USER_TYPE, EncryptText(user.userType))
    SetStorage(import.meta.env.VITE_ROLE, EncryptText(user.role))
    SetStorage(import.meta.env.VITE_SUBROLE, EncryptText(user.subRole))

    setAuthenticatedUser(user)
    setStep(2) // Move to Unit & Season selection
  }

  // Configuration for Step 2 Form
  const step2FormConfig = [
    {
      acceseriesKey: "selectedUnits",
      label: "Select Unit(s)",
      type: "custom",
      render: ({ value, onChange }) => <UnitMultiSelect selectedUnits={value || []} onChange={onChange} />,
      validation: z.array(z.any()).min(1, "*Select at least one Unit"),
    },
    {
      acceseriesKey: "selectedSeason",
      label: "Select Season",
      type: "custom",
      render: ({ value, onChange }) => <SeasonSelector selectedSeason={value || null} onChange={onChange} />,
      validation: z.any().refine((val) => val !== null && val !== undefined, "*Season is required"),
    }
  ]

  // 3. Handle final submission (Step 2)
  const handleFinalSubmit = (formData) => {
    const { selectedUnits, selectedSeason } = formData;

    setLoginError(null)

    // Save selections to localStorage so the app-shell contexts can pick them up upon reload
    localStorage.setItem('selectedUnits', JSON.stringify(selectedUnits))
    localStorage.setItem('selectedSeason', JSON.stringify(selectedSeason))

    // Use window.location.href to force a full reload so MFE contexts initialize properly
    if (authenticatedUser.userType === "admin") {
      window.location.href = "/app/dashboard"
    } else if (authenticatedUser.userType === "teacher") {
      window.location.href = "/app/teacher/dashboard"
    } else {
      window.location.href = "/app/student/dashboard"
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
          className="w-full max-w-md ml-auto rounded-2xl p-8 bg-white/40 backdrop-blur-xl border border-white/30 shadow-xl text-gray-900 overflow-hidden"
        >
          {/* CARD HEADER */}
          <div className="text-center mb-6 space-y-2">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                GC
              </div>
            </div>
            <h2 className="text-2xl font-semibold">General College</h2>
            <p className="text-gray-600 text-sm">
              {step === 1 ? "Sign in to your account" : "Complete your session setup"}
            </p>
          </div>

          {/* ROLE SELECTOR TABS */}
          <Tabs value={role} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="grid grid-cols-3 h-14 p-1 rounded-xl bg-white/60 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    disabled={step === 2}
                    className="flex items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-600 hover:text-black data-[state=active]:!bg-primary data-[state=active]:!text-white disabled:opacity-50"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* 🔥 DYNAMIC FORM COMPONENT */}
                <FormComponent
                  formField={loginFormConfig}
                  onSubmit={onSubmit}
                  submitBtnText="Sign In"
                />
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white/60 p-4 rounded-xl border border-white/40 mb-4">
                  <FormComponent
                    formField={step2FormConfig}
                    onSubmit={handleFinalSubmit}
                    submitBtnText="Proceed to Dashboard"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setStep(1)
                      setLoginError(null)
                    }} 
                    className="w-full text-gray-600"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="flex items-center gap-2 mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
