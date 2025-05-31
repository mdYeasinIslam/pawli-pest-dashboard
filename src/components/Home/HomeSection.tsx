"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function HomeSection() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file drop logic here
  }

    return (
      <section className="h-screen mt-8">
        <div className=" container mx-auto px-6 space-y-6 ">
            {/* Header */}
            <div className=" mx-auto  bg-black text-white px-6 py-3 flex items-center justify-between rounded-md ">
                <span className="text-sm font-medium">Post n°1 - Time of publication: 11 AM, July 1st, 2025</span>
                <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-black" />
                </button>
            </div>

            {/* Main Content */}
            <div className=" ">
                <div className=" grid grid-cols-1 lg:grid-cols-3  gap-6 max-w-7xl mx-auto">
                {/* Left Column - Upload Area */}
                    <div className="lg:col-span-1 h-full ">
                        <div
                        className={`h-full place-content-center border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        >
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                            <Upload className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-sm text-gray-600 text-center">
                            <p className="font-medium">Drag & Drop or choose to upload picture</p>
                            <p>of the day here</p>
                            </div>
                            <p className="text-xs text-gray-400">Supported formats: .jpeg .png</p>
                        </div>
                        </div>
                    </div>

                    {/* Center Column - Notification Blocks */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Tooltip Content */}
                        <div className="bg-teal-600 text-white rounded-lg h-48 text-center place-content-center ">
                        <span className="font-medium">Tooltip content</span>
                        </div>

                        {/* Push Notification Header */}
                        <div className="bg-blue-500 text-white rounded-lg h-48 text-center place-content-center">
                        <span className="font-medium">Push notification header</span>
                        </div>

                        {/* Push Notification Text */}
                        <div className="bg-blue-500 text-white rounded-lg h-48 text-center place-content-center">
                        <span className="font-medium">Push notification text</span>
                        </div>
                    </div>

                    {/* Right Column - Text Areas */}
                    <div className="flex flex-col justify-between lg:col-span-1 space-y-4 ">
                        <Textarea placeholder="Write here" className="h-full border-gray-300 rounded-lg" />
                        <Textarea placeholder="Le chiffre du jour" className="h-full border-blue-300 border-2" />
                        <Textarea placeholder="Write here" className="h-full border-gray-300 rounded-lg" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                <Button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium">Validate</Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
                    Preview
                </Button>
                <Button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-medium">
                    Statistics
                </Button>
                </div>
            </div>
        </div>  
      </section>
 
  )
}
