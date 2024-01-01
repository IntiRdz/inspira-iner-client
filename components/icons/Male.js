import React from 'react';

export const Male = (
  {
    color = '#1E3050', // Color por defecto
    width = '1rem',   // Valor por defecto cambiado a una unidad relativa
    height = '1rem',
    className = '',
    style = {},
    opacity = '1'
  }
) => {
  return (
    <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="male"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        width={width}
        height={height}
        className={className}
        style={{ ...style, fill: color }} // Aplica el color aquí
    >
    <path
        opacity={opacity}
        d="M112 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V256.9L59.4 304.5c-9.1 15.1-28.8 20-43.9 10.9s-20-28.8-10.9-43.9l58.3-97c17.4-28.9 48.6-46.6 82.3-46.6h29.7c33.7 0 64.9 17.7 82.3 46.6l58.3 97c9.1 15.1 4.2 34.8-10.9 43.9s-34.8 4.2-43.9-10.9L232 256.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V352H152z"
    >
    </path>
    </svg>
  );
};

//<Female opacity="0.5" />
//<Female width="5vw" /> // 5% del ancho de la ventana
//<Female width="0.5em" height="0.5em" /> // 0.5em del tamaño de la fuente
