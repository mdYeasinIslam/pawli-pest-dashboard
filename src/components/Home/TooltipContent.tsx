import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Label } from '../ui/label'
import JoditEditor from './jodit-editor/JoditEditorClient'

const linkStyles = `
  .jodit-wysiwyg a,
  .jodit-container a {
    color: #2563eb !important;
    font-weight:bold;
    text-decoration: underline !important;
  }
  
  .jodit-wysiwyg a:hover,
  .jodit-container a:hover {
    color: #1d4ed8 !important;
    text-decoration: underline !important;
  }
  .jodit-wysiwyg {
    overflow-y: scroll;
  }
  /* Preview area link styles */
  .preview-content a {
    color: #2563eb;
    text-decoration: underline;
  }
  
  .preview-content a:hover {
    color: #1d4ed8;
  }
`

// Add this debounce utility function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

type Prop = {
  linkText: string,
  setLinkText: React.Dispatch<React.SetStateAction<string>>
}

const TooltipContent = ({ linkText, setLinkText }: Prop) => {
  const editor = useRef(null)
  const [localContent, setLocalContent] = useState(linkText)
  
  // Debounced update to parent state
  const debouncedUpdate = useCallback(
    debounce((content: string) => {
      setLinkText(content)
    }, 300),
    [setLinkText],
  )

  const handleEditorChange = useCallback(
    (newContent: string) => {
      setLocalContent(newContent)
      debouncedUpdate(newContent)
    },
    [debouncedUpdate],
  )

  const handleEditorBlur = useCallback(
    (newContent: string) => {
      setLocalContent(newContent)
      setLinkText(newContent)
    },
    [setLinkText],
  )

  // Sync with parent when linkText changes externally
  useEffect(() => {
    if (linkText !== localContent) {
      setLocalContent(linkText)
    }
  }, [linkText])

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      height: 120,
      minHeight: 100,
      toolbar: true,
      buttons: ["link"],
      buttonsMD: ["link"],
      buttonsSM: ["link"],
      buttonsXS: ["link"],
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      askBeforePasteHTML: false,
      askBeforePasteFromWord: false,
      cleanHTML: {
        timeout: 300,
      },
      link: {
        followOnDblClick: false,
        processVideoLink: false,
        processPastedLink: true,
        openInNewTabCheckbox: false,
        noFollowCheckbox: false,
      },
      extraCSS: linkStyles,
      iframe: false,
      iframeStyle: linkStyles,
    }),
    [linkStyles],
  )

  return (
    <div>
      <div className="relative">
        <Label className="text-[28px] font-semibold font-urbanist">Tooltip content</Label>
        <style dangerouslySetInnerHTML={{ __html: linkStyles }} />
        <div className="flex-grow">
          <JoditEditor
            ref={editor}
            value={localContent} // Only for syncing state
            config={config}
            tabIndex={1}
            onBlur={handleEditorBlur}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TooltipContent
