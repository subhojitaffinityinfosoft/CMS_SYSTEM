import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield, GraduationCap, User, AlertCircle,
  ArrowLeft, Building2, CalendarRange, CheckCircle2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Usersdata } from './UserMaster'
import { EncryptText, SetStorage } from '@/lib/Storage'
import FormComponent from "@/components/ux/FormComponent"
import { UnitMultiSelect, SeasonSelector, Button } from "shared-ui"
import { z as zod } from "zod"

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
    placeholder: "••••••••",
    type: "password",
    validation: z.string().min(1, "*Password is required"),
  },
]

export default function PremiumLogin() {
  const navigate = useNavigate()
  const [role, setRole] = useState("admin")
  const [loginError, setLoginError] = useState(null)
  const [step, setStep] = useState(1)
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  // Step 2 local state (not via FormComponent — gives us full layout control)
  const [selectedUnits, setSelectedUnits] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [step2Error, setStep2Error] = useState(null)

  const handleTabChange = (val) => {
    if (step === 2) return
    setRole(val)
    setLoginError(null)
  }

  const onSubmit = (formData) => {
    const data = { ...formData, userType: role }
    const user = Usersdata.find(
      (u) => u.username === data.username && u.password === data.password && u.userType === data.userType
    )
    if (!user) {
      setLoginError("Invalid credentials. Please check your username and password.")
      return
    }
    setLoginError(null)
    SetStorage(import.meta.env.VITE_USER_TYPE, EncryptText(user.userType))
    SetStorage(import.meta.env.VITE_ROLE, EncryptText(user.role))
    SetStorage(import.meta.env.VITE_SUBROLE, EncryptText(user.subRole))
    setAuthenticatedUser(user)
    setStep(2)
  }

  const handleFinalSubmit = () => {
    if (!selectedUnits || selectedUnits.length === 0) {
      setStep2Error("Please select at least one unit.")
      return
    }
    if (!selectedSeason) {
      setStep2Error("Please select a season.")
      return
    }
    setStep2Error(null)
    localStorage.setItem('selectedUnits', JSON.stringify(selectedUnits))
    localStorage.setItem('selectedSeason', JSON.stringify(selectedSeason))

    if (authenticatedUser.userType === "admin") {
      window.location.href = "/admin/dashboard"
    } else if (authenticatedUser.userType === "teacher") {
      window.location.href = "/teacher/dashboard"
    } else {
      window.location.href = "/student/dashboard"
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
      <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/50 to-transparent backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center px-4 py-8">
        {/* LEFT — Role info */}
        <motion.div
          key={role}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6 hidden lg:block"
        >
          <h1 className="text-4xl font-bold text-gray-900">General College</h1>
          <h2 className="text-2xl font-semibold text-gray-800">{roleData[role].title}</h2>
          <p className="text-gray-600 text-lg">{roleData[role].subtitle}</p>
        </motion.div>

        {/* RIGHT — Login card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md ml-auto"
        >
          <div className="rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl overflow-visible p-8">
            {/* Header */}
            <div className="text-center mb-6 space-y-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  GC
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">General College</h2>
              <p className="text-gray-500 text-sm">
                {step === 1 ? "Sign in to your account" : "Set up your work session"}
              </p>
            </div>

            {/* Role Tabs */}
            <Tabs value={role} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="grid grid-cols-3 h-12 p-1 rounded-xl bg-gray-100/80 gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      disabled={step === 2}
                      className="flex items-center justify-center gap-1.5 rounded-lg text-sm font-medium text-gray-500 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md disabled:opacity-40 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>

            <AnimatePresence mode="wait">
              {/* ── STEP 1: Credentials ── */}
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <FormComponent
                    formField={loginFormConfig}
                    onSubmit={onSubmit}
                    submitBtnText="Sign In →"
                  />
                </motion.div>
              ) : (
                /* ── STEP 2: Unit & Season ── */
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  {/* Greeting */}
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Logged in as <span className="text-primary capitalize">{authenticatedUser?.userType}</span>
                      </p>
                      <p className="text-xs text-gray-500">Now select your work context below</p>
                    </div>
                  </div>

                  {/* Unit Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Building2 className="w-4 h-4 text-primary" />
                      Select Unit(s)
                    </label>
                    <div className="w-full">
                      <UnitMultiSelect
                        selectedUnits={selectedUnits}
                        onChange={setSelectedUnits}
                        fullWidth
                      />
                    </div>
                    {selectedUnits.length > 0 && (
                      <p className="text-xs text-green-600 font-medium pl-1">
                        ✓ {selectedUnits.length} unit{selectedUnits.length > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>

                  {/* Season Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <CalendarRange className="w-4 h-4 text-primary" />
                      Select Season
                    </label>
                    <div className="w-full">
                      <SeasonSelector
                        selectedSeason={selectedSeason}
                        onChange={setSelectedSeason}
                        fullWidth
                      />
                    </div>
                    {selectedSeason && (
                      <p className="text-xs text-green-600 font-medium pl-1">
                        ✓ {selectedSeason.name} selected
                      </p>
                    )}
                  </div>

                  {/* Step 2 error */}
                  {step2Error && (
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{step2Error}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-1">
                    <Button
                      type="button"
                      className="w-full h-11 font-semibold text-base shadow-md"
                      onClick={handleFinalSubmit}
                    >
                      Proceed to Dashboard →
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => { setStep(1); setLoginError(null); setStep2Error(null) }}
                      className="w-full text-gray-500 hover:text-gray-800"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Global error */}
            <AnimatePresence>
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="flex items-center gap-2 mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
