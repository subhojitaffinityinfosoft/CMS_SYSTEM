import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import CallApi from '@/services/dbIntr'
import { EMPFLEXIBLEWORK, EMPLOYEE } from '@/model/Api'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form'
import { DatePicker } from '../ui/date-picker'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { cn } from '@/lib/utils'
import { DcryptText, getStorageData } from '@/lib/Storage'
import { LoadingOverlay, MantineProvider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useToast } from '../ui/use-toast'
import moment from 'moment'
const wfhSchema = z.object({
    empFlexibleWorkId: z.number().default(0),
    employeeId: z.number().default(0),
    applicationType: z.string().min(1, { message: 'Application type is required!!' }),
    fromDate: z.date({ message: 'Please provide from date', required_error: "Please provide from date" }),
    toDate: z.date({ message: 'Please provide to date', required_error: "Please provide to date" }),
    reason: z.string().min(1, { message: "Please provide reason" }),
    location: z.string().min(1, { message: "Please provide location" }),
    status: z.string().default('Pending'),
    notifyToEmployeeId: z.string().min(1, { message: 'Please provide reporting manager' }),
    isActive: z.boolean().default(true)
})

const WFHDialog = ({ isOpen, setOpen,acc_dtls }) => {
    const [md_applyFor, setApplyFor] = useState([]);
    const [md_managers, setManagers] = useState([]);
    const [open, setManagerOpen] = useState(false);
    const [visible, { toggle,open:openLoader,close }] = useDisclosure(false);
    const {toast} = useToast();
    const wfhform = useForm({
        resolver: zodResolver(wfhSchema),
        defaultValues: {
            empFlexibleWorkId: 0,
            employeeId: Number(DcryptText(getStorageData(import.meta.env.VITE_EMPLOYEE_ID))),
            applicationType: "",
            fromDate: new Date(),
            toDate: new Date(),
            reason: "",
            location: "",
            status: 'Pending',
            notifyToEmployeeId: "",
            isActive: true,
        },
        mode: 'all'
    })

    useEffect(() => {
        if(isOpen){
            if(md_applyFor.length == 0){
                fetchApplicationType();
            }
            checkwhetherManagerisPresentOrNot();
        }
        
        return () => {
            setApplyFor([]);
            setManagers([]);
            wfhform.reset({
                applicationType:'',
                fromDate:new Date(),
                toDate:new Date(),
                notifyToEmployeeId:'',
                employeeId: Number(DcryptText(getStorageData(import.meta.env.VITE_EMPLOYEE_ID))),
            });
        
        }
    }, [isOpen])

    const checkwhetherManagerisPresentOrNot = () =>{
        if(acc_dtls?.managerId){
                wfhform.setValue('notifyToEmployeeId',acc_dtls?.managerId?.toString());
        }
        else{
            if(md_managers.length == 0){
                fetchManagersByUnitId()
            }
        }
    }

    const fetchApplicationType = async () => {
        const res = await CallApi(0, EMPFLEXIBLEWORK.getempflexibleworktype, null);
        if (res?.request?.status == 200) {
            if (res?.data?.isValid) {
                setApplyFor(res?.data?.list)
            }
        }
    }

    const fetchManagersByUnitId = async () =>{
                const res = await CallApi(0,`${EMPLOYEE.getallbyunitid}/${acc_dtls?.unitId}`,null);
                if(res?.request?.status == 200){
                    if(res?.data?.isValid){
                        setManagers(res?.data?.list.filter(el => el.employeeId != acc_dtls?.employeeId))
                    }
                }
    }

    const onSubmit = async (payLoad) =>{
            openLoader();
            const formData = {
                ...payLoad,
                notifyToEmployeeId:Number(payLoad?.notifyToEmployeeId),
                employeeId: Number(DcryptText(getStorageData(import.meta.env.VITE_EMPLOYEE_ID))),
                toDate:moment(payLoad?.toDate).format('YYYY-MM-DD'),
                fromDate:moment(payLoad?.fromDate).format('YYYY-MM-DD'),
            }
            // console.log(formData)
            const res = await CallApi(1,EMPFLEXIBLEWORK.addorupdate,formData);
            if(res?.request?.status == 200){
                close();
                toast({
                    title:res.data?.isValid ? 'Congrats!!' : 'Error!!',
                    description:res.data?.isValid ? 'Request has been applied successfully' : 'We are unable to process your request, Please try again later',
                    variant:res.data?.isValid ? 'success' : 'destructive'
                })
                if(res?.data?.isValid){
                    setOpen(false);
                }
            }
            else{
                console.log('404')
                close();
            }

    }

    return (

        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetContent className="h-screen  p-0">
                <SheetHeader className={'border-b py-2'}>
                    <SheetTitle className="uppercase p-2 text-xs  font-PoppinsLight">
                        Apply For Work From Home
                    </SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                </SheetHeader>
                <MantineProvider>
                    <LoadingOverlay className='text-xs font-PoppinsRegular' visible={visible} loaderProps={{ children: 'Applying , Please Wait...' }} />
                </MantineProvider>

                <div className='h-[calc(100vh_-_120.8px)] overflow-auto'>
                    <Form {...wfhform}>
                        <form onSubmit={wfhform.handleSubmit(onSubmit)} className='p-5' autoComplete='off' id="wfhForm">
                            <div className='grid grid-cols-12 gap-3'>
                                <div className='col-span-12'>
                                    <FormField
                                        control={wfhform.control}
                                        name="applicationType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>APPLY FOR <span className='text-destructive'>*</span></FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value?.toString()} defaultValue={field.value?.toString()}>
                                                    <FormControl>
                                                        <SelectTrigger className="px-2">
                                                            <SelectValue placeholder="Select Apply For" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="min-w-[364px]">
                                                        {
                                                            md_applyFor.map(el => {
                                                                return (<SelectItem key={el.value} value={el.value.toString()}>{el.text}</SelectItem>)
                                                            })
                                                        }
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-6">
                                    <FormField
                                        control={wfhform?.control}
                                        name="fromDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>FROM DATE <span className='text-destructive'> * </span></FormLabel>
                                                <FormControl>

                                                    <DatePicker
                                                        formValue={field.value}
                                                        className="w-full"
                                                        disabledFromDate={new Date()}
                                                        handleChange={(e) => {
                                                            wfhform.setValue('fromDate', e)
                                                            wfhform.setValue('toDate', e)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="col-span-6">
                                    <FormField
                                        control={wfhform?.control}
                                        name="toDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>TO DATE <span className='text-destructive'> * </span></FormLabel>
                                                <FormControl>

                                                    <DatePicker
                                                        formValue={field.value}
                                                        className="w-full"
                                                        disabledFromDate={wfhform.watch('fromDate') || new Date()}
                                                        handleChange={(e) => {
                                                            wfhform.setValue('toDate', e)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='col-span-12'>
                                        <FormField
                                        control={wfhform?.control}
                                        name="reason"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>REASON <span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                            <Textarea placeholder="Type here.."  onChange={field.onChange} className="rounded-sm"/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />   
                                </div>
                                <div className='col-span-12'>
                                        <FormField
                                        control={wfhform?.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>LOCATION<span className="text-destructive">*</span></FormLabel>
                                            <FormControl>
                                            <Input placeholder="Enter Location"  onChange={field.onChange} className="rounded-sm"/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        />   
                                </div>
                                <div className='md:col-span-12 col-span-12 space-y-2'>
                                
                                    {!acc_dtls?.managerId ? <FormField
                                        control={wfhform.control}
                                        name="notifyToEmployeeId"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col space-y-4">
                                            <FormLabel >REPORTING MANAGER<span className='text-destructive'>*</span></FormLabel>
                                            <Popover open={open} onOpenChange={setManagerOpen}>
                                                <PopoverTrigger >
                                                <FormControl>
                                                    <Button
                                                    type="button"
                                                    onClick={() => {
                                                        setManagerOpen(true);
                                                    }}
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-full h-9 justify-between truncate text-xs",
                                                    )}
                                                    >
                                                    <p className='text-[11px] text-left font-PoppinsMedium w-48 truncate'>
                                                    {field.value
                                                        ? md_managers.find(
                                                            (manager) => manager.employeeId.toString() === field.value
                                                        )?.name
                                                        : "Select Reporting Manager"}
                                                    </p>
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                    <PopoverContent className="sm:w-[360px] md:w-[360px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search Reporting Manager..." />
                                                    <CommandList>
                                                    <CommandEmpty>No Reporing Manager found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {md_managers.map((manager) => (
                                                        <CommandItem
                                                            className="text-[13px] font-medium px-2 justify-start"
                                                            value={manager.employeeId}
                                                            key={`Manager_${manager.employeeId}`}
                                                            onSelect={(value) => {
                                                                wfhform.setValue("notifyToEmployeeId", manager.employeeId.toString());
                                                                setManagerOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                manager.employeeId.toString() === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                            )}
                                                            />
                                                            {manager.name}
                                                        </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                                </PopoverContent>
                                            </Popover>
                                            
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                        /> :  <>
                                            <FormLabel >REPORTING MANAGER <span className='text-destructive'>*</span></FormLabel>
                                           <Input placeholder="Reporting Manager" 
                                           value={acc_dtls?.managerName} 
                                           readOnly={true}
                                          className="rounded-sm"/>
                                        </>
                                        
                                     
                                    }
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
                <SheetFooter className={'p-3 border-t'}>
                        <Button type="submit" form="wfhForm">
                                Apply
                        </Button>        
                </SheetFooter>
            </SheetContent>
           
        </Sheet>

    )
}

export default WFHDialog