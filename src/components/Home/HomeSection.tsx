"use client"

import type React from "react"
import { useCallback, useState } from "react"
import {  ChevronRight} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import Modal from "../modal/Modal"
import { FileUpload } from "../file-upload/fill-upload"
import { PostData } from "@/Types/post"
import  { StatisticsModal } from "../modal/StaticModal"
import { toast } from "sonner"
interface PostCreatorProps {
  initialData?: Partial<PostData>
  onSave?: (data: PostData) => void
  onPreview?: (data: PostData) => void
  onStatistics?: () => void
}

export default function HomeSection() {
  // Define initialData as an empty object or with default values
  const initialData: Partial<PostData> = {}
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showStaticModal, setShowStaticModal] = useState(false)

  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialData?.imagePreview || null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [linkText, setLinkText] = useState<string>("")
    const [contentText, setContentText] = useState<string>("")
    const [checkText, setCheckText] = useState<boolean>(false)
  // Form state with proper TypeScript types
  const [formData, setFormData] = useState<Omit<PostData, "id" | "image" | "imagePreview">>({
    tooltipContent: initialData?.tooltipContent || "",
    pushHeader: initialData?.pushHeader || "",
    pushText: initialData?.pushText || "",
    dailyNumber: initialData?.dailyNumber || "",
    rightTextArea: initialData?.rightTextArea || "",
    publishTime: initialData?.publishTime || "11 AM, July 1st, 2025",
  })

  const handleInputChange = useCallback(
    (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    },
    [],
  )

    console.log(linkText, contentText)
    
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
    
//   const handleValidate = (): void => {
//     const postData: PostData = {
//       ...formData,
//       image: selectedFile,
//       imagePreview: uploadedImage,
//     }
//     // onSave?.(postData)
//   }

//   const handlePreview = (): void => {
//     const postData: PostData = {
//       ...formData,
//       image: selectedFile,
//       imagePreview: uploadedImage,
//     }
//     // onPreview?.(postData)
//   }

//   const handleClose = (): void => {
//     // Handle close logic
//     console.log("Closing post creator")
//   }

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
                <div className=" grid grid-cols-1 lg:grid-cols-3  gap-6 ">
                {/* Left Column - Upload Area */}
                  
                    <FileUpload
                        onFileSelect={handleFileSelect}
                        onFileRemove={handleFileRemove}
                        uploadedImage={uploadedImage}
                        dragActive={dragActive}
                        onDragStateChange={setDragActive}
                    />

                    {/* Center Column - Notification Blocks */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Tooltip Content */}
                        <div className="bg-[#156082] text-white rounded-lg h-40 text-center place-content-center ">
                        <span className="font-medium">Tooltip content</span>
                        </div>

                        {/* Push Notification Header */}
                        <div className="bg-[#00B0F0] text-white rounded-lg h-40 text-center place-content-center">
                        <span className="font-medium">Push notification header</span>
                        </div>

                        {/* Push Notification Text */}
                        <div className="bg-[#00B0F0] text-white rounded-lg h-40 text-center place-content-center">
                        <span className="font-medium">Push notification text</span>
                        </div>
                    </div>

                    {/* Right Column - Text Areas */}
                    <div className="flex flex-col justify-between lg:col-span-1 space-y-4 ">
                        <Textarea 
                            onChange={(e)=>setLinkText(e.target.value)}
                            placeholder="Write here" 
                            className="h-full border-gray-300 rounded-lg" />
                        <div className="flex flex-1 items-center h-full">
                            <Textarea
                                defaultValue="Le chiffre du jour"
                                className="border-blue-300 border-2 flex items-center text-[30px]"
                                readOnly
                                style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: "lighter" }}
                            />
                        </div>
                            <Textarea 
                            onChange={(e)=>setContentText(e.target.value)}
                            placeholder="Write here" 
                            className="h-full border-gray-300 rounded-lg" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className=" flex justify-end space-x-4 mt-8">
                <Button
                    onClick={handleValidate}
                    className={` text-white px-6 py-6 text-lg rounded-lg font-medium ${!checkText?'bg-red-500 hover:bg-red-600':'bg-green-500 hover:bg-green-600'}`}>{ !checkText?'Validate':'Modify'}</Button>
                <Button
                     onClick={() => setShowPreviewModal(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-6 text-lg rounded-lg font-medium">
                    Preview
                </Button>
                <Button onClick={() => setShowStaticModal(true)} className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-6 text-lg rounded-lg font-medium">
                    Statistics
                </Button>
                </div>
            </div>
            
            {/* Preview Modal */}
                {showPreviewModal && (
                <Modal 
                text={linkText}
                content={contentText}    
                setShowPreviewModal={setShowPreviewModal}/>
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
