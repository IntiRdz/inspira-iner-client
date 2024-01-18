import React from 'react';
import { Formik } from 'formik';

export default function FormProgramaIntegralPaliativosEdit ({ initialValues, validationSchema, onSubmit })  {
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
  <h2 className='font-bold my-3'>Editar Programa Integral</h2>
  

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Hipoacusia
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_discapacidad_hipoacusia"
                    value="true"
                    checked={props.values.programa_discapacidad_hipoacusia === true}
                    onChange={() => props.setFieldValue("programa_discapacidad_hipoacusia", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_discapacidad_hipoacusia"
                    value="false"
                    checked={props.values.programa_discapacidad_hipoacusia === false}
                    onChange={() => props.setFieldValue("programa_discapacidad_hipoacusia", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>


        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Dismiucion Visual
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_discapacidad_disminucion_visual"
                    value="true"
                    checked={props.values.programa_discapacidad_disminucion_visual === true}
                    onChange={() => props.setFieldValue("programa_discapacidad_disminucion_visual", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_discapacidad_disminucion_visual"
                    value="false"
                    checked={props.values.programa_discapacidad_disminucion_visual === false}
                    onChange={() => props.setFieldValue("programa_discapacidad_disminucion_visual", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_discapacidad_perdida_barthel">
                barthel
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="programa_discapacidad_perdida_barthel"
                type="text"
                placeholder="Barthel"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.programa_discapacidad_perdida_barthel}
            />
        </div>

        { props.touched.programa_discapacidad_perdida_barthel && props.errors.programa_discapacidad_perdida_barthel ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{props.errors.programa_discapacidad_perdida_barthel}</p>
            </div>
        ) : null  }

        
<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_discapacidad_disminucion_cognitiva">
        Cognitivo
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_discapacidad_disminucion_cognitiva"
        type="text"
        placeholder="Barthel"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_discapacidad_disminucion_cognitiva}
    />
</div>

{ props.touched.programa_discapacidad_disminucion_cognitiva && props.errors.programa_discapacidad_disminucion_cognitiva ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_discapacidad_disminucion_cognitiva}</p>
    </div>
) : null  }


<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_discapacidad_gds_fast">
        GDS Fast
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_discapacidad_gds_fast"
        type="number"
        placeholder="GDS Fast"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_discapacidad_gds_fast}
    />
</div>

{ props.touched.programa_discapacidad_gds_fast && props.errors.programa_discapacidad_gds_fast ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_discapacidad_gds_fast}</p>
    </div>
) : null  }

<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_discapacidad_nu_desc">
        Nu desc
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="programa_discapacidad_nu_desc"
        type="number"
        placeholder="Nu desc"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.programa_discapacidad_nu_desc}
    />
</div>

{ props.touched.programa_discapacidad_nu_desc && props.errors.programa_discapacidad_nu_desc ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.programa_discapacidad_nu_desc}</p>
    </div>
) : null  }


<div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preguntas_contestadas">
        Preguntas
    </label>

    <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="preguntas_contestadas"
        type="number"
        placeholder="Preguntas"
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.values.preguntas_contestadas}
    />
</div>

{ props.touched.preguntas_contestadas && props.errors.preguntas_contestadas ? (
    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
        <p className="font-bold">Error</p>
        <p>{props.errors.preguntas_contestadas}</p>
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
    