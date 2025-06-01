"use client"

import type React from "react"
import { X, MessageCircle, Bookmark, Share2 } from "lucide-react"

interface StatisticsModalProps {
  isOpen: boolean
  onClose: () => void
  statistics?: {
    comments: number
    saved: number
    shares: number
  }
}

export function StatisticsModal({
  isOpen,
  onClose,
  statistics = { comments: 32, saved: 42, shares: 12 },
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
      className=" fixed inset-0 bg-black/50 flex items-end justify-end  z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="statistics-title"
    >
      <div className=" bg-white rounded-lg p-6 w-80  relative bottom-20 right-10 xl:bottom-20  xl:right-28 2xl:bottom-48 2xl:right-54 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
          aria-label="Close statistics modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Statistics Content */}
        <div className="space-y-4 pt-2">
          <h2 id="statistics-title" className="sr-only">
            Post Statistics
          </h2>

          {/* Comments */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-gray-800 font-medium">{statistics.comments} comments</span>
          </div>

          {/* Saved */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Bookmark className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-gray-800 font-medium">{statistics.saved} saved</span>
          </div>

          {/* Shares */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-gray-800 font-medium">{statistics.shares} shares</span>
          </div>
        </div>
      </div>
    </div>
  )
}
