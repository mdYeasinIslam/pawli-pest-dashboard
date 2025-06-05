import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Calendar, Clock } from 'lucide-react'

const DateTime = () => {
  return (
      <>
        {/* Date and Time section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label className="text-[28px] font-semibold text-gray-900">Date</Label>
          <div className="relative">
            <Input
              type="text"
              defaultValue="5/22/2025"
              className="pr-10 h-12 border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Calendar className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-[28px] font-semibold text-gray-900">Time</Label>
          <div className="relative">
            <Input
              type="text"
              defaultValue="1:30 AM"
              className="pr-10 h-12 border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      </>
  )
}

export default DateTime