'use client'
import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import type Jodit from 'jodit';

const JoditTextArea = () => {
  const editor = useRef<any | null>(null);
  const [content, setContent] = useState('');

  const insertLink = () => {
    const editorInstance = editor.current;
    if (!editorInstance) return;

    const selectedText = editorInstance.selection?.text || '';
    if (!selectedText) {
      alert('Please select a word to hyperlink.');
      return;
    }

    const url = prompt('Enter URL:', 'https://');
    if (url) {
      editorInstance.selection.insertHTML(`<a href="${url}" target="_blank">${selectedText}</a>`);
      setContent(editorInstance.value); // Update state with the new HTML
    }
  };
console.log(content)
  return (
    <div className='relative' style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flexGrow: 1 }}>
        <JoditEditor
          ref={editor}
          value={content}
          config={{
            readonly: false,
            toolbar: false,
            height: 100,
            minHeight: 50,
            // maxHeight: 50,
          }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <button
        className='absolute top-0 right-0'
        onClick={insertLink}
        style={{
          height: 50,
          width: 50,
          cursor: 'pointer',
          fontSize: '18px',
        //   background: '#f1f1f1',
        //   border: '1px solid #ccc',
          borderRadius: '4px'
        }}
        title="Insert Link"
      >
        🔗
      </button>
    </div>
  );
};

export default JoditTextArea;
