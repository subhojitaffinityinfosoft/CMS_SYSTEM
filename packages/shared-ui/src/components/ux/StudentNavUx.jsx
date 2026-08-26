import { useState } from "react";
import { ChevronDown, Sun, Moon, LogOut, Lock } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
const StudentNav = () => {
    const { theme, setTheme } = useTheme();
    const [sessionOpen, setSessionOpen] = useState(false);
const navigate = useNavigate()
    const sessions = ["2022-23", "2023-24", "2024-25"];
    const currentSession = "2024-25";
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">

            <div className="max-w-screen mx-auto flex items-center justify-between h-14 px-14">

                {/* ================= LEFT SIDE ================= */}
                <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center text-white font-bold">
                        CLG
                    </div>

                    <div className="leading-tight">
                        <h1 className="text-sm font-semibold text-primary">
                            ABC College
                        </h1>
                        <p className="text-[11px] text-muted-foreground">
                            Student Portal
                        </p>
                    </div>

                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="flex items-center gap-4">

                    {/* SESSION */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-1 px-3 py-1.5 text-xs border rounded-full hover:bg-muted transition">
                                {currentSession}
                                <ChevronDown size={14} />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-36">
                            {sessions.map((s) => (
                                <DropdownMenuItem key={s} className="text-xs cursor-pointer">
                                    {s}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="relative flex items-center justify-center p-2 rounded-full hover:bg-muted transition"
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 transition-all" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
                    </button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="cursor-pointer w-8 h-8">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-primary text-white text-xs">
                                    SP
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-44">

                            <div className="px-3 py-2">
                                <p className="text-sm font-medium">Subhojit Paul</p>
                                <p className="text-xs text-muted-foreground">
                                    student@mail.com
                                </p>
                            </div>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Lock className="mr-2 h-4 w-4" />
                                Change Password
                            </DropdownMenuItem>

                            <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header>
    );
};

export default StudentNav;