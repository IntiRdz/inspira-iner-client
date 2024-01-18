import React from 'react';
import { Formik } from 'formik';

export default function FormProgramaIntegralEdit ({ initialValues, validationSchema, onSubmit })  {
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
  <h2 className='font-bold my-3'>Editar Programa Integral Paliativos</h2>
  

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Pregunta sorpresa. ¿Se sorprendería si esta persona muriese a lo largo del año siguiente?  
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_sorpresa"
                    value="true"
                    checked={props.values.programa_paliativos_sorpresa === true}
                    onChange={() => props.setFieldValue("programa_paliativos_sorpresa", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_sorpresa"
                    value="false"
                    checked={props.values.programa_paliativos_sorpresa === false}
                    onChange={() => props.setFieldValue("programa_paliativos_sorpresa", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>





        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            2.     Pérdida funcionalidad. Impresión clínica de deterioro funcional sostenido severo, progresivo e irreversible y/o perdida mayor al 30% de Índice de Barthel en 6 meses 
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_perdida_funcionalidad"
                    value="true"
                    checked={props.values.programa_paliativos_perdida_funcionalidad === true}
                    onChange={() => props.setFieldValue("programa_paliativos_perdida_funcionalidad", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_perdida_funcionalidad"
                    value="false"
                    checked={props.values.programa_paliativos_perdida_funcionalidad === false}
                    onChange={() => props.setFieldValue("programa_paliativos_perdida_funcionalidad", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Nutricional
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_perdida_nutricional"
                    value="true"
                    checked={props.values.programa_paliativos_perdida_nutricional === true}
                    onChange={() => props.setFieldValue("programa_paliativos_perdida_nutricional", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_perdida_nutricional"
                    value="false"
                    checked={props.values.programa_paliativos_perdida_nutricional === false}
                    onChange={() => props.setFieldValue("programa_paliativos_perdida_nutricional", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Multimorbilidad
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_multimorbilidad"
                    value="true"
                    checked={props.values.programa_paliativos_multimorbilidad === true}
                    onChange={() => props.setFieldValue("programa_paliativos_multimorbilidad", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_multimorbilidad"
                    value="false"
                    checked={props.values.programa_paliativos_multimorbilidad === false}
                    onChange={() => props.setFieldValue("programa_paliativos_multimorbilidad", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Recursos o ingresos
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_recursosOingresos"
                    value="true"
                    checked={props.values.programa_paliativos_recursosOingresos === true}
                    onChange={() => props.setFieldValue("programa_paliativos_recursosOingresos", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_recursosOingresos"
                    value="false"
                    checked={props.values.programa_paliativos_recursosOingresos === false}
                    onChange={() => props.setFieldValue("programa_paliativos_recursosOingresos", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
             Otra enfermedad Avanzada
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_otraEnfermedaAvanzada"
                    value="true"
                    checked={props.values.programa_paliativos_otraEnfermedaAvanzada === true}
                    onChange={() => props.setFieldValue("programa_paliativos_otraEnfermedaAvanzada", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_paliativos_otraEnfermedaAvanzada"
                    value="false"
                    checked={props.values.programa_paliativos_otraEnfermedaAvanzada === false}
                    onChange={() => props.setFieldValue("programa_paliativos_otraEnfermedaAvanzada", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>


<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_paliativos_total">
        Paliativo total
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_paliativos_total"
        type="number"
        placeholder="Paliativo total"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_paliativos_total}
    />
</div>

{ props.touched.programa_paliativos_total && props.errors.programa_paliativos_total ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_paliativos_total}</p>
    </div>
) : null  }

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_paliativos_ecog">
        ECOG
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_paliativos_ecog"
        type="number"
        placeholder="ECOG"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_paliativos_ecog}
    />
</div>

{ props.touched.programa_paliativos_ecog && props.errors.programa_paliativos_ecog ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_paliativos_ecog}</p>
    </div>
) : null  }



    <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
      value="Modificar Programa Integral"
    />

    </form>
    )}
    </Formik>
        );
    };
    