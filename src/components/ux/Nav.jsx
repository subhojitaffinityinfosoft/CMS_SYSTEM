import { useContext, useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings, Moon, Sun, Computer, Menu, LogOut, MoreHorizontal, UploadCloudIcon, Trash2, LockKeyhole, Lock } from 'lucide-react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import Logo from '../../assets/logo.png';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { NavMenus } from '@/model/NavMenu';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { DcryptText, getStorageData, removeItemFromStorage } from '@/lib/Storage';
import StorageContext from '@/context/storage/StorageContext';
import { useAccount } from '@/context/account/AccountCOntextProvider'
import { EMPLOYEE, FILE_UPLOAD, ROLE_WISE_MENU_ACCESS, SESSION, USERMASTER, SALARY_PROCESS, USERWISEUNITMASTER } from '@/model/Api'
import CallApi from '@/services/dbIntr'
import { getInitials } from '@/lib/utils'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import uuid4 from 'uuid4'
import { useFinancialYear } from '@/context/financialYear/FinancialYearCOntextProvider'
import { useAppMenu } from '@/context/applicationMenu/ApplicationMenuContextProvider'
import ApplicationMenuContext from '@/context/applicationMenu/ApplicationMenuContext'
import { useSalaryProcess } from '@/context/salaryprocess/salaryProcessContextProvider'

