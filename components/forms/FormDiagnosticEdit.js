import React from 'react';
import { Formik } from 'formik';
import Select from 'react-select';
import { diagnosticoOptions } from './selecDx';

export default function FormDiagnosticEdit ({ initialValues, validationSchema, onSubmit })  {
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
  <h2 className='font-bold my-3'>Editar Diagnóstico</h2>
  
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_diagnostico">
                Fecha de Diagnóstico
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_diagnostico"
                type="date" // Cambiado de datetime-local a date
                placeholder="Fecha de diagnóstico"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.fecha_diagnostico}
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
                    props.setFieldValue('diagnostico_nombre', selectedOption.value)}
                onBlur={props.handleBlur}
                value={diagnosticoOptions.find(option => option.value === props.values.diagnostico_nombre)}
            />
            {props.errors.diagnostico_nombre && (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{props.errors.diagnostico_nombre}</p>
                </div>
            )}
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_resolucion">
                Fecha de resolución del diagnóstico
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_resolucion"
                type="date"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.fecha_resolucion}
            />
        </div>

        { props.touched.fecha_resolucion && props.errors.fecha_resolucion ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{props.errors.fecha_resolucion}</p>
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
                    checked={props.values.diagnostico_tipo === 'Previo'}
                    onChange={() => props.setFieldValue("diagnostico_tipo", "Previo")}
                />
                <span className="ml-2">Previo</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Ingreso"
                    checked={props.values.diagnostico_tipo === 'Ingreso'}
                    onChange={() => props.setFieldValue("diagnostico_tipo", "Ingreso")}
                />
                <span className="ml-2">Ingreso</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Hospitalizacion"
                    checked={props.values.diagnostico_tipo === 'Hospitalizacion'}
                    onChange={() => props.setFieldValue("diagnostico_tipo", "Hospitalizacion")}
                />
                <span className="ml-2">Hospitalización</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_tipo"
                    value="Egreso"
                    checked={props.values.diagnostico_tipo === 'Egreso'}
                    onChange={() => props.setFieldValue("diagnostico_tipo", "Egreso")}
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
                    checked={props.values.diagnostico_activo === true}
                    onChange={() => props.setFieldValue("diagnostico_activo", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="diagnostico_activo"
                    value="false"
                    checked={props.values.diagnostico_activo === false}
                    onChange={() => props.setFieldValue("diagnostico_activo", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>


    <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
      value="Modificar Diagnóstico"
    />

    </form>
    )}
    </Formik>
        );
    };
    