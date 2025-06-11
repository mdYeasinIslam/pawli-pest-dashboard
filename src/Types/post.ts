export interface PostData {
  id?: string
  tooltipContent: string
  pushHeader: string
  pushText: string
  dailyNumber: string
  rightTextArea: string
  image?: File | null
  imagePreview?: string | null
  publishTime: string
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  uploadedImage: string | null
  // dragActive: boolean
  // onDragStateChange: (active: boolean) => void
}