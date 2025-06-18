// LinkEditor.jsx
import React, { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Link2 } from 'lucide-react' // Optional icon package

const ToolTipFeild = () => {
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [url, setUrl] = useState('')
  const [htmlContent, setHtmlContent] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "<p></p>",
    onUpdate({ editor }) {
      setHtmlContent(editor.getHTML()) // Keep track of HTML content
    },
  })

  const setLink = () => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    setUrl(previousUrl || '')
    setShowLinkInput(!showLinkInput)
  }

  const applyLink = () => {
    if (!url) return
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    setShowLinkInput(false)
    setUrl('')
  }
console.log(htmlContent)
  return (
    <div className="w-full relative">
      {/* Toolbar */}
      <div className="flex items-center bg-gray-100 px-2 py-2 border rounded-t-md">
        <button
          onClick={setLink}
          className="p-1 hover:bg-gray-200 rounded"
          title="Insert Link"
        >
          <Link2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Editor */}
      <div className="border border-t-0 rounded-b-md overflow-hidden">
        <EditorContent editor={editor} className="min-h-[100px] "  />
      </div>

      {/* Link Popup */}
      {showLinkInput && (
        <div className="absolute top-10 left-0 bg-white border border-gray-300 shadow-lg p-3 rounded z-10">
          <input
            type="text"
            placeholder="Enter URL"  // Placeholder for the input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border focus:outline-none focus:ring-0 px-2 py-1 rounded w-64 text-gray-500  "
          />
          <div className="mt-2 text-right">
            <button
              onClick={applyLink}
              className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolTipFeild
