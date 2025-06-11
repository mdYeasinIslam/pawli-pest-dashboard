'use client'
import React, { useState } from 'react'
import { Label } from '../ui/label'
import {  CalendarIcon, Clock } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Calendar } from '../ui/calendar'

type PropType = {
  setPostTime?: React.Dispatch<React.SetStateAction<string>>
  setPostDate?: React.Dispatch<React.SetStateAction<string>>
  getDateAndTime: (date: string, time: string) => void
}

const DateTime = ({ getDateAndTime }: PropType) => {
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState({ hour: "10", minute: "30", period: "AM" })

  const formatTime = (hour: string, minute: string, period: string) => {
    return `${hour}:${minute} ${period}`
  }
  // Format date as 2025-05-30
  const formattedDate = date
    ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    : '';
  // Format time as 04:06 (24-hour format)
  // Convert 12-hour time to 24-hour format
  const hour24 =
    time.period === "AM"
      ? time.hour === "12"
        ? "00"
        : time.hour.padStart(2, "0")
      : time.hour === "12"
        ? "12"
        : (parseInt(time.hour, 10) + 12).toString().padStart(2, "0");
  const formattedTime = `${hour24}:${time.minute}`;

  React.useEffect(() => {
    getDateAndTime(formattedDate, formattedTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedDate, formattedTime])

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString())
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))
  return (
    <>
      {/* Date and Time section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-xl font-medium text-gray-900">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12  text-xl justify-start text-left font-normal border-gray-200  hover:border-gray-300",
                  !date && "text-muted-foreground ",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                {date ? format(date, "M/d/yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                required={true}
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow-sm"
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-3">
          <Label className="text-xl font-medium text-gray-900">Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 text-xl  justify-start text-left font-normal border-gray-200 hover:border-gray-300"
              >
                <Clock className="mr-2 h-4 w-4 text-gray-400" />
                {formatTime(time.hour, time.minute, time.period)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
              <div className="flex items-center gap-1">
                <Select value={time.hour} onValueChange={(value) => setTime({ ...time, hour: value })}>
                  <SelectTrigger className="w-18">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-gray-500">:</span>
                <Select value={time.minute} onValueChange={(value) => setTime({ ...time, minute: value })}>
                  <SelectTrigger className="w-18">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((minute) => (
                      <SelectItem key={minute} value={minute}>
                        {minute}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={time.period} onValueChange={(value) => setTime({ ...time, period: value })}>
                  <SelectTrigger className="w-18">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  )
}

export default DateTime