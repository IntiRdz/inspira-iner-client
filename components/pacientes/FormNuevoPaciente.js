import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AsignarCama } from './AsignarCama';


const FormNuevoPaciente = ({ onSubmit }) => {

    const formik = useFormik({
        initialValues: {
            expediente: '',
            pac_apellido_paterno: '',
            pac_apellido_materno: '',
            pac_nombre: '',
            pac_genero: '',
            pac_FN: '',
            pac_dispositivo_o2: '',
            pac_hemodialisis: false,
            diagnostico1: [],
            diagnostico: '',
            pac_codigo_uveh: ['SinDefinir'],
            fecha_ingreso: '',
            fecha_prealta: '',
            fecha_egreso: '',
            hospitalizado: true,
        },
        validationSchema: Yup.object({
            expediente: Yup.string().required('El expediente del paciente es obligatorio'),
            pac_apellido_paterno: Yup.string().required('El apellido paterno del paciente es obligatorio'),
            pac_apellido_materno: Yup.string().required('El apellido materno del paciente es obligatorio'),
            pac_nombre: Yup.string().required('El nombre del paciente es obligatorio'),
            pac_genero: Yup.string().oneOf(['Hombre', 'Mujer']).required('El género del paciente es obligatorio'),
            pac_FN: Yup.date().required('La fecha de nacimiento del paciente es obligatoria'),
            pac_dispositivo_o2: Yup.string().oneOf([
                'AA', 
                'PN', 
                'PNAF', 
                'VMNI', 
                'VM']).required('El dispositivo O2 del paciente es obligatorio'),
            pac_hemodialisis: Yup.boolean(),
            diagnostico1: Yup.array()
            .min(0, 'Debe seleccionar al menos un diagnóstico')
            .of(
                Yup.string().oneOf([
                'CodigoHemoptisis',
                'CodigoViaAerea',
                'CodigoInfarto',
                'COVID',
                'Influenza',
                'Parainfluenza',
                'Adenovirus',
                'VirusSincialRespiratorio',
                'TuberculosisSensible',
                'TuberculosisResistente',
                'B24',
                'SIRA',
                'NeumoniaBacteriana',
                'EPOC',
                'Asma',
                'TromboembiaPulmonar',
                'DerramePleural',
                'Neumotorax',
                'NeumoniaIntersticialDifusa',
                'InsuficienciaCaridiaca',
                'CaPulmonarOSospecha',
                ])
            ),
            diagnostico: Yup.string(),
            pac_codigo_uveh:  Yup.array()
            .min(0, 'Debe seleccionar al menos un diagnóstico')
            .of(
                Yup.string().oneOf([
                'SinDefinir',
                'SinAislamientos',
                'Acinetobacter',
                'ColonizaciónAcinetobacter',
                'ContactoAcinetobacter',
                'HisopadoRectal',
                'ClostridiumDifficile',
                'Enterobacterias-XDR-MDR',
                'Pseudomonas-XDR-MDR',
                'SAMR',
                'TuberculosisisOSospecha',
                'SAMS'
                ])
            ),
            fecha_ingreso: Yup.date().required('La fecha de ingreso es obligatoria'),
            fecha_prealta: Yup.date(),
            fecha_egreso: Yup.date(),
            hospitalizado: Yup.boolean()
        }),
        onSubmit: async valores => {
            const { 
                expediente,
                pac_apellido_paterno,
                pac_apellido_materno,
                pac_nombre,
                pac_genero,
                pac_FN,
                pac_dispositivo_o2,
                pac_hemodialisis,
                diagnostico1,
                diagnostico,
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta,
                fecha_egreso,
                hospitalizado,
            } = valores;

            //console.log("valores inciales del nuevo objeto", valores)

            // Verificar si las fechas son nulas o vacías
            const fechaPrealta = fecha_prealta || undefined; // Establece un valor predeterminado si es nulo o vacío
            const fechaEgreso = fecha_egreso || undefined; // Establece un valor predeterminado si es nulo o vacío

            const valoresActualizados = {
                expediente,
                pac_apellido_paterno,
                pac_apellido_materno,
                pac_nombre,
                pac_genero,
                pac_FN,
                pac_dispositivo_o2,
                pac_hemodialisis,
                diagnostico,
                diagnostico1,
                pac_codigo_uveh,
                fecha_ingreso,
                fecha_prealta: fechaPrealta,
                fecha_egreso: fechaEgreso,
                hospitalizado,
                cama_relacionada: cama,
            };

            //console.log("Valores actualizados:", valoresActualizados)


        
            try {
                const { data } = await nuevoPaciente({
                    variables: {
                        input: valoresActualizados
                    }
                });
                
                
                console.log("Después de la llamada a crear Paciente");

                //console.log(data);

                //Mostrar alerta
                Swal.fire(
                    'Creado',
                    'Se agregó correctamente al paciente',
                    'success'
                )

                //Redireccionar
                router.push('/');

            } catch (error) {
                console.error("Error durante la llamada a actualizarPaciente:", error);

                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    guardarMensaje(null);
                }, 5000);
            }
        }
        
    })

    return (


    <form
        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
        onSubmit={formik.handleSubmit}
    >
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expediente">
                Expediente
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expediente"
                type="text"
                placeholder="Expediente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expediente}
            />
        </div>

        { formik.touched.expediente && formik.errors.expediente ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.expediente}</p>
            </div>
        ) : null  }

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_apellido_paterno">
                Apellido Paterno
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_apellido_paterno"
                type="text"
                placeholder="Apellido Paterno"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_apellido_paterno}
            />
        </div>

        { formik.touched.pac_apellido_paterno && formik.errors.pac_apellido_paterno ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_apellido_paterno}</p>
            </div>
        ) : null  }

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_apellido_materno">
                Apellido Materno
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_apellido_materno"
                type="text"
                placeholder="Apellido Materno"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_apellido_materno}
            />
        </div>

        { formik.touched.pac_apellido_materno && formik.errors.pac_apellido_materno ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_apellido_materno}</p>
            </div>
        ) : null  }


        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_nombre">
                Nombre
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_nombre"
                type="text"
                placeholder="Nombre Paciente"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_nombre}
            />
        </div>

        { formik.touched.pac_nombre && formik.errors.pac_nombre ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_nombre}</p>
            </div>
        ) : null  }


        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_genero">
                Género
            </label>
            <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_genero"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_genero}
            >
                <option value="" label="Seleccione un género" />
                <option value="Hombre" label="Hombre" />
                <option value="Mujer" label="Mujer" />
            </select>
        </div>

        { formik.touched.pac_genero && formik.errors.pac_genero ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_genero}</p>
            </div>
        ) : null  }

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_FN">
                Fecha de Nacimiento
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_FN"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_FN}
            />
        </div>

        { formik.touched.pac_FN && formik.errors.pac_FN ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_FN}</p>
            </div>
        ) : null  }

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico1">
            Diagnósticos Generales
        </label>
        {[
            'CodigoHemoptisis',
            'CodigoViaAerea',
            'CodigoInfarto',
            'COVID',
            'Influenza',
            'Parainfluenza',
            'Adenovirus',
            'VirusSincialRespiratorio',
            'TuberculosisSensible',
            'TuberculosisResistente',
            'B24',
            'SIRA',
            'NeumoniaBacteriana',
            'EPOC',
            'Asma',
            'TromboembiaPulmonar',
            'DerramePleural',
            'Neumotorax',
            'NeumoniaIntersticialDifusa',
            'InsuficienciaCaridiaca',
            'CaPulmonarOSospecha',
        ].map((option) => (
            <label key={option} className="block">
            <input
                type="checkbox"
                name="diagnostico1"
                value={option}
                onChange={(e) => {
                const isChecked = e.target.checked;
                const value = e.target.value;

                formik.setFieldValue(
                    'diagnostico1',
                    isChecked
                    ? [...formik.values.diagnostico1, value]
                    : formik.values.diagnostico1.filter((val) => val !== value)
                );
                }}
                onBlur={formik.handleBlur}
                checked={formik.values.diagnostico1.includes(option)}
                className="mr-2"
            />
            {option}
            </label>
        ))}
        </div>


        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico">
                Diagnósticos Epecíficos
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="diagnostico"
                type="text"
                placeholder="Diagnóstico"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.diagnostico}
            />
        </div>

        { formik.touched.diagnostico && formik.errors.diagnostico ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.diagnostico}</p>
            </div>
        ) : null  }

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_dispositivo_o2">
                Dispositivo O2
            </label>
            <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_dispositivo_o2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_dispositivo_o2 || ''}
            >
                <option value="" label="Seleccione un dispositivo" />
                <option value="AA" label="AA" />
                <option value="PN" label="PN" />
                <option value="PNAF" label="PNAF" />
                <option value="VMNI" label="VMNI" />
                <option value="VM" label="VM" />
            </select>
        </div>

        { formik.touched.pac_dispositivo_o2 && formik.errors.pac_dispositivo_o2 ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_dispositivo_o2}</p>
            </div>
        ) : null  }


        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_hemodialisis">
                Hemodialisis
            </label>

            <div className="flex items-center">
                <input
                    className="mr-2 leading-tight"
                    id="pac_hemodialisis_true"
                    type="radio"
                    onChange={() => formik.setFieldValue("pac_hemodialisis", true)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pac_hemodialisis === true}
                />
                <label htmlFor="pac_hemodialisis_true">Sí</label>

                <input
                    className="ml-4 mr-2 leading-tight"
                    id="pac_hemodialisis_false"
                    type="radio"
                    onChange={() => formik.setFieldValue("pac_hemodialisis", false)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.pac_hemodialisis === false}
                />
                <label htmlFor="pac_hemodialisis_false">No</label>
            </div>
        </div>

        <div className="mb-4" hidden>
            <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="pac_codigo_uveh"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pac_codigo_uveh}
            >
                <option value="SinDefinir" label="Sin Definir" />
                <option value="SinAislamientos" label="Sin Aislamientos" />
                <option value="Acinetobacter" label="Acinetobacter" />
                <option value="ColonizaciónAcinetobacter" label="Colonización Acinetobacter" />
                <option value="ContactoAcinetobacter" label="Contacto Acinetobacter" />
                <option value="HisopadoRectal" label="Hisopado Rectal" />
                <option value="ClostridiumDifficile" label="Clostridium Difficile" />
                <option value="Enterobacterias-XDR-MDR" label="Enterobacterias XDR MDR" />
                <option value="Pseudomonas-XDR-MDR" label="Pseudomonas XDR MDR" />
                <option value="SAMR" label="SAMR" />                                  
                <option value="TuberculosisisOSospecha" label="Tuberculosisis o Sospecha" />
                <option value="SAMS" label="SAMS" />  
            </select>
        </div>
        { formik.touched.pac_codigo_uveh && formik.errors.pac_codigo_uveh ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.pac_codigo_uveh}</p>
            </div>
        ) : null  }
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_ingreso">
            Fecha de Ingreso
        </label>

        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fecha_ingreso"
            type="datetime-local"
            placeholder="Fecha de Ingreso"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fecha_ingreso}
        />
        </div>
        { formik.touched.fecha_ingreso && formik.errors.fecha_ingreso ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
            <p className="font-bold">Error</p>
            <p>{formik.errors.fecha_ingreso}</p>
        </div>
        ) : null  } 
        <div className="mb-4" hidden>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_prealta">
                Fecha de Prealta
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_prealta"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha_prealta}
            />
        </div>
        { formik.touched.fecha_prealta && formik.errors.fecha_prealta ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.fecha_prealta}</p>
            </div>
        ) : null  }
        <div className="mb-4" hidden>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_egreso">
                Fecha de Egreso
            </label>

            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fecha_egreso"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fecha_egreso}
            />
        </div>

        { formik.touched.fecha_egreso && formik.errors.fecha_egreso ? (
            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                <p className="font-bold">Error</p>
                <p>{formik.errors.fecha_egreso}</p>
            </div>
        ) : null  }

        <div className="mb-4" hidden>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospitalizado">
                Hospitalizado
            </label>

            <div className="flex items-center">
                <input
                    className="mr-2 leading-tight"
                    id="hospitalizado_true"
                    type="radio"
                    onChange={() => formik.setFieldValue("hospitalizado", true)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.hospitalizado === true}
                />
                <label htmlFor="hospitalizado_true">Sí</label>

                <input
                    className="ml-4 mr-2 leading-tight"
                    id="hospitalizado_false"
                    type="radio"
                    onChange={() => formik.setFieldValue("hospitalizado", false)}
                    onBlur={formik.handleBlur}
                    checked={formik.values.hospitalizado === false}
                />
                <label htmlFor="hospitalizado_false">No</label>
            </div>
        </div>  

        <AsignarCama />

        <input
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
            value="Registrar Paciente"
        />
    </form>
        );
    };

export default FormNuevoPaciente;