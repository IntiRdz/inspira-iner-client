import React from 'react'

export const FileMedical = ( { fill, width, height } ) => {
    return (
        <div className='ico-system'>
            <svg 
                aria-hidden="true" 
                focusable="false" 
                data-prefix="fas" 
                data-icon="file-medical" 
                class="svg-inline--fa fa-file-medical fa-w-12" 
                role="img" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 384 512"
                width= {width}
                height= {height}
            >
            <path 
                fill= { fill }
                d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 160v48c0 4.4-3.6 8-8 8h-56v56c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-56h-56c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h56v-56c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v56h56c4.4 0 8 3.6 8 8z"
            >
            </path>
            </svg>
        </div>
    )
}
