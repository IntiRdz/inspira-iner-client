import React from 'react';
import { Formik } from 'formik';

export default function FormProgramaIntegralSuenioEdit ({ initialValues, validationSchema, onSubmit })  {
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
                El indice de masa corporal es igual o mayor a 30  
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_imc"
                    value="true"
                    checked={props.values.programa_suenio_imc === true}
                    onChange={() => props.setFieldValue("programa_suenio_imc", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_imc"
                    value="false"
                    checked={props.values.programa_suenio_imc === false}
                    onChange={() => props.setFieldValue("programa_suenio_imc", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>





        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿El paciente presenta datos de hipoventilación crónica?  PaCO2  mayor a 38 mmHg, con pH normal.
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_hipoventilacion"
                    value="true"
                    checked={props.values.programa_suenio_hipoventilacion === true}
                    onChange={() => props.setFieldValue("programa_suenio_hipoventilacion", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_hipoventilacion"
                    value="false"
                    checked={props.values.programa_suenio_hipoventilacion === false}
                    onChange={() => props.setFieldValue("programa_suenio_hipoventilacion", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿El paciente presenta datos de restricción de la caja torácica? 
            Puede estar relacionado con enfermedades neuromusculares, patología vertebral, enfermedades de tejido conectivo y/o anomalías adquiridas de la caja torácica
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_restriccionTorax"
                    value="true"
                    checked={props.values.programa_suenio_restriccionTorax === true}
                    onChange={() => props.setFieldValue("programa_suenio_restriccionTorax", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_restriccionTorax"
                    value="false"
                    checked={props.values.programa_suenio_restriccionTorax === false}
                    onChange={() => props.setFieldValue("programa_suenio_restriccionTorax", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
            ¿El paciente tiene alguna enfermedad neuromuscular? Ej., distrofia muscular, poliomielitis, parálisis cerebral
            </label>
            <label className="inline-flex items-center mr-3">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_neuromuscular"
                    value="true"
                    checked={props.values.programa_suenio_neuromuscular === true}
                    onChange={() => props.setFieldValue("programa_suenio_neuromuscular", true)}
                />
                <span className="ml-2">Sí</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    className="form-radio"
                    name="programa_suenio_neuromuscular"
                    value="false"
                    checked={props.values.programa_suenio_neuromuscular === false}
                    onChange={() => props.setFieldValue("programa_suenio_neuromuscular", false)}
                />
                <span className="ml-2">No</span>
            </label>
        </div>

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
    