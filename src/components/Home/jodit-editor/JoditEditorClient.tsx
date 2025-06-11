'use client'

import dynamic from 'next/dynamic'

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

export default JoditEditor
