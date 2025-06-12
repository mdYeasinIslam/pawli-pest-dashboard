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
export type AllPostData = {
    id?: string
  content: string
  createdAt: string
  updatedAt?: string
  imageUrl?: string
  published?: boolean
  pushContent?: string
  pushHeader?: string
  scheduledDate?: string
}

export type PendingPost = {
  id: string
  imageUrl: string
  content: string
  pushHeader: string
  pushContent: string
  scheduledDate: string
  published: boolean
  createdAt: string
  updatedAt: string
}
export interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  uploadedImage: string | null
  // dragActive: boolean
  // onDragStateChange: (active: boolean) => void
}