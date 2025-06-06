import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
type Prop = {
  setIsYes: React.Dispatch<React.SetStateAction<boolean>>
  isYes:boolean
}
const SheduleSection = ({isYes,setIsYes}:Prop) => {
  // const [isYes, setIsYes] = useState(true)

  return (
    <div className="space-y-3">
      <Label className="text-[28px] font-urbanist font-semibold text-gray-900">Schedule</Label>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="yes"
            checked={isYes}
            onCheckedChange={() => setIsYes(true)}
            className="data-[state=checked]:bg-black data-[state=checked]:border-black"
          />
          <Label htmlFor="yes" className="text-lg font-normal text-gray-700">
            Yes
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="no"
            checked={!isYes}
            onCheckedChange={() => setIsYes(false)}
            className="data-[state=checked]:bg-black data-[state=checked]:border-black"
          />
          <Label htmlFor="no" className="text-lg font-normal text-gray-700">
            No
          </Label>
        </div>
      </div>
    </div>
  )
}

export default SheduleSection