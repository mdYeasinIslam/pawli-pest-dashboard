import React from 'react'
import { BatteryFull, Bookmark, Info, MessageCircle, Settings, SignalHigh, Wifi, X } from 'lucide-react'

import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import { GrAnnounce } from 'react-icons/gr';
import LoadingSpinner from '@/app/loading';

interface ModalProps {
    selectedFile: File | null;
    uploadedImage: string | null;
    text: string,
    content:string
    setShowPreviewModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectDeviceType: React.Dispatch<React.SetStateAction<string>>
    handleResetAfeterSavePost: () => void;
    device?:string
}

const Modal: React.FC<ModalProps> = ({ selectedFile,uploadedImage,text, content, setShowPreviewModal,handleResetAfeterSavePost,setSelectDeviceType,device}) => {
const [loading, setLoading] = React.useState(false);
  
    // const handlePostContent = async () => {
    //     if (!selectedFile) return;

    //     setLoading(true); //  Start spinner before API call

    //     try {
    //         const formData = new FormData(); // Create a new FormData object to hold the data for the POST request
    //         const data = {
    //         content,
    //         link: text,
    //         status: 'PENDING',
    //         scheduledAt: new Date().toISOString(),
    //         };

    //         formData.append('data', JSON.stringify(data));
    //         formData.append('images', selectedFile);

    //         const res = await fetch('https://paulinefst.onrender.com/api/v1/posts', {
    //         method: 'POST',
    //         body: formData,
    //         });

    //         const resData = await res.json();

    //         if (res.ok) {
    //             toast.success('Post content saved successfully!');
    //             handleResetAfeterSavePost(); // Reset the form after successful post
            
    //         } else {
    //         toast.error(`Error: ${resData.message || 'Unknown error'}`);
    //         }
    //     } catch (error) {
    //         console.error('API error:', error);
    //         toast.error('An unexpected error occurred.');
    //     } finally {
    //         setLoading(false); //  Always stop loading
    //     }
    // };
    return (
        <div className="fixed inset-0 bg-[#180E25]/50 backdrop-blur-sm flex items-center justify-center z-50">
            {/* Modal Container */}
            {
                loading ? (
                    <div className="">
                        <LoadingSpinner />
                    </div>
                ) :
                    (

                    <div className=" rounded-lg shadow-xl max-w-4xl w-full mx-4 overflow-hidden">
                        {/* Modal Header */}
                <div className="bg-black text-white px-6 py-3 flex items-center justify-between">
                             <p></p>
                            <p className=" text-sm font-medium">Post n°1 - Time of publication: 11 AM, July 1st, 2025</p>
                            <button
                                className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                                onClick={() => setSelectDeviceType('')}
                            >
                                <X className="w-4 h-4 text-black" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 ">
                            <div className="flex justify-center space-x-8">
                                {/* First Phone Mockup (Apple) */}
                                {device==='apple' &&
                                 
                                <div className="relative">
                                    <div
                                        className="w-80 h-[650px] bg-black rounded-[2.5rem] p-2"
                                        
                                    >
                                <div className="flex flex-col justify-between w-full h-full bg-white rounded-[2rem] overflow-hidden px-2">
                                    
                                        <div className="space-y-2">
                                            {/* Phone Status Bar */}
                                            <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
                                                <span className="font-medium">9:41</span>
                                                <div className="w-20  h-5 bg-black rounded-full"></div>
                                                <div className="flex space-x-1">
                                                    <div className="  rounded-sm"><SignalHigh className="w-5 h-5 text-black" strokeWidth={3} /></div>
                                                    <div className=" rounded-sm"><Wifi className="w-5 h-5 text-black" strokeWidth={3} /></div>
                                                    <div className=" rounded-sm"> <BatteryFull className="w-5 h-5 text-black" /></div>
                                                </div>
                                            </div>

                                            {/* App Header */}
                                            <div className="bg-white px-4  flex items-center justify-between ">
                                                <div className="w-7 h-7 bg-gray-100 rounded place-content-center place-items-center"><Settings  strokeWidth={2} className="text-black w-5 h-5"/></div>
                                                <span className="font-semibold text-lg  ">Le chiffre du jour</span>
                                                <div className="w-7 h-7 bg-gray-100 rounded  place-content-center place-items-center"><BsFillBookmarkCheckFill  className='w-5 h-5'/></div>
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
                                                {/* <div className="">
                                                    <h4>{text}</h4>
                                                    <p className="text-xs leading-relaxed">
                                                    {content}
                                                    </p>
                                                </div> */}
                                                {/* <div className="absolute bottom-4 right-4">
                                                    <Image
                                                src="/logo-paulin.png" alt="Placeholder" width={500} height={500} className="w-14  h-14 object-cover   rounded-full" />
                                                </div> */}
                                            </div>

                                            {/* Bottom Navigation */}
                                            <div className="bg-white px-4 py-3 flex justify-center space-x-8">
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><Bookmark strokeWidth={2} className='w-5 h-5'/></div>
                                                 <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><GrAnnounce  strokeWidth={2} className='w-5 h-5'/></div>
                                                 <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><MessageCircle strokeWidth={2} className='w-5 h-5'/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        
                                }

                                {/* Second Phone Mockup (android)*/}
                            {
                            device == 'android' && 
                            <div className="relative">
                                <div
                                    className="w-80 h-[650px] bg-black rounded-[2.5rem] p-2"
                                    
                                >
                                    <div className="flex flex-col justify-between w-full h-full bg-white rounded-[2rem] overflow-hidden px-2">
                                    <div className="space-y-2">
                                        {/* Phone Status Bar */}
                                        <div className="bg-white px-4 py-2 flex justify-between items-center text-xs">
                                            <span className="font-medium">9:41</span>
                                            {/* <div className="w-20  h-5 bg-black rounded-full"></div> */}
                                            <div className="flex space-x-1">
                                                <div className="  rounded-sm"><SignalHigh className="w-5 h-5 text-black" strokeWidth={3} /></div>
                                                <div className=" rounded-sm"><Wifi className="w-5 h-5 text-black" strokeWidth={3} /></div>
                                                <div className=" rounded-sm"> <BatteryFull className="w-5 h-5 text-black" /></div>
                                            </div>
                                        </div>

                                        {/* App Header */}
                                        <div className="bg-white px-4  flex items-center justify-between ">
                                            <div className="w-7 h-7 bg-gray-100 rounded place-content-center place-items-center"><Settings  strokeWidth={2} className="text-black w-5 h-5"/></div>
                                            <span className="font-semibold text-lg  ">Le chiffre du jour </span>
                                            <div className="w-7 h-7 bg-gray-100 rounded  place-content-center place-items-center"><BsFillBookmarkCheckFill  className='w-5 h-5'/></div>
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
                                            {/* <div className="">
                                                <h4>{text}</h4>
                                                <p className="text-xs leading-relaxed">
                                                {content}
                                                </p>
                                            </div> */}
                                            {/* <div className="absolute bottom-4 right-4">
                                                <Image
                                            src="/logo-paulin.png" alt="Placeholder" width={500} height={500} className="w-14  h-14 object-cover   rounded-full" />
                                            </div> */}
                                        </div>

                                        {/* Bottom Navigation */}
                                        <div className="bg-white px-4 py-3 flex justify-center space-x-8">
                                            <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><Bookmark strokeWidth={2} className='w-5 h-5'/></div>
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><GrAnnounce  strokeWidth={2} className='w-5 h-5'/></div>
                                                <div className="w-10 h-10 bg-gray-100 rounded  place-content-center place-items-center"><MessageCircle strokeWidth={2} className='w-5 h-5'/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }


                            </div>

                            {/* Modal Action Buttons */}
                            {/* <div className="flex justify-end space-x-4 ">
                        <Button
                            onClick={handlePostContent}
                            className="bg-black hover:bg-gray-700 text-white mt-3 px-6 py-4 rounded-lg font-medium">
                                    Save post
                                </Button>
                            </div> */}
                        </div>
                    </div>
                    )
            }
                </div>
    )
}

export default Modal

 