import { FaTools } from 'react-icons/fa'
const AppLoader = ({ background }) => {
  return (
    <div
      className={`fixed top-0 min-h-screen min-w-full z-50 flex items-center flex-col justify-center gap-3 ${
        background ? background : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      {/* Animated Icon */}
      <div className="animate-bounce">
        <FaTools className="text-4xl text-primary animate-pulse" />
      </div>

      {/* Optional subtle shake */}
      <div className="animate-[wiggle_1s_ease-in-out_infinite]">
        <span className="text-sm text-gray-500 dark:text-gray-300">
          Please wait...
        </span>
      </div>

      {/* Main text */}
      <h4 className="text-center text-primary font-semibold">
        Loading your experience 🚀
      </h4>
    </div>
  )
}

export default AppLoader