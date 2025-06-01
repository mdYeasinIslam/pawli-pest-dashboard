import React from 'react'
import { Button } from '../ui/button'
import { BatteryFull, Bookmark, BookmarkCheck, Info, Megaphone, MessageCircle, Settings, SignalHigh, Wifi, X } from 'lucide-react'
import Image from 'next/image';
import { toast } from 'sonner';

interface ModalProps {
    uploadedImage: string | null;
    text: string,
    content:string
    setShowPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ uploadedImage,text, content, setShowPreviewModal }) => {
    
    const handlePostContent =  () => {
        // const postContent = {
        //     content,
        //     link: text,
        //     status:'CURRENT'
        // };
         fetch('https://paulinefst.onrender.com/api/v1/posts', {
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
            content,
            link: text,
            status:'CURRENT'
        })
         }).then((response) => response.json())
             .then((data) => {
                 console.log('Post content saved successfully:', data);
                 // setShowPreviewModal(false);
                 // Optionally, you can show a success message or perform other actions  
                 if (data && data.success) {
                     toast.success('Post content saved successfully!');
                 }
        }
        )
        .catch((error) => {
            console.error('Error saving post content:', error);
        });

    }
    return (
         <div className="fixed inset-0 bg-[#180E25]/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className=" rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
                            <span className="text-sm font-medium">Post n°1 - Time of publication: 11 AM, July 1st, 2025</span>
                            <button
                                className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                onClick={() => setShowPreviewModal(false)}
                            >
                                <X className="w-4 h-4 text-black" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 ">
                            <div className="flex justify-center space-x-8">
                                {/* First Phone Mockup */}
                                <div className="relative">
                                    <div
                                        className="w-80 h-[550px] bg-black rounded-[2.5rem] p-2"
                                        
                                    >
                                        <div className="flex flex-col justify-between w-full h-full bg-white rounded-[2rem] overflow-hidden px-2">
                                        <div className="space-y-2">
                                            {/* Phone Status Bar */}
                                            <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
                                                <span className="font-medium">9:41</span>
                                                {/* <div className="w-20  h-5 bg-black rounded-full"></div> */}
                                                <div className="flex space-x-1">
                                                    <div className="  rounded-sm"><SignalHigh className="w-5 h-5 text-black" strokeWidth={4} /></div>
                                                    <div className=" rounded-sm"><Wifi className="w-5 h-5 text-black" strokeWidth={3} /></div>
                                                    <div className=" rounded-sm"> <BatteryFull className="w-5 h-5 text-black" /></div>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="bg-white px-4  flex items-center justify-between ">
                                                <div className="w-10 h-10 bg-gray-100 rounded place-content-center place-items-center"><Settings className="text-black"/></div>
                                                <span className="font-semibold text-lg  ">Le chiffre du jour</span>
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><BookmarkCheck strokeWidth={3} /></div>
                                            </div>
                                        </div>

                                            {/* Content Area */}
                                            <div 
                                            
                                            className=" bg-black text-white p-4 h-[60%] place-content-center relative rounded-md"
                                             style={
                                            uploadedImage
                                                ? {
                                                    backgroundImage: `url(${uploadedImage})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }
                                                : {
                                                    backgroundColor: '#f0f0f0'
                                                }
                                        }
                                            >
                                                <div className="absolute top-4 right-4">
                                                    <div className=" flex items-center justify-center"><Info strokeWidth={3} />
                                                       
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <h4>{text}</h4>
                                                    <p className="text-xs leading-relaxed">
                                                    {content}
                                                    </p>
                                                </div>
                                                <div className="absolute bottom-4 right-4">
                                                    <Image
                                                src="/logo-paulin.png" alt="Placeholder" width={500} height={500} className="w-14  h-14 object-cover   rounded-full" />
                                                </div>
                                            </div>

                                            {/* Bottom Navigation */}
                                            <div className="bg-white px-4 py-3 flex justify-center space-x-8">
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><Bookmark strokeWidth={3} /></div>
                                                 <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><Megaphone strokeWidth={3} /></div>
                                                 <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><MessageCircle strokeWidth={3} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Second Phone Mockup */}
                                   <div className="relative">
                                    <div className="w-80 h-[550px] bg-black rounded-[2.5rem] p-2">
                                        <div className="flex flex-col justify-between w-full h-full bg-white rounded-[2rem] overflow-hidden px-2">
                                        <div className="space-y-2">
                                            {/* Phone Status Bar */}
                                            <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
                                                <span className="font-medium">9:41</span>
                                                {/* <div className="w-20  h-5 bg-black rounded-full"></div> */}
                                                <div className="flex space-x-1">
                                                    <div className="  rounded-sm"><SignalHigh className="w-5 h-5 text-black" strokeWidth={4} /></div>
                                                    <div className=" rounded-sm"><Wifi className="w-5 h-5 text-black" strokeWidth={3} /></div>
                                                    <div className=" rounded-sm"> <BatteryFull className="w-5 h-5 text-black" /></div>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="bg-white px-4  flex items-center justify-between ">
                                                <div className="w-10 h-10 bg-gray-100 rounded place-content-center place-items-center"><Settings className="text-black"/></div>
                                                <span className="font-semibold text-lg  ">Le chiffre du jour</span>
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><BookmarkCheck strokeWidth={3} /></div>
                                            </div>
                                        </div>

                                            {/* Content Area */}
                                            <div className=" bg-black text-white p-4 h-[60%] place-content-center relative rounded-md">
                                                <div className="absolute top-4 right-4">
                                                    <div className=" flex items-center justify-center"><Info strokeWidth={3} />
                                                       
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <h4>{text}</h4>
                                                    <p className="text-xs leading-relaxed">
                                                    {content}
                                                    </p>
                                                </div>
                                                <div className="absolute bottom-4 right-4">
                                                    {/* <span className="text-xs">@Hiciel</span> */}
                                            <Image
                                                src="/logo-paulin.png" alt="Placeholder" width={500} height={500} className="w-14  h-14 object-cover   rounded-full" />
                                                </div>
                                            </div>

                                            {/* Bottom Navigation */}
                                            <div className="bg-white px-4 py-3 flex justify-center space-x-8">
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><Bookmark strokeWidth={3} /></div>
                                                 <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><Megaphone strokeWidth={3} /></div>
                                                 <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><MessageCircle strokeWidth={3} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            {/* Modal Action Buttons */}
                            <div className="flex justify-end space-x-4 ">
                        <Button
                            onClick={handlePostContent}
                            className="bg-black hover:bg-gray-700 text-white mt-3 px-6 py-4 rounded-lg font-medium">
                                    Save post
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Modal