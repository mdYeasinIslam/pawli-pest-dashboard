"use client"

import { X, MessageCircle, Bookmark, Share2 } from "lucide-react"

interface StatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  statistics?: {
    comments?: number
    saved?: number
    shares?: number
  }
  appleView?: string
  androidView?: string
  setSelectDeviceType?: React.Dispatch<React.SetStateAction<string>>
  selectDeviceType?: string | undefined
}

export function StatisticsModal({
  isOpen,
  onClose,
  statistics = { comments: 32, saved: 42, shares: 12 },
  appleView,
  androidView,
  setSelectDeviceType,
  selectDeviceType
}: StatisticsModalProps) {
  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-end justify-end z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
    >
      <div className=" bg-white rounded-lg px-3 py-3 xl:px-6 w-80 relative bottom-24 right-[8%] xl:bottom-20 xl:right-[10%] 2xl:bottom-[17%] 2xl:right-[12%] shadow-xl">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
          aria-label="Close statistics modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4 mt-2">
          <h2 id="statistics-title" className="sr-only">
            Post Statistics
          </h2>

          {appleView ? (
            <div
              onClick={() => setSelectDeviceType && setSelectDeviceType("apple")}
              className="hover:bg-gray-300 py-2 px-2 rounded-md"
            >
              <button className="text-gray-800 font-medium">{appleView}</button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-800 font-medium">{statistics.comments} comments</span>
            </div>
          )}

          {androidView ? (
            <div
              onClick={() => setSelectDeviceType && setSelectDeviceType("android")}
              className="hover:bg-gray-300 py-2 px-2 rounded-md"
            >
              <button className="text-gray-800 font-medium">{androidView}</button>
            </div>
          ) : (
            <div className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-800 font-medium">{statistics.saved} saved</span>
            </div>
          )}

          {!appleView && !androidView && (
            <div className="flex items-center gap-3 py-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-gray-800 font-medium">{statistics.shares} shares</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
