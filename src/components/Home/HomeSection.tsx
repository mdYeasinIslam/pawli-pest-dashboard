"use client"

import type React from "react"
import { use, useCallback, useEffect, useState } from "react"
import {  ChevronRight, Link, Type} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Modal from "../modal/Modal"
import { FileUpload } from "../file-upload/fill-upload"
import { PostData } from "@/Types/post"
import  { StatisticsModal } from "../modal/StaticModal"
import { toast } from "sonner"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SheduleSection from "./SheduleSection"
import DateTime from "./DateTime"
interface PostCreatorProps {
  initialData?: Partial<PostData>
  onSave?: (data: PostData) => void
  onPreview?: (data: PostData) => void
  onStatistics?: () => void
}

export default function HomeSection() {
  // Define initialData as an empty object or with default values
  const initialData: Partial<PostData> = {}

  //State for managing modal
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showStaticModal, setShowStaticModal] = useState(false)

  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialData?.imagePreview || null) // State for uploaded image preview. ( can display the image preview in the UI by using this state variable)
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // State for the selected file. ( can display the image preview in the UI by using this state variable and when send image to the backend, you can use this state variable to send the file)

  // State for link and content text
  // These states will hold the text for the link and content areas
  const [linkText, setLinkText] = useState<string>("")
  const [contentText, setContentText] = useState<string>("")
  const [checkText, setCheckText] = useState<boolean>(false)

    
  const handleFileSelect = useCallback((file: File): void => {
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleFileRemove = useCallback((): void => {
    setUploadedImage(null)
    setSelectedFile(null)
  }, [])

  //validate and preview functions can be implemented as needed
  const handleValidate = (): void => {
    if (!linkText.length || !contentText.length) {
      setCheckText(false)
      toast("Please fill in all fields before validating.")
      return
    }
    else {
      setCheckText(true)
    }
  }
  
  const handleResetAfeterSavePost = () => {
    
   setShowPreviewModal(false); // Close the modal after successful post
    setSelectedFile(null); // Reset selected file
    setUploadedImage(null); // Reset uploaded image
    setContentText('');  // Reset content text
    setLinkText(''); // Reset link text
    setCheckText(false); // Reset check text state
  }

  useEffect(() => {
    // setContentText('');  // Reset content text
    // setLinkText(''); // Reset link text
  },[showPreviewModal])
    return (
      <section className="h-screen mt-8 ">
        <div className=" container mx-auto px-6 space-y-6 ">
            {/* Header */}
          <div className=" mx-auto  bg-black text-white px-6 py-3 flex items-center justify-between rounded-md ">
                <p></p>
                <p className=" text-sm font-medium">Post n°1 - Time of publication: 11 AM, July 1st, 2025</p>
                <button className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <ChevronRight className="w-4 h-4 text-black" />
                </button>
            </div>

            {/* Main Content */}
            <div className=" ">
                <div className=" grid grid-cols-1 lg:grid-cols-5  gap-10 ">
                {/* Left Column - Upload Area */}
                    <div className="col-span-2">
                      
                      <FileUpload
                          onFileSelect={handleFileSelect}
                          onFileRemove={handleFileRemove}
                          uploadedImage={uploadedImage}
                          dragActive={dragActive}
                          onDragStateChange={setDragActive}
                      />
                    </div>

                    {/* Center Column - Notification Blocks */}
                    {/* <div className="lg:col-span-1 space-y-4">
                        <div className="bg-[#156082] text-white rounded-lg h-48 text-center place-content-center ">
                        <span className="font-medium">Tooltip content</span>
                        </div>

                        <div className="bg-[#00B0F0] text-white rounded-lg h-48 text-center place-content-center">
                        <span className="font-medium">Push notification header</span>
                        </div>

                        <div className="bg-[#00B0F0] text-white rounded-lg h-48 text-center place-content-center">
                        <span className="font-medium">Push notification text</span>
                        </div>
                    </div> */}

                    {/* Right Column - Text Areas */}
                    <div className="space-y-5 col-span-3">
                      
                        <div className="space-y-7   ">
                            {/* <div className="h-full">
                              <label htmlFor="toltip" className="text-3xl font-semibold font-urbanist">Tooltip content</label>
                              <Textarea 
                                id="toltip"
                                onChange={(e)=>setLinkText(e.target.value)}
                                placeholder="Link here" 
                                value={linkText}
                                className="h-full border-gray-300 rounded-lg" />
                              
                            </div>
                            
                            <div className="h-full">
                              <label htmlFor="push" className="text-3xl font-semibold font-urbanist">Push notification header</label>
                                <Textarea
                                    defaultValue="Le chiffre du jour"
                                    id="push"
                                    className="border-blue-300 border-2  text-[20px]"
                                    readOnly
                                    style={{  fontSize: "20px", fontWeight: "lighter" }}
                                />
                            </div>
                            <div className="h-full">
                              <label htmlFor="content" className="text-3xl font-semibold font-urbanist">Push notification text</label>
                                <Textarea 
                                id="content"
                                onChange={(e)=>setContentText(e.target.value)}
                                placeholder="Write here" 
                                value={contentText}
                                className="h-full border-gray-300 rounded-lg" />
                            </div> */}
                            <div className="space-y-3">
                                <Label className=" text-[28px] font-semibold font-urbanist">Tooltip content</Label>
                                <div className="relative">
                                  <Textarea
                                    placeholder="Write here"
                                    value={linkText}
                                     onChange={(e)=>setLinkText(e.target.value)}
                                    className="min-h-[80px] h-[130px] pr-16 resize-none border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                                  />
                                  <div className="absolute top-3 right-3 flex gap-2">
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                                      <Link className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                                      <Type className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Push notification header section */}
                              <div className="space-y-3">
                                <Label className="text-[28px] font-semibold font-urbanist">Push notification header</Label>
                                <Input
                                  defaultValue="Le chiffre du jour"
                                  readOnly
                                  className="h-[70px] border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                                />
                              </div>

                              {/* Push notification text section */}
                              <div className="space-y-3">
                                <Label className="text-[28px] font-semibold font-urbanist">Push notification text</Label>
                                <div className="relative">
                                  <Textarea
                                    placeholder="Write here"
                                    onChange={(e)=>setContentText(e.target.value)}
                                    value={contentText}
                                    className="min-h-[100px] h-[130] pr-8 resize-none border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
                                  />
                                  <div className="absolute bottom-3 right-3">
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                                      <Type className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                        </div>
                        {/* Schedule section */}
                        <SheduleSection/>
                        {/* Date and Time section */}
                        <DateTime/>
                    </div>
                </div>
                {/* Action Buttons */}
                <div className=" flex justify-end space-x-4 mt-8">
                <Button
                    onClick={handleValidate}
                    className={` text-white px-6 py-6 text-lg rounded-lg font-medium ${!checkText?'bg-[#FF0000] hover:bg-red-600':'bg-green-500 hover:bg-green-600'}`}>{ !checkText?'Validate':'Modify'}</Button>
                <Button
                     onClick={() => setShowPreviewModal(true)}
                    className="bg-[#7030A0] hover:bg-purple-700 text-white px-6 py-6 text-lg rounded-lg font-medium"
                    disabled={!checkText || !uploadedImage || !linkText || !contentText ? true : false}      
              >
                    Preview
                </Button>
                <Button onClick={() => setShowStaticModal(true)} className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-6 text-lg rounded-lg font-medium">
                    Statistics
                </Button>
                <Button onClick={() => setShowStaticModal(true)} className="bg-black  hover:bg-pink-500 text-white px-6 py-6 text-lg rounded-lg font-medium">
                    Save Post
                </Button>
                </div>
            </div>
            
            {/* Preview Modal */}
          {showPreviewModal && (
            <Modal
              selectedFile={selectedFile}
              uploadedImage={uploadedImage}
              text={linkText}
              content={contentText}    
              setShowPreviewModal={setShowPreviewModal}
              handleResetAfeterSavePost={handleResetAfeterSavePost}
            />
                )}
                {showStaticModal && (
                    <StatisticsModal
                    isOpen={showStaticModal}
                    onClose={() => setShowStaticModal(false)}
                    statistics={{
                    comments: 32,
                    saved: 42,
                    shares: 12,
                    }}
                />
                )}
      
        </div>  
      </section>
 
  )
}
