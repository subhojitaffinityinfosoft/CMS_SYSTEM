import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const CollegeCardLoader = ({ className = "" }) => {
  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 ${className}`}>
      <Card className="relative w-[360px] bg-slate-900/80 border border-indigo-500/20 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.25)] rounded-2xl overflow-hidden">
        <CardContent className="p-8 space-y-6">

          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold text-indigo-400">
              College Management System
            </h2>
            <p className="text-xs tracking-widest uppercase text-slate-400">
              Generating To You
            </p>
          </div>

          {/* Payslip Cards */}
          <div className="relative h-32 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-40 h-24 rounded-lg bg-slate-800 border border-indigo-500/20 shadow-md"
                style={{ top: i * 6 }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              >
                <div className="p-2 space-y-1">
                  <div className="h-2 w-16 bg-indigo-400/60 rounded" />
                  <div className="h-2 w-24 bg-slate-600 rounded" />
                  <div className="h-2 w-20 bg-slate-600 rounded" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Text */}
          <motion.div
            className="text-center text-sm tracking-widest text-indigo-400"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            PROCESSING DATA
          </motion.div>

        </CardContent>
      </Card>
    </div>
  )
}

export default CollegeCardLoader