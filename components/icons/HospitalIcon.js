import React from 'react'

export const HospitalIcon = ({
    color = '#808080', // Color por defecto
    width = '24',
    height = '24',
    className = '',
    style = {}
}) => {
  return ( 
    <svg 
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="hospitalIcon"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={width}
        height={height}
        className={className}
        style={{ ...style, fill: color }}
    >
    <path 
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM368 152V256 360c0 13.3-10.7 24-24 24s-24-10.7-24-24V280H192l0 80c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-208c0-13.3 10.7-24 24-24s24 10.7 24 24v80H320V152c0-13.3 10.7-24 24-24s24 10.7 24 24z"
    />
    </svg>
  )
}
