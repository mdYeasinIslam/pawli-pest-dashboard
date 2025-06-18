import { useState } from 'react';

const TextEditor = () => {
  const [text, setText] = useState(''); // State to store the paragraph
  const [link, setLink] = useState(''); // State to store the link URL
  const [isLinking, setIsLinking] = useState(false); // State to track whether the link icon has been clicked

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value); // Update text when the user types
  };

  const handleAddLink = () => {
    // Get the selected text from the paragraph
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString() : '';

    if (selectedText && link) {
      // Add the link to the selected word and style it
      const updatedText = text.replace(
        selectedText,
        `<a href="${link}" style="color: blue; text-decoration: underline;">${selectedText}</a>`
      );
      setText(updatedText); // Update the paragraph with the link and style
      setLink(''); // Clear the link input field
      setIsLinking(false); // Reset linking state
    }
  };

  const handleLinkIconClick = () => {
    setIsLinking(true); // Show the link input when the link icon is clicked
  };
   
  return (
    <div>
      <h2>Text Editor</h2>
      <div className=''>
        <textarea
        onChange={handleChange}
        
        placeholder="Write your paragraph here..."
        className='border w-full min-h-20 p-2'
      />
      </div>
      <br />
      <button onClick={handleLinkIconClick}>🔗 Add Link</button>
      {isLinking && (
        <div className=''>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Enter link URL"
          />
          <button onClick={handleAddLink}>OK</button>
        </div>
      )}
      <div>
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </div>
  );
};

export default TextEditor;
