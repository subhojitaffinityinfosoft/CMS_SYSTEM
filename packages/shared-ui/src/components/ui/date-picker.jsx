"use client"

import * as React from "react"
import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import moment from "moment"



export function DatePicker({
  startYear = getYear(new Date()),
  endYear = getYear(new Date()) + 1,
  handleChange,
  disabledFromDate,
  disabledToDate,
  className,
  formValue,
  monthPayLoad
}) {
  const [date, setDate] = React.useState(null);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month) => {
    const newDate = setMonth(date, months.indexOf(month));
    setDate(newDate);
  }

  const handleYearChange = (year) => {
    const newDate = setYear(date, parseInt(year));
    setDate(newDate)
  }

  const handleSelect = (selectedData) => {
    if (selectedData) {
      setDate(selectedData);
      handleChange(selectedData);
    }
  }
  React.useEffect(()=>{
    if(formValue){
      setDate(formValue);
    }
  },[formValue])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            `${className ? className : 'w-[250px]'} h-9 justify-start text-left font-normal text-xs font-PoppinsMedium`,
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Select Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
          {!monthPayLoad && <div className="flex justify-between p-2">
            <Select
              onValueChange={handleMonthChange}
              value={months[getMonth(date || new Date())]}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month} value={month}>{month}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleYearChange}
              value={getYear(date || new Date()).toString()}
            >
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>}

        <Calendar
          mode="single"
          selected={date || new Date()}
          onSelect={handleSelect}
          initialFocus
          month={date || new Date()}
          onMonthChange={setDate}
          toDate={disabledToDate ? disabledToDate : moment([endYear]).endOf('year').format('MM-DD-YYYY')}
          fromDate={disabledFromDate ? disabledFromDate :  moment([startYear]).startOf('year').format('MM-DD-YYYY')}

        />
      </PopoverContent>
    </Popover>
  )
}