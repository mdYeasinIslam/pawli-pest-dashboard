"use client"

import type React from "react"

import { useRef, type DragEvent, type ChangeEvent } from "react"
import { Upload, X } from "lucide-react"
import { FileUploadProps } from "@/Types/post"

export function FileUpload({
  onFileSelect,
  onFileRemove,
  uploadedImage,
  dragActive,
  onDragStateChange,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      onDragStateChange(true)
    } else if (e.type === "dragleave") {
      onDragStateChange(false)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
    onDragStateChange(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File): void => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (allowedTypes.includes(file.type)) {
      onFileSelect(file)
    } else {
      alert("Please upload only .jpeg or .png files")
    }
  }

  const onButtonClick = (): void => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    onFileRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div
     className={`h-[70vh] place-content-center  rounded-lg p-8 text-center transition-colors ${
                            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"
                        }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      {uploadedImage ? (
        <div className="relative">
          <img
            src={uploadedImage || "/placeholder.svg"}
            alt="Uploaded preview"
            className="max-w-full max-h-48 mx-auto rounded-lg object-contain"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            type="button"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <p className="text-gray-700 font-medium mb-2">Drag & Drop or choose to upload picture</p>
          <p className="text-gray-700 mb-1">of the day here</p>
          <p className="text-gray-500 text-sm">Supported formats: .jpeg .png</p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        onChange={handleChange}
      />
    </div>
  )
}
