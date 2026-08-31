"use client"

import React, { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Eye, EyeOff, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

// A sub-component to handle Combobox specific state cleanly
const DynamicCombobox = ({

    fieldConfig,
    formControlProps,
    form

}) => {
    const [open, setOpen] = useState(false)
    const options = fieldConfig.data || []

    // If there is only 1 option, auto-select it and disable the input (based on your logic)
    if (options.length === 1) {
        return (
            <FormControl className="h-full">
                <Button
                    disabled
                    type="button"
                    variant="outline"
                    role="combobox"
                    className="w-full h-9 justify-between truncate text-xs bg-muted text-muted-foreground"
                >
                    <p className="text-[11px] text-left font-medium w-48 truncate">
                        {options[0].label}
                    </p>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </FormControl>
        )
    }

    // Normal Searchable Combobox
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <FormControl className="h-full">
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            "w-full h-9 justify-between truncate text-xs bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground",
                            !formControlProps.value && "text-muted-foreground"
                        )}
                    >
                        <p className="text-[11px] text-left font-medium w-48 truncate">
                            {formControlProps.value
                                ? options.find((opt) => opt.value.toString() === formControlProps.value?.toString())?.label
                                : fieldConfig.placeholder || `Select ${fieldConfig.label}`}
                        </p>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="sm:w-[360px] md:w-[360px] p-0 bg-popover border-border">
                <Command>
                    <CommandInput placeholder={`Search ${fieldConfig.label}...`} className="border-none focus:ring-0" />
                    <CommandList>
                        <CommandEmpty>No {fieldConfig.label.toLowerCase()} found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.label} // CommandItem matches against string
                                    className="text-xs px-2 justify-start cursor-pointer hover:bg-accent"
                                    onSelect={() => {
                                        form.setValue(fieldConfig.acceseriesKey, opt.value.toString())
                                        setOpen(false)
                                        // Trigger any custom callback logic (like fetchDivision) passed in config
                                        if (fieldConfig.onSelectCustom) {
                                            fieldConfig.onSelectCustom(opt.value)
                                        }
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4 text-primary",
                                            formControlProps.value?.toString() === opt.value.toString()
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


export default function FormComponent({ formField, onSubmit, submitBtnText = "Submit" }) {
    const [showPassword, setShowPassword] = useState(false)

    const dynamicSchema = useMemo(() => {
        const shape = {}
        formField.forEach((field) => {
            shape[field.acceseriesKey] = field.validation
        })
        return z.object(shape)
    }, [formField])

    const form = useForm({
        resolver: zodResolver(dynamicSchema),
    })

    const formValues = form.watch()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {formField.map((field) => {
                    // Determine if we need a side-by-side layout for switches and checkboxes
                    const isRowLayout = field.type === "checkbox" || field.type === "switch";

                    return (
                        <FormField
                            key={field.acceseriesKey}
                            control={form.control}
                            name={field.acceseriesKey}
                            render={({ field: formControlProps }) => (
                                <FormItem className={cn("flex", isRowLayout ? "flex-row items-center space-x-3 space-y-0" : "flex-col")}>

                                    {/* Standard Label for Inputs/Selects */}
                                    {!isRowLayout && (
                                        <FormLabel className="text-foreground text-sm font-medium pt-2">
                                            {field.label} {field.required && <span className="text-destructive">*</span>}
                                        </FormLabel>
                                    )}

                                    {/* 1. INPUT TYPE (Text, Number, Email) */}
                                    {field.type === "input" && (
                                        <FormControl>
                                            <Input
                                                type={field.inputType || "text"}
                                                placeholder={field.placeholder || `Enter ${field.label}`}
                                                className="h-fit pt-2 pb-2 bg-background border-input text-foreground focus-visible:ring-ring"
                                                {...formControlProps}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    formControlProps.onChange(field.inputType === "number" ? (val === "" ? "" : Number(val)) : val);
                                                }}
                                            />
                                        </FormControl>
                                    )}

                                    {/* 2. TEXTAREA TYPE */}
                                    {field.type === "textarea" && (
                                        <FormControl>
                                            <Textarea
                                                placeholder={field.placeholder || `Enter ${field.label}`}
                                                className="bg-background border-input text-foreground focus-visible:ring-ring resize-y"
                                                {...formControlProps}
                                            />
                                        </FormControl>
                                    )}

                                    {/* 3. PASSWORD TYPE */}
                                    {field.type === "password" && (
                                        <div className="relative">
                                            <FormControl>
                                                <Input
                                                    {...formControlProps}
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder={field.placeholder || "********"}
                                                    className="pr-10 bg-background border-input text-foreground focus-visible:ring-ring"
                                                />
                                            </FormControl>
                                            <span
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                            >
                                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </span>
                                        </div>
                                    )}

                                    {/* 4. CHECKBOX TYPE */}
                                    {field.type === "checkbox" && (
                                        <FormControl>
                                            <Checkbox
                                                checked={formControlProps.value}
                                                onCheckedChange={formControlProps.onChange}
                                                className="border-input text-primary focus-visible:ring-ring"
                                            />
                                        </FormControl>
                                    )}

                                    {/* 5. SWITCH TYPE */}
                                    {field.type === "switch" && (
                                        <FormControl>
                                            <Switch
                                                checked={formControlProps.value}
                                                onCheckedChange={formControlProps.onChange}
                                                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
                                            />
                                        </FormControl>
                                    )}

                                    {/* Side Label for Checkbox / Switch */}
                                    {isRowLayout && (
                                        <FormLabel className="text-foreground text-sm font-normal cursor-pointer m-0">
                                            {field.label} {field.required && <span className="text-destructive">*</span>}
                                        </FormLabel>
                                    )}

                                    {/* 6. SELECT TYPE (Standard HTML Select) */}
                                    {field.type === "select" && (
                                        <Select onValueChange={formControlProps.onChange} defaultValue={formControlProps.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-background border-input text-foreground focus:ring-ring">
                                                    <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-popover border-border">
                                                {field.data?.map((option) => (
                                                    <SelectItem key={option.value} value={option.value} className="focus:bg-accent focus:text-accent-foreground">
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}

                                    {/* 7. COMBOBOX TYPE (Searchable with Command/Popover) */}
                                    {field.type === "combobox" && (
                                        <DynamicCombobox fieldConfig={field} formControlProps={formControlProps} form={form} />
                                    )}

                                    {/* 8. DATEPICKER (Popover Calendar) */}
                                    {field.type === "popover" && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal bg-background border-input hover:bg-accent hover:text-accent-foreground",
                                                            !formControlProps.value ? "text-muted-foreground" : "text-foreground"
                                                        )}
                                                    >
                                                        {formControlProps.value ? (
                                                            format(formControlProps.value, "PPP")
                                                        ) : (
                                                            <span>{field.placeholder || "Pick a date"}</span>
                                                        )}
                                                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={formControlProps.value}
                                                    onSelect={formControlProps.onChange}
                                                    initialFocus
                                                    className="bg-background text-foreground"
                                                    disabled={(date) => {
                                                        let isDateDisabled = false;
                                                        if (field.minDateKey && formValues[field.minDateKey]) {
                                                            const minDateAllowed = new Date(formValues[field.minDateKey]);
                                                            minDateAllowed.setHours(0, 0, 0, 0);
                                                            if (date < minDateAllowed) isDateDisabled = true;
                                                        }
                                                        if (field.maxDateKey && formValues[field.maxDateKey]) {
                                                            const maxDateAllowed = new Date(formValues[field.maxDateKey]);
                                                            maxDateAllowed.setHours(23, 59, 59, 999);
                                                            if (date > maxDateAllowed) isDateDisabled = true;
                                                        }
                                                        if (field.staticMinDate && date < field.staticMinDate) isDateDisabled = true;
                                                        return isDateDisabled;
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    )}

                                    {/* 9. CUSTOM COMPONENT */}
                                    {field.type === "custom" && (
                                        <FormControl>
                                            <div className="w-full">
                                                {field.render({ value: formControlProps.value, onChange: formControlProps.onChange })}
                                            </div>
                                        </FormControl>
                                    )}

                                    <FormMessage className="text-destructive text-xs" />
                                </FormItem>
                            )}
                        />
                    )
                })}

                <Button
                    type="submit"
                    className="w-full font-semibold text-base h-11 rounded-lg shadow-md mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                    {submitBtnText}
                </Button>
            </form>
        </Form>
    )
}



// EXAMPLE OF USE---->>>>>

// {
//   acceseriesKey: "unitId",
//   label: "Unit",
//   type: "combobox", // <--- Triggers your new command popover snippet
//   required: true,
//   data: md_unit.map(u => ({ label: u.unitName, value: u.unitId })),
//   onSelectCustom: (val) => {
//     // Passes custom functions automatically when a user selects an item
//     fetchDivision(val);
//     fetchEmployeeByUnitId(val);
//   },
//   validation: z.string().min(1, "*Unit is required"),
// }

// {
//   acceseriesKey: "age",
//   label: "Age",
//   type: "input",
//   inputType: "number", // <--- Changes html type and auto-parses to integer
//   validation: z.number().min(18, "Must be at least 18"),
// }

// {
//   acceseriesKey: "isActive",
//   label: "Mark as Active Employee",
//   type: "switch", // OR "checkbox"
//   validation: z.boolean().default(false),
// }

// {
//   acceseriesKey: "description",
//   label: "Description",
//   type: "textarea",
//   placeholder: "Type your notes here...",
//   validation: z.string().optional(),
// }