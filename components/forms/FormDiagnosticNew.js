import { format } from 'date-fns';
import Select from 'react-select';
import { diagnosticoOptions } from './selecDx';



export default function FormDiagnosticoNew ({ formik }) {
    
  
  return (
    
      <form 
      className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" 
      onSubmit={formik.handleSubmit}
      >
        <h2 className='font-bold my-3'>Agregar Diagnóstico</h2>
        
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_diagnostico">
                Fecha de Diagnóstico
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_diagnostico"
                type="date" // Cambiado de datetime-local a date
                placeholder="Fecha de diagnóstico"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha_diagnostico}
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico_nombre">
                Diagnóstico
            </label>
            <Select
                id="diagnostico_nombre"
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                options={diagnosticoOptions}
                onChange={(selectedOption) => 
                    formik.setFieldValue('diagnostico_nombre', selectedOption.value)}
                onBlur={formik.handleBlur}
                value={diagnosticoOptions.find(option => option.value === formik.values.diagnostico_nombre)}
            />
            {formik.errors.diagnostico_nombre && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.diagnostico_nombre}</p>
                </div>
            )}
        </div>

        { formik.touched.fecha_diagnostico && formik.errors.fecha_diagnostico ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.fecha_diagnostico}</p>
            </div>
        ) : null  } 


        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_resolucion">
                Fecha de resolución del diagnóstico
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_resolucion"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha_resolucion}
            />
        </div>

        { formik.touched.fecha_resolucion && formik.errors.fecha_resolucion ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.fecha_resolucion}</p>
            </div>
        ) : null  }

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Tipo de Diagnóstico
        </label>
        <div id="diagnostico_tipo">
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Previo"
                    checked={formik.values.diagnostico_tipo === 'Previo'}
                    onChange={() => formik.setFieldValue("diagnostico_tipo", "Previo")}
                />
                <span className="ml-2">Previo</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Ingreso"
                    checked={formik.values.diagnostico_tipo === 'Ingreso'}
                    onChange={() => formik.setFieldValue("diagnostico_tipo", "Ingreso")}
                />
                <span className="ml-2">Ingreso</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Hospitalizacion"
                    checked={formik.values.diagnostico_tipo === 'Hospitalizacion'}
                    onChange={() => formik.setFieldValue("diagnostico_tipo", "Hospitalizacion")}
                />
                <span className="ml-2">Hospitalización</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Egreso"
                    checked={formik.values.diagnostico_tipo === 'Egreso'}
                    onChange={() => formik.setFieldValue("diagnostico_tipo", "Egreso")}
                />
                <span className="ml-2">Egreso</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Actualmente se encuentra activo
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_activo"
                    value="true"
                    checked={formik.values.diagnostico_activo === true}
                    onChange={() => formik.setFieldValue("diagnostico_activo", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_activo"
                    value="false"
                    checked={formik.values.diagnostico_activo === false}
                    onChange={() => formik.setFieldValue("diagnostico_activo", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>


   
        <input
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
            value="Agregar Diagnóstico"
        />
    </form>
  )
}
