import React from 'react';
import { Formik } from 'formik';

export default function FormProgramaIntegralNutricionEdit ({ initialValues, validationSchema, onSubmit })  {
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
  <h2 className='font-bold my-3'>Editar Programa Integral Nutrición</h2>
  

  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_nutricion_puntuacion">
        Nutritional Risk Screening (NRS 2002). Puntos de riesgo nutricional
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_nutricion_puntuacion"
        type="number"
        placeholder="Puntos NRS 2002"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_nutricion_puntuacion}
    />
</div>

{ props.touched.programa_nutricion_puntuacion && props.errors.programa_nutricion_puntuacion ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_nutricion_puntuacion}</p>
    </div>
) : null  }

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Grupo de riesgo nutricional
        </label>
        <div id="programa_nutricion_grupoRiesgo">
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_nutricion_grupoRiesgo"
                    value="Bajo"
                    checked={props.values.programa_nutricion_grupoRiesgo === 'Bajo'}
                    onChange={() => props.setFieldValue("programa_nutricion_grupoRiesgo", "Bajo")}
                />
                <span className="ml-2">Bajo</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_nutricion_grupoRiesgo"
                    value="Intermedio"
                    checked={props.values.programa_nutricion_grupoRiesgo === 'Intermedio'}
                    onChange={() => props.setFieldValue("programa_nutricion_grupoRiesgo", "Intermedio")}
                />
                <span className="ml-2">Intermedio</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_nutricion_grupoRiesgo"
                    value="Alto"
                    checked={props.values.programa_nutricion_grupoRiesgo === 'Alto'}
                    onChange={() => props.setFieldValue("programa_nutricion_grupoRiesgo", "Alto")}
                />
                <span className="ml-2">Alto</span>
            </label>
        </div>

        <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">
            Via de administración de la nutrición
        </label>
        <div id="programa_nutricion_via">
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_nutricion_via"
                    value="Oral"
                    checked={props.values.programa_nutricion_via === 'Oral'}
                    onChange={() => props.setFieldValue("programa_nutricion_via", "Oral")}
                />
                <span className="ml-2">Oral</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_nutricion_via"
                    value="Enteral"
                    checked={props.values.programa_nutricion_via === 'Enteral'}
                    onChange={() => props.setFieldValue("programa_nutricion_via", "Enteral")}
                />
                <span className="ml-2">Enteral</span>
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_nutricion_via"
                    value="Parenteral"
                    checked={props.values.programa_nutricion_via === 'Parenteral'}
                    onChange={() => props.setFieldValue("programa_nutricion_via", "Parenteral")}
                />
                <span className="ml-2">Parenteral</span>
            </label>
        </div>

    <input
      type="submit"
      className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
      value="Modificar Programa Integral - Nutrición"
    />

    </form>
    )}
    </Formik>
        );
    };
    