const FormSchema = z.object({
    sessionName: z.string().optional()
})
const NavUx = () => {
    const { theme, setTheme } = useTheme();
    const { salaryProcessDtls, setSalaryProcessDtls } = useSalaryProcess()
    const [salary_process, setSalary_process_after_submit] = useState([]);
    const [overallProgress, setOverallProgress] = useState(0);
    const { setAppMenus, setRawMenus } = useAppMenu(ApplicationMenuContext);
    const { finYearDtls, setFinancialYear, setFinancialYearDtls } = useFinancialYear();
    const location = useLocation();
    const navigate = useNavigate();
    const { acc_dtls, setAccDtls } = useAccount();
    const [mdSession, setSession] = useState([]);
      const [md_unit, setUnit] = useState([]);
    const { setAuthenticatedKey } = useContext(StorageContext);
    const [role_id, setRoleId] = useState(DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID)));
    const [type, setType] = useState(DcryptText(getStorageData(import.meta.env.VITE_USER_TYPE)));
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sessionName: ''
        }
    })
    useEffect(() => {
        const CallFnOnLoadPage = async () => {
            if (type == import.meta.env.VITE_LOGIN_TYPE) {
                fetchUserByEmployeeId();
            }
            else {
                fetchUserByUserId()
            }
            getSession();
        }
        CallFnOnLoadPage();
        fetchRoleWiseMenuAccess();
    }, [])
    useEffect(() => {
        uploadAllUnitsSequentially();
    }, [salaryProcessDtls])
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // Simulated API call
    const uploadSalary = async (data) => {
        try {
            const payLoad = {
                ...data,
                sessionId: data.sessionId ? data.sessionId : (finYearDtls ? finYearDtls?.sessionId : 0)
            }
            const response = await CallApi(1, SALARY_PROCESS.modify, payLoad, null, null, true);
            if (response?.request?.status == 200) {
                if (response?.data?.isValid) {
                    return { success: true, ...payLoad };
                }
            }
            return { success: false, ...payLoad };
        } catch (error) {

            return { success: false, ...payLoad };
        }
    };

    const uploadUnitSequentially = async (unit, delayMs = 500) => {
        setSalaryProcessDtls((prev) =>
            prev.map((u) =>
                u.id === unit.id ? { ...u, status: "uploading", progress: 0 } : u
            )
        );

        const total = unit.data_to_upload.length;
        let uploaded = 0;
        let errCount = unit?.error;
        let successCount = unit?.success;
        for (const data of unit.data_to_upload) {
            const res = await uploadSalary(data); // ✅ waits for each upload
            uploaded++;
            const progress = Math.round((uploaded / total) * 100);
            // console.log(res)
            errCount = res?.success ? errCount : errCount + 1;
            successCount = res?.success ? (successCount + 1) : successCount;

            setSalaryProcessDtls((prev) =>
                prev.map((u) =>
                    u.id === unit.id ? { ...u, progress, current_update_row: data?.name, error: errCount, success: successCount } : u
                )
            );
            await sleep(delayMs);
        }

        setSalaryProcessDtls((prev) =>
            prev.map((u) =>
                u.id === unit.id ? { ...u, status: "completed", progress: 100 } : u
            )
        );
    };

    // Upload all units sequentially
    const uploadAllUnitsSequentially = async () => {
        // console.log("🚀 Starting sequential upload...");
        for (const unit of salaryProcessDtls) {
            if (unit.status === "pending") {
                await uploadUnitSequentially(unit); // waits for full unit
            }
        }
    };

    const fetchRoleWiseMenuAccess = async () => {
        try {
            const dcryptedRoleId = await DcryptText(getStorageData(import.meta.env.VITE_ROLE_ID));
            const res = await CallApi(0, `${ROLE_WISE_MENU_ACCESS.custom_get_by_role_id}/${dcryptedRoleId}`, null);
            if (res?.data?.isValid && res?.status == 200) {
                setRawMenus(res?.data?.list)
                const dt = buildMenu(res?.data?.list, 0);
                setAppMenus(dt);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const buildMenu = (menuData, parentId = 0) => {
        return menuData
            .filter(item => item.parentMenuId === parentId)
            .map(item => {
                const children = buildMenu(menuData, item.menuId);
                return {
                    ...item,
                    id: item.menuId,
                    name: item.menuName,
                    icon: item.menuIcon,
                    children: children
                };
            });
    }


    const getSession = async () => {
        const session = await CallApi(0, SESSION.getAll, null);
        if (session?.request?.status == 200) {
            if (session?.data.isValid) {
                setSession(session?.data.list);
            }
        }
    }

    useEffect(() => {
        if (mdSession.length > 0) {
            const curSession = mdSession.find(el => el.isCurrentSession);
            if (curSession) {
                setFinancialYear(curSession?.sessionName);
                setFinancialYearDtls(curSession);
                form.setValue('sessionName', curSession?.sessionName)
            }
        }
    }, [mdSession])

    const fetchUserByEmployeeId = async () => {
        const employeeId = DcryptText(getStorageData(import.meta.env.VITE_EMPLOYEE_ID));
        const response = await CallApi(0, `${EMPLOYEE.getalldatabyId}/${employeeId}`);
        if (response?.request?.status == 200) {
            if (response?.data.isValid) {
                if (response?.data?.data?.photoName) {
                    getProfileImage(response?.data?.data)
                }
                else {
                    setAccDtls({
                        ...response?.data?.data,
                        initialName: response?.data?.data?.name ? getInitials(response?.data?.data?.name) : ''
                    });
                }

            }
        }
    }

    const fetchUserByUserId = async () => {
        const uId = DcryptText(getStorageData(import.meta.env.VITE_USER_ID));
        const res = await CallApi(0, `${USERMASTER.getById}/${uId}`, null);
        if (res?.request?.status == 200) {
            if (res?.data?.isValid) {
                setAccDtls({
                    ...res?.data?.data,
                    initialName: res?.data?.data?.userName ? getInitials(res?.data?.data?.userName) : '',
                    name: res?.data?.data?.userName ? res?.data?.data?.userName : '',
                    photoName: ''
                });
                const response = await CallApi(
                    0,
                    `${USERWISEUNITMASTER.getalldetailsbyuserid}/${uId}`,
                    null
                );
                if (response?.request.status == 200) {
                    if (response.data.isValid) {
                        setUnit(response.data.list);
                    }
                }
            }
        }
    }

    const getProfileImage = async (res) => {
        // const avatar_res = await CallApi(0,`${FILE_UPLOAD.download}/${res?.photoName}`,null);
        // if(avatar_res?.data.isValid){
        //         setAccDtls({
        //             ...res,
        //             initialName: res?.name ? getInitials(res.name) : '',
        //             photoName:`data:${avatar_res?.data?.data?.contentType};base64,${avatar_res?.data?.data?.base64String}`,
        //         });
        // }
        // else{
        //     setAccDtls({
        //         ...res,
        //         initialName: res?.name ? getInitials(res.name) : ''
        //     });
        // }

        setAccDtls({
            ...res,
            initialName: res?.name ? getInitials(res.name) : '',
            photoName: ``,
        });

    }

    return (
        <div className='z-40 min-h-16 min-w-full  bg-background shadow-sm top-0 dark:shadow-lg 
        fixed'>
            <div className='justify-between px-5  flex items-center min-h-16 min-w-screen border-b border-b-muted'>
                <div className='flex items-center justify-between space-x-2'>

                    <Sheet>
                        <SheetTrigger>
                            {/* <Button variant="ghost" size="icon" className="rounded-full visible md:hidden"> */}
                            <Menu className="h-[1.2rem] w-[1.2rem] text-muted-foreground  transition-all visible  md:hidden" />
                            {/* </Button> */}
                        </SheetTrigger>
                        <SheetContent side={'left'}
                            className="h-screen overflow-auto p-0 min-w-[320px]"

                            hideClose>
                            <SheetHeader className={'px-5 pt-6'}>
                                <SheetTitle className="text-md text-primary font-PoppinsRegular">Welcome Back</SheetTitle>
                                <SheetDescription className="text-xs font-normal">
                                    Here’s what’s going on at your business right now
                                </SheetDescription>
                            </SheetHeader>
                            <Separator className="my-5" />
                            <div className='h-full relative'>
                                <div className='w-full mt-4 p-3  flex flex-col gap-1'>
                                    {
                                        NavMenus.filter(el => el.access_by.indexOf(Number(role_id)) !== -1).map((el, index) => {
                                            return (el.submenu.length === 0 ? <NavLink key={`parent_menu_${index}`}
                                                to={el['router-link']}
                                                onClick={() => {
                                                    if (el.id == 5) {
                                                        removeItemFromStorage(import.meta.env.VITE_AU_TK);
                                                        removeItemFromStorage(import.meta.env.VITE_COMP_NAME);
                                                        setAuthenticatedKey(null)
                                                        removeItemFromStorage(import.meta.env.VITE_ROLE_ID);
                                                        removeItemFromStorage(import.meta.env.VITE_USER_ID);
                                                    }
                                                }}
                                            >
                                                <SheetClose asChild>

                                                    <Button className={`w-full space-x-3 justify-start text-xs font-PoppinsMedium ${location.pathname === el['router-link'] ? 'bg-primary hover:bg-primary text-card-foreground' : ''}`}
                                                        variant={location.pathname === el['router-link'] ? "secondary" : "ghost "} >
                                                        {el.icon}
                                                        <span className='text-card-foreground'>{el.menu}</span>
                                                    </Button>
                                                </SheetClose>

                                            </NavLink> : <Accordion type="single" collapsible key={`collapsible_${el.id}`}>
                                                <AccordionItem value="item-1" className='border-b-0'>
                                                    <AccordionTrigger className={`
                                                        inline-flex items-center whitespace-nowrap 
                                                        rounded-md font-PoppinsMedium ring-offset-background 
                                                        transition-colors focus-visible:outline-none focus-visible:ring-2 
                                                        focus-visible:ring-ring focus-visible:ring-offset-2 
                                                        disabled:pointer-evexnts-none disabled:opacity-50 hover:bg-accent 
                                                        hover:text-accent-foreground h-10 px-4 py-2 w-full space-x-2 justify-between 
                                                        data-[state=open]:bg-transparent
                                                        data-[state=closed]:bg-transparent
                                                        hover:no-underline
                                                        `}>
                                                        <div className={`
                                                                flex items-center justify-between text-[12px] space-x-3`}>
                                                            {el.icon}
                                                            <span className='text-card-foreground'>
                                                                {el.menu}
                                                            </span>
                                                        </div>

                                                    </AccordionTrigger>
                                                    <AccordionContent className="px-1">
                                                        {
                                                            el.submenu.map((element, index) => {

                                                                return (
                                                                    <NavLink key={`accordian_${element.id}_${index}`}
                                                                        to={element['router-link']}>
                                                                        <SheetClose asChild >
                                                                            <Button
                                                                                variant={location.pathname === element['router-link'] ? "destructive" : "ghost"}
                                                                                className="w-full space-x-3 justify-start font-PoppinsLight">
                                                                                {element.icon}
                                                                                <span className="text-[11px] font-PoppinsMedium text-card-foreground">{element.menu}</span>
                                                                            </Button>
                                                                        </SheetClose>
                                                                    </NavLink>

                                                                )
                                                            })
                                                        }
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                            )
                                        })
                                    }

                                </div>
                                {/* <div className='fixed min-w-[380px]  bottom-0 px-1  left-0 bg-white'>
                                        <Button variant="ghost" className="w-full justify-between flex flex-row">
                                            <div className='flex flex-row justify-start items-center'>
                                                <Avatar className="h-7 w-7 mr-2">
                                                <AvatarImage src="https://github.com/shadcn.png"/>
                                                <AvatarFallback >SM</AvatarFallback>
                                                </Avatar>
    
                                                {getStorageData(import.meta.env.VITE_COMP_NAME)  ? getStorageData(import.meta.env.VITE_COMP_NAME) : 'N/A'} 

                                            </div>

                                                <MoreHorizontal size={15}/>
                                        </Button>
                            </div> */}
                            </div>
                        </SheetContent>
                    </Sheet>
                    <img src={Logo} height={40} width={40} />
                    <div className=' items-start flex-col justify-center  hidden md:flex'>
                        <span className='text-[16px] font-PoppinsMedium  text-primary'>
                            Welcome, {md_unit.length === 1 ? md_unit[0]?.unitName ?? 'N/A' : getStorageData(import.meta.env.VITE_COMP_NAME)}
                        </span>
                        <span className='text-xs font-PoppinsLight  text-foreground'>
                            {new Date().toLocaleTimeString()}
                        </span>
                    </div>

                </div>
                <div className='md:flex items-center space-x-3 hidden'>
                    {/* Financial Year Selection */}
                    {type != import.meta.env.VITE_LOGIN_TYPE && <Form {...form}>
                        <form className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="sessionName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Financial Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    mdSession.map(el => <SelectItem key={uuid4()} value={el.sessionName}>{el.sessionName}</SelectItem>)
                                                }

                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>}
                    {/* END */}
                    <Button variant="ghost" size="icon" className="rounded-full  text-primary hover:text-primary">
                        <Settings className="h-[1.2rem] w-[1.2rem]  transition-all" />
                        <span className="sr-only">Toggle theme</span>

                    </Button>
                    {/* <Button variant="ghost" size="icon" className="rounded-full text-primary hover:text-primary">
                        <Bell className="h-[1.2rem] w-[1.2rem] transition-all" />
                        <span className="sr-only">Toggle theme</span>
                    </Button> */}
                    {salaryProcessDtls.length > 0 && <Sheet className="w-1/2">
                        <SheetTrigger>
                            {/* <Bell className="h-[1.2rem] w-[1.2rem] transition-all" /> */}
                            <div className="relative inline-block">
                                {/* Upload icon */}
                                <UploadCloudIcon className="h-6 w-6 text-primary animate-bounce" />

                                {/* Badge */}
                                {salaryProcessDtls.length > 0 && (
                                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full animate-pulse">
                                        {salaryProcessDtls.length}
                                    </span>
                                )}
                            </div>
                        </SheetTrigger>
                        <SheetContent>

                            <div style={{ marginBottom: 20 }}>
                                <div
                                    style={{
                                        background: "#eee",
                                        borderRadius: 5,
                                        overflow: "hidden",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${overallProgress}%`,
                                            height: "100%",
                                            background: "#673ab7",
                                            transition: "width 0.3s ease",
                                        }}
                                    />
                                </div>
                                <p>Salary Process Overview</p>
                                <p className='text-xs'>Note: Please do not refresh your browser, Salary is in under process</p>
                            </div>
                            {salaryProcessDtls.map((unit) => (
                                <div
                                    key={unit.id}
                                    style={{
                                        border: "1px solid #ccc",
                                        borderRadius: 8,
                                        padding: 15,
                                        marginBottom: 15,
                                    }}
                                    className='space-y-2'
                                >
                                    <div className='space-y-0'>
                                        <div className='flex items-center justify-between'>
                                            <h4 className='text-md font-PoppinsSemiBold'>{unit?.data_to_upload[0]?.unitName}</h4>
                                            <p className='text-xs font-PoppinsMedium text-right'>
                                                {unit.progress}% {unit.status == 'completed' && <>— <b>{unit.status}</b></>}
                                            </p>
                                        </div>
                                        {(unit?.current_update_row && unit.status != 'completed') && <h4 className='text-xs font-PoppinsBold'>Employee : {unit?.current_update_row}</h4>}
                                    </div>
                                    {unit?.status != 'completed' ? <div
                                        style={{
                                            height: 2,
                                            background: "#eee",
                                            borderRadius: 5,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: `${unit.progress}%`,
                                                height: "100%",
                                                background:
                                                    unit.status === "completed"
                                                        ? "#4caf50"
                                                        : unit.status === "uploading"
                                                            ? "hsl(var(--primary))"
                                                            : "#bbb",
                                                transition: "width 0.3s ease",
                                            }}
                                        />
                                    </div> : <div className='flex justify-between items-center'>
                                        <div className='flex justify-start items-center space-x-5'>
                                            <a className='flex justify-start items-center text-xs font-PoppinsMedium  text-destructive underline'>
                                                <p>Error: </p>
                                                <p>{unit.error || 0}</p>
                                            </a>
                                            <div className='flex justify-start items-center text-xs font-PoppinsMedium text-green-700'>
                                                <p>Success: </p>
                                                <p>{unit.success || 0}</p>
                                            </div>
                                        </div>
                                        <Button onClick={() => {
                                            const dt = salaryProcessDtls.filter(el => el.id != unit.id);
                                            setSalaryProcessDtls(dt)

                                        }} size="icon" variant="text" className="text-destructive h-9 w-9">
                                            <Trash2 size={12} />
                                        </Button>
                                    </div>
                                    }

                                </div>
                            ))}

                        </SheetContent>
                    </Sheet>}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full text-primary hover:text-primary">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setTheme("light")} className="space-x-2">
                                <Sun size={15} />
                                <span >Light</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="space-x-2">
                                <Moon size={15} />
                                <span>Dark</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="space-x-2">
                                <Computer size={15} />
                                <span>System</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="">
                                <AvatarImage src={acc_dtls && acc_dtls?.photoName} alt="@shadcn" />
                                <AvatarFallback className="  rounded-md bg-destructive text-white">
                                    <span >{acc_dtls ? acc_dtls.initialName : ''}</span>
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuItem onClick={() => navigate('/outlet/change-password')} className="space-x-2">
                                <Lock size={15} />
                                <span>Change Password</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className='md:hidden flex space-x-2'>
                    {/* Financial Year Selection */}
                    {type != import.meta.env.VITE_LOGIN_TYPE && <Form {...form}>
                        <form className="w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="sessionName"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Financial Year" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    mdSession.map(el => <SelectItem key={uuid4()} value={el.sessionName}>{el.sessionName}</SelectItem>)
                                                }

                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>}
                    {/* END */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="rounded-full">
                                <AvatarImage src={acc_dtls && acc_dtls?.photoName} className="object-contain" alt="@shadcn" />
                                <AvatarFallback className="  rounded-md bg-destructive">
                                    <span >{type != import.meta.env.VITE_USER_TYPE ? 'A' : acc_dtls ? acc_dtls.initialName : ''}</span>
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                    {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notifications</span>
                                    {/* <DropdownMenuShortcut>⌘N</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    navigate('/outlet/change-password')
                                }}>
                                    <LockKeyhole className="mr-2 h-4 w-4" />
                                    <span>Change Password</span>
                                    {/* <DropdownMenuShortcut>⌘N</DropdownMenuShortcut> */}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        {
                                            theme == 'light' && <Sun className="mr-2 h-4 w-4" />
                                        }
                                        {
                                            theme == 'dark' && <Moon className="mr-2 h-4 w-4" />
                                        }
                                        {
                                            theme == 'system' && <Computer className="mr-2 h-4 w-4" />
                                        }
                                        <span>Theme</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuLabel>Theme</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => setTheme("light")} className="space-x-2">
                                                <Sun className="mr-2 h-4 w-4" />
                                                <span >Light</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTheme("dark")} className="space-x-2">
                                                <Moon className="mr-2 h-4 w-4" />
                                                <span>Dark</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setTheme("system")} className="space-x-2">
                                                <Computer className="mr-2 h-4 w-4" />
                                                <span>System</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => {
                                setAuthenticatedKey(null)
                                removeItemFromStorage(import.meta.env.VITE_AU_TK)
                                navigate('/');
                            }
                            }>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

        </div>
    )
}

export default NavUx
