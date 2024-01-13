import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import { microorganismoOptions } from './selecMicro';

export default function  FormMicroEdit  ({ initialValues, validationSchema, onSubmit })  {

    /* microorganismoOptions */

    //console.log("valores inciales del form", initialValues)
   
    return (
   
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
{(props) => (

<form 
    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
    onSubmit={props.handleSubmit}
>
  <h2 className='font-bold my-3'>Editar Microorganismo</h2>
  
  <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_deteccion">
          Fecha de detección
      </label>

      <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fecha_deteccion"
          type="date" // Cambiado de datetime-local a date
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.fecha_deteccion}
      />
  </div>

  { props.touched.fecha_deteccion && props.errors.fecha_deteccion ? (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
          <p className="font-bold">Error</p>
          <p>{props.errors.fecha_deteccion}</p>
      </div>
  ) : null  } 

  <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metodo_deteccion">
          Método de Detección
      </label>
      <select 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="metodo_deteccion"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.metodo_deteccion}
      >
          <option value="" label="Seleccione una opción" />
          <option value="PCR" label="PCR" />
          <option value="Panel_Neummonia" label="Panel de Neumonía" />
          <option value="Cultivo" label="Cultivo" />                            
      </select>
  </div>

  { props.touched.metodo_deteccion && props.errors.metodo_deteccion ? (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
          <p className="font-bold">Error</p>
          <p>{props.errors.metodo_deteccion}</p>
      </div>
  ) : null  }

  <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="microorganismo_tipo">
          Tipo de Microorganismo
      </label>
      <select 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="microorganismo_tipo"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.microorganismo_tipo}
      >
          <option value="" label="Seleccione una opción" />
          <option value="Virus" label="Virus" />
          <option value="Bacteria" label="Bacteria" />
          <option value="Micobacteria" label="Micobacteria" />
          <option value="Hongo" label="Hongo" />                             
      </select>
  </div>

  { props.touched.microorganismo_tipo && props.errors.microorganismo_tipo ? (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
          <p className="font-bold">Error</p>
          <p>{props.errors.microorganismo_tipo}</p>
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
                props.setFieldValue('microorganismo_nombre', selectedOption.value)}
            onBlur={props.handleBlur}
            value={microorganismoOptions.find(option => option.value === props.values.microorganismo_nombre)}
        />
        {props.errors.microorganismo_nombre && (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{props.errors.microorganismo_nombre}</p>
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
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.susceptibilidad}
      >
          <option value="" label="Seleccione una opción" />
          <option value="No_Aplica" label="No Aplica" />
          <option value="Sensible" label="Sensible" />
          <option value="BLEE" label="BLEE" />
          <option value="MDR" label="MDR" />
          <option value="XDR" label="XDR" />
      </select>
  </div>

  { props.touched.susceptibilidad && props.errors.susceptibilidad ? (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
          <p className="font-bold">Error</p>
          <p>{props.errors.susceptibilidad}</p>
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
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.comentario_uveh}
      />
  </div>

  { props.touched.comentario_uveh && props.errors.comentario_uveh ? (
      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
          <p className="font-bold">Error</p>
          <p>{props.errors.comentario_uveh}</p>
      </div>
  ) : null  }
 
  <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
      value="Modificar Microorganismo"
  />

</form>


    )}
</Formik>
    );
};
