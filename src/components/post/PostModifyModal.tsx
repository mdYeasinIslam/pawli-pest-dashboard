"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "../file-upload/fill-upload"
import { AllPostData, PostData } from "@/Types/post"
import { toast } from "sonner"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import SheduleSection from "../Home/SheduleSection"
import DateTime from "../Home/DateTime"
import TooltipContent from "../Home/TooltipContent"
import Header from "../Home/Header"
import { useParams, usePathname } from "next/navigation"
import { useGetPostByIdQuery, useUpdatePostMutation } from "@/redux/services/Api/post/postApi"
import LoadingSpinner from "@/app/loading"
import Link from "next/link"

type PostStat = {
    success: boolean;
    message: string;
    data: AllPostData;
};

export default function PostModifyModal() {
    const pathName = usePathname()
    const param = useParams();
    const id = param.id as string

    const { data, error, isLoading, refetch } = useGetPostByIdQuery(id) as { data: PostStat, error: unknown, isLoading: unknown, refetch: () => void }
    const [updatePost] = useUpdatePostMutation()

    const [postData, setPostData] = useState<AllPostData | null>(null);
    
    // State Initialization
    const [showPreviewModal, setShowPreviewModal] = useState(false)
    const [selectDeviceType, setSelectDeviceType] = useState('')
    const [showStaticModal, setShowStaticModal] = useState(false)
    const [linkText, setLinkText] = useState<string>('')
    const [contentText, setContentText] = useState<string>('')
    const [checkText, setCheckText] = useState<boolean>(false)
    const [isYes, setIsYes] = useState(true)
    const [postDate, setPostDate] = useState<string>('') // Scheduled Date
    const [postTime, setPostTime] = useState<string>('') // Scheduled Time
    const [uploadedImage, setUploadedImage] = useState<string | null>(null) // Image URL for preview
    const [selectedFile, setSelectedFile] = useState<File | null>(null) // Selected file for upload

    useEffect(() => {
        if (data?.data) {
            setPostData(data.data);
            refetch()
        }
    }, [data]);

    // Set state values based on postData after data is fetched
    useEffect(() => {
        if (postData) {
            setLinkText(postData.content);
            setContentText(postData.pushContent || "");
            setPostDate(postData.scheduledDate?.split("T")[0] || "");
            setPostTime(postData.scheduledDate?.split("T")[1] || "");
            setUploadedImage(postData.imageUrl || null);
        }
    }, [postData]);

    // Handle file select for image upload
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

    // Handle update function
    const handleUpdate = async () => {
        if (!linkText.length  || !contentText.length || !uploadedImage) {
            setCheckText(false)
            toast("Please fill in all fields before validating. (image, tooltip, notification)")
            return
        }
        console.log(linkText, contentText,postData,postTime)
        try {
            const formData = new FormData();
            const postData = {
                content: linkText,
                pushHeader: 'Le chiffre du jour',
                pushContent: contentText,
                scheduledDate: postDate,
                scheduledTime: postTime,
            };
            
            // Append data as JSON string
            formData.append('data', JSON.stringify(postData));
            
            // Append selected image if available
            if (selectedFile) {
                formData.append('image', selectedFile);
            }

            // Call the mutation to update the post
            const res = await updatePost({ id, data: formData }).unwrap();
            console.log('Post updated:', res);
            toast.success('Post updated successfully');
        } catch (error) {
            console.error('Post update failed:', error);
            toast.error('Failed to update post');
        }

        setCheckText(true);
    }

    useEffect(() => {
        if (!isYes) {
            setPostDate('')
            setPostTime('')
        }
    }, [isYes])

    useEffect(() => {
        if (selectDeviceType?.length > 0) {
            setShowPreviewModal(false)
        }
    }, [selectDeviceType])

    const getDateAndTime = (date: string, time: string) => {
        setPostDate(date)
        setPostTime(time)
    }

    if (isLoading) { return <LoadingSpinner /> }
    if (error) { return <div>An error occurred</div> }

    return (
        <section className="h-full my-8 ">
            <div className="container mx-auto px-6 space-y-6 ">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 ">
                        {/* Left Column - Upload Area */}
                        <div className="col-span-2 h-full w-full border-2 border-dashed">
                            <FileUpload
                                onFileSelect={handleFileSelect}
                                onFileRemove={handleFileRemove}
                                uploadedImage={uploadedImage}
                            />
                        </div>

                        {/* Right Column - Text Areas */}
                        <div className="space-y-5 col-span-3">
                            {/* Post Input Section */}
                            <div className="space-y-7">
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
                                            onChange={(e) => setContentText(e.target.value)}
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
                    <div className="flex justify-end gap-5 my-5">
                        <Link href={`/${pathName?.split('/')[1] + '/' + pathName?.split('/')[2]}`}>
                            <Button
                                className={`cursor-pointer  text-white px-6 py-6 text-lg rounded-lg font-medium ${!checkText ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}>Back</Button>
                        </Link>
                        <Button
                            onClick={handleUpdate}
                            className={`cursor-pointer  text-white px-6 py-6 text-lg rounded-lg font-medium ${!checkText ? 'bg-[#120eff] hover:bg-[#1f1cb3]' : 'bg-green-500 hover:bg-green-600'}`}>Update post</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
