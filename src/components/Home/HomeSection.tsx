"use client"

import type React from "react"

import { useState } from "react"
import { BatteryFull, ChevronRight, Info, Settings, SignalHigh, Upload, Wifi, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function HomeSection() {
  const [dragActive, setDragActive] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
 
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
      <section className="h-screen mt-8 ">
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
                <Button
                     onClick={() => setShowPreviewModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium">
                    Preview
                </Button>
                <Button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-2 rounded-lg font-medium">
                    Statistics
                </Button>
                </div>
            </div>
            {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-[#180E25]/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className=" rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
              <span className="text-sm font-medium">Post n°1 - Time of publication: 11 AM, July 1st, 2025</span>
              <button
                className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                onClick={() => setShowPreviewModal(false)}
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 ">
              <div className="flex justify-center space-x-8">
                {/* First Phone Mockup */}
                <div className="relative">
                  <div className="w-80 h-[550px] bg-black rounded-[2.5rem] p-2">
                    <div className="flex flex-col justify-between w-full h-full bg-white rounded-[2rem] overflow-hidden px-2">
                    <div className="space-y-2">
                      {/* Phone Status Bar */}
                      <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
                        <span className="font-medium">9:41</span>
                        <div className="w-20  h-5 bg-black rounded-full"></div>
                        <div className="flex space-x-1">
                          <div className="  rounded-sm"><SignalHigh className="w-5 h-5 text-black" strokeWidth={4} /></div>
                          <div className=" rounded-sm"><Wifi className="w-5 h-5 text-black" strokeWidth={3} /></div>
                          <div className=" rounded-sm"> <BatteryFull className="w-5 h-5 text-black" /></div>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="bg-white px-4  flex items-center justify-between ">
                        <div className="w-6 h-6 bg-gray-100 rounded"><Settings className="text-black"/></div>
                        <span className="font-semibold text-lg  ">Le chiffre du jour</span>
                        <div className="w-6 h-6 bg-gray-100 rounded"><Settings /></div>
                      </div>
                    </div>

                      {/* Content Area */}
                      <div className=" bg-black text-white p-4 h-1/2 place-content-center relative rounded-md">
                        <div className="absolute top-4 right-4">
                          <div className=" flex items-center justify-center"><Info strokeWidth={3} />
                            {/* <div className="w-3 h-3 border border-white rounded-full"></div> */}
                          </div>
                        </div>
                        <div className="mt-8">
                          <div className="text-xs mb-2">
                            <span className="bg-blue-600 px-2 py-1 rounded text-white">En 2024, Dassault Systèmes</span>
                            <span className="bg-red-600 px-2 py-1 rounded text-white ml-1">RECORD</span>
                          </div>
                          <p className="text-xs leading-relaxed">
                            Dassault Systèmes a atteint un chiffre d'affaires record de 5,6 milliards d'euros en 2024,
                            marquant une croissance de 8% par rapport à l'année précédente et confirmant sa position de
                            leader mondial des logiciels de conception 3D et de simulation.
                          </p>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="text-xs">@Hiciel</span>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="bg-white px-4 py-3 flex justify-center space-x-8">
                        <div className="w-6 h-6 1 bg-gray-300 rounded"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second Phone Mockup */}
                 <div className="relative">
                  <div className="w-80 h-[550px] bg-black rounded-[2.5rem] p-2">
                    <div className="flex flex-col justify-between w-full h-full bg-white rounded-[2rem] overflow-hidden px-2">
                    <div className="space-y-2">
                      {/* Phone Status Bar */}
                      <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
                        <span className="font-medium">9:41</span>
                        <div className="w-20  h-5 bg-black rounded-full"></div>
                        <div className="flex space-x-1">
                          <div className="  rounded-sm"><SignalHigh className="w-5 h-5 text-black" strokeWidth={3} /></div>
                          <div className=" rounded-sm"><Wifi className="w-5 h-5 text-black" strokeWidth={3} /></div>
                          <div className=" rounded-sm"> <BatteryFull className="w-5 h-5 text-black" /></div>
                        </div>
                      </div>

                      {/* App Header */}
                      <div className="bg-white px-4  flex items-center justify-between ">
                        <div className="w-6 h-6 bg-gray-100 rounded"><Settings className="text-black"/></div>
                        <span className="font-semibold text-lg  ">Le chiffre du jour</span>
                        <div className="w-6 h-6 bg-gray-100 rounded"><Settings /></div>
                      </div>
                    </div>

                      {/* Content Area */}
                      <div className=" bg-black text-white p-4 h-1/2 place-content-center relative rounded-md">
                        <div className="absolute top-4 right-4">
                          <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 border border-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="mt-8">
                          <div className="text-xs mb-2">
                            <span className="bg-blue-600 px-2 py-1 rounded text-white">En 2024, Dassault Systèmes</span>
                            <span className="bg-red-600 px-2 py-1 rounded text-white ml-1">RECORD</span>
                          </div>
                          <p className="text-xs leading-relaxed">
                            Dassault Systèmes a atteint un chiffre d'affaires record de 5,6 milliards d'euros en 2024,
                            marquant une croissance de 8% par rapport à l'année précédente et confirmant sa position de
                            leader mondial des logiciels de conception 3D et de simulation.
                          </p>
                        </div>
                        <div className="absolute bottom-4 right-4">
                          <span className="text-xs">@Hiciel</span>
                        </div>
                      </div>

                      {/* Bottom Navigation */}
                      <div className="bg-white px-4 py-3 flex justify-center space-x-8">
                        <div className="w-6 h-6 1 bg-gray-300 rounded"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Modal Action Buttons */}
              <div className="flex justify-end space-x-4 ">
                <Button className="bg-black hover:bg-gray-700 text-white mt-3 px-6 py-4 rounded-lg font-medium">
                  Save post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>  
      </section>
 
  )
}
