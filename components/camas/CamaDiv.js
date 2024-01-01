import React from 'react'

export const CamaDiv = ({
    camaLado,
    camaNumero,
    camaPrioridad,
    camaOcupada,
    camaGenero,
    camaDispositivoO2,
    camaHemodialisis,
    camaCodigoUveh,
    camaAislamiento,
    camaDan,

    servicioTratante,
    pacienteGenero,
    pacCaracteristicas,
    pacDispositivoO2,
    pacExpediente,
    pacNombre,
    pacApellidoPaterno,
    pacApellidoMaterno,
    pacEdad,
    pacFN,
    fechaIngreso,
    deh,
    fechaPrealta,
    diagnostico,
    diagnostico1,
    microorganismo,

  }) => {

    
  return (
    <div className={`w-full bg-white p-1 border border-gray-300 shadow-lg rounded-lg ${camaLado === 'arriba' ? 'mt-2 border-red-300' : camaLado === 'bajo' ? 'mb-2 border-red-300' : 'm-0'}`}>
        <div className="grid grid-cols-2 gap-2">
            <div className="grid grid-cols-10 gap-0">
            {/* Cama */}
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaNumero}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaPrioridad}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaOcupada}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaGenero}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaDispositivoO2}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaHemodialisis}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaCodigoUveh}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaAislamiento}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{camaDan}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">Editar</div>
            </div>
            <div className="grid grid-cols-10 gap-2">
            {/* Paciente*/}
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{servicioTratante}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacienteGenero}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacCaracteristicas}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacDispositivoO2}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacExpediente}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacNombre}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacApellidoPaterno}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacApellidoMaterno}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{pacEdad}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{fechaIngreso}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{deh}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{fechaPrealta}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{diagnostico}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{diagnostico1}</div>
                <div className="min-w-min col-span-1 border-r-2 flex items-center pl-1 py-2">{microorganismo}</div>
            </div>
    </div>
  </div>
  )
}
