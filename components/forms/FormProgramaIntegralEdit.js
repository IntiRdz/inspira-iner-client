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

        { props.touched.programa_discapacidad_hipoacusia && props.errors.programa_discapacidad_hipoacusia ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{props.errors.programa_discapacidad_hipoacusia}</p>
            </div>
        ) : null  }


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

        { props.touched.programa_discapacidad_disminucion_visual && props.errors.programa_discapacidad_disminucion_visual ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{props.errors.programa_discapacidad_disminucion_visual}</p>
            </div>
        ) : null  }

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
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="programa_discapacidad_gds_fast">
    Tamizaje de deterioro cognitivo, preguntar cómo se encontraba 2 semanas previas al ingreso: Escala de Deterioro Cognitivo Global (GDS-FAST)<br />

1. AUSENCIA DE DÉFICIT COGNITIVO<br />
2. DÉFICIT COGNITIVO MUY LEVE.<br /> Quejas de pérdida de memoria en ubicación de objetos, nombres de personas, citas, etc.<br />
3. DÉFICIT COGNITIVO LEVE:<br /> Haberse perdido en un lugar no familiar, dificultad para recordar palabras y nombres, pierde o coloca erróneamente objetos de valor, escasa capacidad para recordar a personas nuevas que ha conocido.<br />
4. DÉFICIT COGNITIVO MODERADO.<br /> Olvido de hechos cotidianos recientes, incapacidad para planificar viajes, finanzas o actividades complejas.<br />
5. DÉFICIT COGNITIVO MODERADAMENTE GRAVE.<br /> Decremento de la habilidad en escoger la ropa adecuada en cada estación del año o según las ocasiones. Es incapaz de recordar su dirección, teléfono o nombres de familiares. Es frecuente cierta desorientación en tiempo o en lugar. Sabe su nombre y generalmente el de su esposa e hijos.<br />
6. DÉFICIT COGNITIVO GRAVE.<br /> Decremento en la habilidad para vestirse, bañarse y lavarse; Olvida a veces el nombre de su cuidador principal de quien depende para vivir. Desorientación temporo espacial.
7. DÉFICIT COGNITIVO MUY GRAVE.<br /> Pérdida del habla y la capacidad motora. Capacidad de habla limitada aproximadamente a 6 palabras, capacidad de habla limitada a una única palabra, pérdida de la capacidad para caminar solo sin ayuda, pérdida de la capacidad para sentarse y levantarse sin ayuda, pérdida de la capacidad para sonreír, pérdida de la capacidad para mantener la cabeza erguida.<br />
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
        Delirium: Nu-DESC (2 o más indican posible delirium)
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
    