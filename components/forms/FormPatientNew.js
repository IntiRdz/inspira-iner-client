import React from 'react';
import { AsignarCama } from './AsignarCama';

export default function FormPatientNew  ({ formik }) {
    return (
        
        <form
        className="bg-white shadow-md mt-2"
        onSubmit={formik.handleSubmit}
    >
        <div className="form-row p-4"> 
{/* divisor de  form */}   <div className="form-column p-4 mr-4">
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="servicio_tratante">
                    Servicio Tratante
                </label>
                <select 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="servicio_tratante"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.servicio_tratante || ''}
                >
                    <option value="" label="Seleccione un Servicio" />
                    <option value="Neumologia" label="Neumología" />
                    <option value="ORL" label="ORL" />
                    <option value="Neumopedia" label="Neumopediatría" />
                    <option value="CTX" label="Cirugia Tórax" />
                    <option value="Areas_Criticas" label="Áreas Críticas" />
                </select>
            </div>

            { formik.touched.servicio_tratante && formik.errors.servicio_tratante ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.servicio_tratante}</p>
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
                    <option value="Tienda_Traqueal" label="Tienda Traqueal" />
                    <option value="PNAF" label="PNAF" />
                    <option value="VMNI_Intermitente" label="VMNI Intermiente" />
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
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Hemodiálisis
                </div>

                <div className="flex items-center">
                    <input
                        className="mr-2 leading-tight"
                        id="pac_hemodialisis_true"
                        name="pac_hemodialisis"
                        type="radio"
                        onChange={() => formik.setFieldValue("pac_hemodialisis", true)}
                        onBlur={formik.handleBlur}
                        checked={formik.values.pac_hemodialisis === true}
                    />
                    <label htmlFor="pac_hemodialisis_true">Sí</label>

                    <input
                        className="ml-4 mr-2 leading-tight"
                        id="pac_hemodialisis_false"
                        name="pac_hemodialisis"
                        type="radio"
                        onChange={() => formik.setFieldValue("pac_hemodialisis", false)}
                        onBlur={formik.handleBlur}
                        checked={formik.values.pac_hemodialisis === false}
                    />
                    <label htmlFor="pac_hemodialisis_false">No</label>
                </div>
            </div>

            <div className="mb-4">
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Grupo Poblacional 
                </div>
                {[
                    'TrasladoDeHospital',
                    'InfeccionReciente',
                    'Obstetrico',
                    'Inmunosupresion',
                    'ComunidadLG',
                ].map((option) => (
                    <div key={option} className="block">
                        <input
                            type="checkbox"
                            id={option}
                            name="caracteristicas_especiales"
                            value={option}
                            onChange={(e) => {
                                const isChecked = e.target.checked;
                                const value = e.target.value;

                                formik.setFieldValue(
                                    'caracteristicas_especiales',
                                    isChecked
                                    ? [...formik.values.caracteristicas_especiales, value]
                                    : formik.values.caracteristicas_especiales.filter((val) => val !== value)
                                );
                            }}
                            onBlur={formik.handleBlur}
                            checked={formik.values.caracteristicas_especiales.includes(option)}
                            className="mr-2"
                        />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </div>





            </div>
{/* divisor de  form */}<div className="form-column p-4">

<div className="mb-4" hidden>
    <div className="block text-gray-700 text-sm font-bold mb-2">
        Diagnósticos Generales
    </div>
    {[
        'CodigoHemoptisis',
        'CodigoViaAerea',
        'CodigoInfarto',
        'SIRA',
        'NeumoniaViral',
        'COVID',
        'Influenza',
        'Parainfluenza',
        'VirusSincialRespiratorio',
        'Metaneumovirus',
        'NeumoniaBacteriana',
        'TuberculosisSensible',
        'TuberculosisResistente',
        'B24',
        'EPOC',
        'Asma',
        'TromboembiaPulmonar',
        'DerramePleural',
        'Neumotorax',
        'NeumoniaIntersticialDifusa',
        'InsuficienciaCardiaca',
        'CaPulmonarOSospecha',
    ].map((option) => (
        <div key={option} className="block">
            <input
                type="checkbox"
                id={option}
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
            <label htmlFor={option}>{option}</label>
        </div>
    ))}
</div>



            <div className="mb-4" hidden>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico">
                    Diagnósticos Específicos
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
                <div className="block text-gray-700 text-sm font-bold mb-2">
                    Requiere Aislamiento
                </div>

                <div className="flex items-center">
                    <input
                        className="mr-2 leading-tight"
                        id="pac_aislamiento_true"
                        name="pac_aislamiento"
                        type="radio"
                        onChange={() => formik.setFieldValue("pac_aislamiento", true)}
                        onBlur={formik.handleBlur}
                        checked={formik.values.pac_aislamiento === true}
                    />
                    <label htmlFor="pac_aislamiento_true">Sí</label>

                    <input
                        className="ml-4 mr-2 leading-tight"
                        id="pac_aislamiento_false"
                        name="pac_aislamiento"
                        type="radio"
                        onChange={() => formik.setFieldValue("pac_aislamiento", false)}
                        onBlur={formik.handleBlur}
                        checked={formik.values.pac_hemodialisis === false}
                    />
                    <label htmlFor="pac_aislamiento_false">No</label>
                </div>
            </div>


            <AsignarCama />               

            <input
            type="submit"
            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
            value="Registrar Paciente"

            
            />
        </div>
        </div>
        
    </form>
    );
};
