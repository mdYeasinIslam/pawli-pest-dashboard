import React from 'react'
import { Button } from '../ui/button'

type Prop = {
  checkText: boolean;
  linkText: string;
  contentText: string;
  uploadedImage: string | null;
  handleValidate: () => void;
  setShowPreviewModal:  React.Dispatch<React.SetStateAction<boolean>>
  setShowStaticModal:  React.Dispatch<React.SetStateAction<boolean>>
}

const ActionButtons: React.FC<Prop> = ({
  checkText,
  linkText,
  contentText,
  uploadedImage,
  handleValidate,
  setShowPreviewModal,
  setShowStaticModal
}) => {


  return (
    <div className=" flex justify-end space-x-4 my-8 ">
                <Button
                    onClick={handleValidate}
                    className={` text-white px-6 py-6 text-lg rounded-lg font-medium ${!checkText?'bg-[#FF0000] hover:bg-red-600':'bg-green-500 hover:bg-green-600'}`}>{ !checkText?'Validate':'Modify'}</Button>
                <Button
                    //  onClick={() => setShowPreviewModal(true)}
                     onClick={() => setShowPreviewModal(true)}
                    className="bg-[#7030A0] hover:bg-purple-700 text-white px-6 py-6 text-lg rounded-lg font-medium"
                    disabled={ !uploadedImage || !linkText || !contentText ? true : false}      
                    // disabled={!checkText || !uploadedImage || !linkText || !contentText ? true : false}      
              >
                    Preview
                </Button>
                <Button onClick={() => setShowStaticModal(true)} className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-6 text-lg rounded-lg font-medium">
                    Statistics
                </Button>
                <Button onClick={() => setShowStaticModal(true)} className="bg-black  hover:bg-pink-500 text-white px-6 py-6 text-lg rounded-lg font-medium">
                    Schedule Change
                </Button>
                </div>
  )
}

export default ActionButtons