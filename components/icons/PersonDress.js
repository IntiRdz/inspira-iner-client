import React from 'react'

export const PersonDress = (
  { 
    color = '#1E3050', // Color por defecto Cando quiera usarlo es color en lugar de fill
    /* color = '#1E3050',  original Fontawosome */
    width = '10',
    height = '16',
    className = 'person-dress',
    style = {}
  }
) => {
  return (
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="edit"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        width={width}
        height={height}
        className={className}
        style={{ ...style, fill: color }} // Aplica el color aquí
    >
    <path 
        opacity="1" 
        d="M160 0a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM88 384H70.2c-10.9 0-18.6-10.7-15.2-21.1L93.3 248.1 59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l53.6-89.2c20.3-33.7 56.7-54.3 96-54.3h11.6c39.3 0 75.7 20.6 96 54.3l53.6 89.2c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9l-33.9-56.3L265 362.9c3.5 10.4-4.3 21.1-15.2 21.1H232v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384H152v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
        >
    </path>
    </svg>
  );
};