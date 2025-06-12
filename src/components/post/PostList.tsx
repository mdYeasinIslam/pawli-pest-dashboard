"use client"

import { useState } from "react"
import { MoreHorizontal, Edit2, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { AllPostData } from "@/Types/post"
import { useDeletePostMutation, useGetAllPostQuery } from "@/redux/services/Api/post/postApi"
import { toast } from "sonner"
import { BaseQueryFn, QueryActionCreatorResult, QueryDefinition } from "@reduxjs/toolkit/query"

type Prop = {
  allPost?:AllPostData[]
  refetch: () => void
}

export default function PendingPosts({ allPost ,refetch}:Prop) {
  const [deletePost] = useDeletePostMutation()
  // const { refetch } = useGetAllPostQuery();
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [editPost,setEditPost] = useState<AllPostData | []>([])
  // const [deletPost,setDeletePost] = useState<string | null>(null)

  const handleModifyPost = (post: AllPostData) => {
    setEditPost(post)
  }

  const handleDeletePost = async(postId: string) => {
    // setDeletePost(postId)
    const res = await deletePost(postId);
    console.log(res)
    if(res?.data?.message =='Post deleted'){
      toast.success(res?.data?.message + ' successfully')
      // TODO: Trigger a refresh of posts here if needed
      refetch()
      setOpenModal(openModal === String(postId) ? null : String(postId))
    }
  }
// console.log(editPost, deletPost)
  return (
    <div className="w-full max-w-6xl mx-auto px-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(allPost ?? []).map((post) => (
          <Card key={post.id} className="p-4 bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10 rounded-md">
                  <img src={post.imageUrl || "/placeholder.svg"} alt="Avatar" className="object-cover" />
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    Publier le : {post?.scheduledDate?.split('T')[0]}
                  </p>
                  <div className="text-sm text-gray-600">
                    {/* En {post?.content} */}
                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: post?.content || "" }}
                      />
                  </div>
                </div>
              </div>

              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setOpenModal(openModal === String(post?.id) ? null : String(post?.id))}
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
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                      onClick={() => post.id && handleModifyPost(post)}
                      disabled={!post.id}
                    >
                      <Edit2 className="h-4 w-4 mr-3" />
                      Modify post
                    </button>

                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-300  "
                      onClick={() => post.id && handleDeletePost(post.id)}
                      disabled={!post.id}
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
