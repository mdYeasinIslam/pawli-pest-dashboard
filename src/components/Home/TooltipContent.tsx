'use client'
import React, { useRef } from 'react'
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
   /* Hide the 'Class name' field in the link dialog */
  .jodit-dialog .input[name='className'] {
    display: none;
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

type Prop = {
    linkText: string,
    setLinkText: React.Dispatch<React.SetStateAction<string>>
}

const TooltipContent = ({ linkText, setLinkText }: Prop) => {
    
      const editor = useRef(null)
const customLinkDialog = (editor:any) => {
    const dialog = editor.createDialog();
    const linkDialogHtml = `
      <div>
        <label for="url">URL</label>
        <input id="url" class="input" type="text" value="" placeholder="Enter URL">
        <label for="text">Text</label>
        <input id="text" class="input" type="text" value="" placeholder="Enter text">
      </div>
    `;

    dialog.setContent(linkDialogHtml);
    const insertBtn = document.createElement('button');
    insertBtn.innerText = 'Insert';
    insertBtn.onclick = () => {
      const url = dialog.querySelector('#url').value;
      const text = dialog.querySelector('#text').value;
      editor.selection.insertHTML(`<a href="${url}" target="_blank">${text}</a>`);
      editor.closeDialog();
    };
    dialog.appendChild(insertBtn);
  };
  const config = {
        readonly: false,
        placeholder: "Write here...",
        height:120,
        minHeight: 100,
        toolbar: true, // showing link icon
        buttons: ["link"],
        buttonsMD: ["link"],
        buttonsSM: ["link"],
        buttonsXS: ["link"],
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        // defaultActionOnPaste: InsertMode.INSERT_CLEAR_HTML, // or just remove
        cleanHTML: {
            timeout: 300,
        },
        link: {
            // followOnDblClick: false,
            processVideoLink: false,
            processPastedLink: true,
            openInNewTabCheckbox: false,
            noFollowCheckbox: false,
            modeClassName: "input" as "input",
            customLinkDialog: customLinkDialog
        },
        extraCSS: linkStyles,
        iframe: false,
        iframeStyle: linkStyles,
}
  return (
    <div className="">
        <div className="relative">
        <Label className=" text-[28px] font-semibold font-urbanist">Tooltip content</Label>
              <style dangerouslySetInnerHTML={{ __html: linkStyles }} />

              <div className=' ' style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>
                    <JoditEditor
                            ref={editor}
                            value={linkText}
                            config={config}
                            tabIndex={1}
                             onBlur={(newContent) => setLinkText(newContent)}
                            onChange={(newContent) =>setLinkText(newContent)}
                        />

                  </div>
              </div>
            <div className="absolute top-3 right-3 flex gap-2">
            {/* <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                <Link className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                <Type className="h-4 w-4" />
            </Button> */}
            </div>
        </div>
    </div>
  )
}

export default TooltipContent