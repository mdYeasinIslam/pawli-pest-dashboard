"use client"

import { useState } from "react"
import { ChevronLeft, MoreHorizontal, Edit2, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

// Fake data for the pending posts
const pendingPosts = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    publishDate: "ven. 23 mai à 01h30",
    year: "2024",
    company: "Danone",
    description: "a utilisé pour le packaging de ses produits.",
    avatar: "/placeholder.svg?height=40&width=40",
  }))

export default function PendingPosts() {
  const param = usePathname()
  // console.log(param.split('/'))
  const pageName =param.split('/')
  const [posts] = useState(pendingPosts)
  const [openModal, setOpenModal] = useState<number | null>(null)

  const handleModifyPost = (postId: number) => {
    // console.log("Modify post:", postId)
    setOpenModal(null)
  }

  const handleDeletePost = (postId: number) => {
    // console.log("Delete post:", postId)
    setOpenModal(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link href={'/'}>
                <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
                </Button>
        </Link>
        <h1 className="text-xl font-medium">{pageName}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 rounded-md">
                  <img src={post.avatar || "/placeholder.svg"} alt="Avatar" className="object-cover" />
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Publier le {post.publishDate}</p>
                  <p className="text-sm text-gray-600">
                    En {post.year}, {post.company} {post.description}
                  </p>
                </div>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setOpenModal(openModal === post.id ? null : post.id)}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>

                {openModal === post.id && (
                  <div className="absolute right-0 top-10 z-50 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="flex justify-end px-2 pb-2">
                      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOpenModal(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => handleModifyPost(post.id)}
                    >
                      <Edit2 className="h-4 w-4 mr-3" />
                      Modify post
                    </button>

                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-3" />
                      Delete post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Overlay to close modal when clicking outside */}
      {openModal && <div className="fixed inset-0 z-40" onClick={() => setOpenModal(null)} />}
    </div>
  )
}
