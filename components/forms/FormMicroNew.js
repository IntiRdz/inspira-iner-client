import React from 'react'
import { utcToZonedTime } from 'date-fns-tz'; 
import Select from 'react-select';
import { microorganismoOptions } from './selecMicro';

const timeZone = 'America/Mexico_City'; // Definir la zona horaria

export default function FormMicroNew ({ formik }) {

    microorganismoOptions
  
  return (
    
    <form 
      className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
      onSubmit={formik.handleSubmit}
      >
        <h2 className='font-bold my-3'>Asignar Nuevo Microorganismo</h2>
        
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_deteccion">
                Fecha de detección
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_deteccion"
                type="date" // Cambiado de datetime-local a date
                placeholder="Fecha de detección del Microorganismo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha_deteccion}
            />
        </div>

        { formik.touched.fecha_deteccion && formik.errors.fecha_deteccion ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.fecha_deteccion}</p>
            </div>
        ) : null  } 

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metodo_deteccion">
                Método de Detección
            </label>
            <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="metodo_deteccion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.metodo_deteccion}
            >
                <option value="" label="Seleccione una opción" />
                <option value="PCR" label="PCR" />
                <option value="Panel_Neummonia" label="Panel de Neumonía" />
                <option value="Cultivo" label="Cultivo" />                            
            </select>
        </div>

        { formik.touched.metodo_deteccion && formik.errors.metodo_deteccion ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.metodo_deteccion}</p>
            </div>
        ) : null  }

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="microorganismo_tipo">
                Tipo de Microorganismo
            </label>
            <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="microorganismo_tipo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.microorganismo_tipo}
            >
                <option value="" label="Seleccione una opción" />
                <option value="Virus" label="Virus" />
                <option value="Bacteria" label="Bacteria" />
                <option value="Micobacteria" label="Micobacteria" />
                <option value="Hongo" label="Hongo" />                             
            </select>
        </div>

        { formik.touched.microorganismo_tipo && formik.errors.microorganismo_tipo ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.microorganismo_tipo}</p>
            </div>
        ) : null  }





    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="microorganismo_nombre">
            Microorganismo
        </label>
        <Select
            id="microorganismo_nombre"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            options={microorganismoOptions}
            onChange={(selectedOption) => 
                formik.setFieldValue('microorganismo_nombre', selectedOption.value)}
            onBlur={formik.handleBlur}
            value={microorganismoOptions.find(option => option.value === formik.values.microorganismo_nombre)}
        />
        {formik.errors.microorganismo_nombre && (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.microorganismo_nombre}</p>
            </div>
        )}
    </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="susceptibilidad">
                Susceptibilidad
            </label>
            <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="susceptibilidad"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.susceptibilidad}
            >
                <option value="" label="Seleccione una opción" />
                <option value="No_Aplica" label="No Aplica" />
                <option value="Sensible" label="Sensible" />
                <option value="BLEE" label="BLEE" />
                <option value="MDR" label="MDR" />
                <option value="XDR" label="XDR" />
            </select>
        </div>

        { formik.touched.susceptibilidad && formik.errors.susceptibilidad ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.susceptibilidad}</p>
            </div>
        ) : null  }

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comentario_uveh">
                Comentario UVEH
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="comentario_uveh"
                type="text"
                placeholder="Comentario UVEH"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comentario_uveh}
            />
        </div>

        { formik.touched.comentario_uveh && formik.errors.comentario_uveh ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.comentario_uveh}</p>
            </div>
        ) : null  }

        {/* <AsignarCamaTodas />  */}     
        <input
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
            value="Agregar Microorganismo"
        />
    </form>
  )
}
