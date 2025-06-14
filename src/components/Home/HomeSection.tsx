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
import Header from "./Header"
import ActionButtons from "./ActionButtons"
import TooltipContent from "./TooltipContent"
import { usePostNewsMutation } from "@/redux/services/Api/post/postApi"
import JoditTextArea from "../jodit-react/JoditTextArea"
import Marquee from "./HeaderSlider/Marquee "
import MarqueeHeader from "./HeaderSlider/Marquee "
interface PostCreatorProps {
  initialData?: Partial<PostData>
  onSave?: (data: PostData) => void
  onPreview?: (data: PostData) => void
  onStatistics?: () => void
}

export default function HomeSection() {
  // Define initialData as an empty object or with default values
  const initialData: Partial<PostData> = {}
  const [postNews] = usePostNewsMutation()
  //State for managing modal
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [selectDeviceType, setSelectDeviceType] = useState('')
  const [showStaticModal, setShowStaticModal] = useState(false)
  
  // state for image uploading
  // const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(initialData?.imagePreview || null) // State for uploaded image preview. ( can display the image preview in the UI by using this state variable)
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // State for the selected file. ( can display the image preview in the UI by using this state variable and when send image to the backend, you can use this state variable to send the file)

  // State for link and content text
  // These states will hold the text for the link and content areas
  const [linkText, setLinkText] = useState<string>("")
  const [contentText, setContentText] = useState<string>("")
  const [checkText, setCheckText] = useState<boolean>(false)
  // state for schedule section handler : hide "date and time section"
  const [isYes, setIsYes] = useState(true)
  const [postDate, setPostDate] = useState('')
  const [postTime,setPostTime] = useState('')
  
  

      //handle image upload
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
//----------------------------------------------


  //validate and preview functions can be implemented as needed and integrate post api
  // console.log(uploadedImage)
  const handleValidate = () => {
    if (!linkText.length || !contentText.length || !uploadedImage || !selectedFile) {
      setCheckText(false)
      toast("Please fill in all fields before validating.(image, tooptip, notification")
      return
    }
    try {
      const formData = new FormData();

      // 1. Add file (assumes you already have a File object from input)
          
      // 2. Add JSON string for `data`
      if (postDate && postTime) {
        const data = {
          content: linkText,
          pushHeader: 'Le chiffre du jour',
          pushContent: contentText,
          scheduledDate: postDate,
          scheduledTime: postTime,
        };
        formData.append('data', JSON.stringify(data));
      }
      else {
        const data = {
          content: linkText,
          pushHeader: 'Le chiffre du jour',
          pushContent: contentText,
        };
        formData.append('data', JSON.stringify(data));
      }
      formData.append('image', selectedFile);
          

      // 3. Call API
      // const res = await postNews(formData).unwrap();
      fetch('https://pauline.onrender.com/api/v1/posts', {
        method: "POST",
        body: formData
      }).then(res => res.json())
        .then(data => {
          toast.success('post created successfully')
            setSelectedFile(null); // Reset selected file
            setUploadedImage(null); // Reset uploaded image
            setContentText('');  // Reset content text
            setLinkText(''); // Reset link text
            // setCheckText(false); // Reset check text state
          console.log('Success:', data);
        })
    }
    catch (error) {
        console.error('Post failed:', error);
      }
      setCheckText(true)

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
      if (!isYes) {
      setPostDate('')
      setPostTime('')
    }
    },[isYes])
  
  useEffect(() => {
    if (selectDeviceType?.length > 0) {
         setShowPreviewModal(false)
         
     }
  },[selectDeviceType])

  const getDateAndTime = (date: string, time: string) => {
    setPostDate(date),
    setPostTime(time)
  }

  console.log(linkText)

    return (
      <section className="h-full my-8 ">
        <div className=" container mx-auto px-6 space-y-6 ">
            <Header/>

            {/* Main Content */}
            <div className=" ">
                <div className=" grid grid-cols-1 lg:grid-cols-5  gap-10 ">
                {/* Left Column - Upload Area */}
                    <div className="col-span-2 h-full w-full  border-2 border-dashed">
                      
                      <FileUpload
                          onFileSelect={handleFileSelect}
                          onFileRemove={handleFileRemove}
                          uploadedImage={uploadedImage}
                          // dragActive={dragActive}
                          // onDragStateChange={setDragActive}
                      />
                    </div>

                    {/* Right Column - Text Areas */}
                    <div className="space-y-5 col-span-3">
                      {/* Post Input Section  */}
                        <div className="space-y-7   ">
                              <TooltipContent
                                  linkText={linkText}
                                  setLinkText={setLinkText}
                              
                              />
                              {/* Push notification header section */}
                              <div className="space-y-3">
                                <Label className="text-[28px] font-semibold font-urbanist">Push notification header</Label>
                                <Input
                                  defaultValue="Le chiffre du jour"
                                  readOnly
                                  className="h-[40px] border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
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
                                    required
                                    className="min-h-[50px] h-[90px] pr-8 resize-none border-gray-200 focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
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
                        <SheduleSection isYes={isYes} setIsYes={setIsYes} />
                
                        {/* Date and Time section */}
                        {
                  isYes && <DateTime getDateAndTime={getDateAndTime} isYes={isYes} />
                        }
                      
                    </div>
                </div>
                {/* Action buttons */}
                <ActionButtons
                  checkText={checkText}
                  linkText={linkText}
                  contentText={contentText}
                  uploadedImage={uploadedImage}
                  handleValidate={handleValidate}
                  setShowPreviewModal={setShowPreviewModal}
                  setShowStaticModal={setShowStaticModal}
                />
              
            </div>
            
          
          {/* Preview Modal */}
          { selectDeviceType && selectDeviceType=='android' && (
                <Modal
                  selectedFile={selectedFile}
                  uploadedImage={uploadedImage}
                  text={linkText}
              content={contentText}   
              device='android'
              setShowPreviewModal={setShowPreviewModal}
              setSelectDeviceType={setSelectDeviceType}
                  handleResetAfeterSavePost={handleResetAfeterSavePost}
                />
          )}
          { selectDeviceType && selectDeviceType=='apple' && (
                <Modal
                  selectedFile={selectedFile}
                  uploadedImage={uploadedImage}
                  text={linkText}
              content={contentText}   
                device='apple'
              setShowPreviewModal={setShowPreviewModal}
              setSelectDeviceType={setSelectDeviceType}
                  handleResetAfeterSavePost={handleResetAfeterSavePost}
                />
          )}
          {
            showPreviewModal && (
              <StatisticsModal
              isOpen={showPreviewModal}
                selectDeviceType={selectDeviceType}
              onClose={() => setShowPreviewModal(false)}
                appleView='IOS view' androidView='Android view'
              setSelectDeviceType={setSelectDeviceType}
              />
            )
          }
          

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
