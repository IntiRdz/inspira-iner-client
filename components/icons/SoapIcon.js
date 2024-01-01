import React from 'react';

export const SoapIcon = (
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
        viewBox="0 0 521 512"
        width={width}
        height={height}
        className={className}
        style={{ ...style, fill: color, opacity: opacity }}
    >
    <path
        opacity={opacity}
        d="M208 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM320 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zM416 32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0 160c0 27.6-11.7 52.5-30.4 70.1C422.1 275.7 448 310.8 448 352c0 53-43 96-96 96H160c-53 0-96-43-96-96s43-96 96-96h88.4c-15.2-17-24.4-39.4-24.4-64H96c-53 0-96 43-96 96V416c0 53 43 96 96 96H416c53 0 96-43 96-96V288c0-53-43-96-96-96zM160 288c-35.3 0-64 28.7-64 64s28.7 64 64 64H352c35.3 0 64-28.7 64-64s-28.7-64-64-64H320 160z"
    >
    </path>
    </svg>
  );
};

//<Female opacity="0.5" />
//<Female width="5vw" /> // 5% del ancho de la ventana
//<Female width="0.5em" height="0.5em" /> // 0.5em del tamaño de la fuente
