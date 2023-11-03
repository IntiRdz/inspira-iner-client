import React from 'react';
import { Formik } from 'formik';
import { AsignarCama } from './AsignarCama';

const FormPaciente = ({ valoresIniciales, onSubmit, schemaValidacion }) => {
    return (

        
        <Formik
            validationSchema={schemaValidacion}
            enableReinitialize
            initialValues={valoresIniciales}
            onSubmit={onSubmit}
        >
            {(props) => (


            <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={props.handleSubmit}
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.expediente}
                    />
                </div>

                { props.touched.expediente && props.errors.expediente ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.expediente}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pac_apellido_paterno}
                    />
                </div>

                { props.touched.pac_apellido_paterno && props.errors.pac_apellido_paterno ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.pac_apellido_paterno}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pac_apellido_materno}
                    />
                </div>

                { props.touched.pac_apellido_materno && props.errors.pac_apellido_materno ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.pac_apellido_materno}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pac_nombre}
                    />
                </div>

                { props.touched.pac_nombre && props.errors.pac_nombre ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.pac_nombre}</p>
                    </div>
                ) : null  }


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_genero">
                        Género
                    </label>
                    <select 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="pac_genero"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pac_genero}
                    >
                        <option value="" label="Seleccione un género" />
                        <option value="Hombre" label="Hombre" />
                        <option value="Mujer" label="Mujer" />
                    </select>
                </div>

                { props.touched.pac_genero && props.errors.pac_genero ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.pac_genero}</p>
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
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pac_FN}
                    />
                </div>

                { props.touched.pac_FN && props.errors.pac_FN ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.pac_FN}</p>
                    </div>
                ) : null  }

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_dispositivo_o2">
                        Dispositivo O2
                    </label>
                    <select 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="pac_dispositivo_o2"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.pac_dispositivo_o2}
                    >
                        <option value="" label="Seleccione un dispositivo" />
                        <option value="AA" label="AA" />
                        <option value="PN" label="PN" />
                        <option value="PNAF" label="PNAF" />
                        <option value="VMNI" label="VMNI" />
                        <option value="VM" label="VM" />
                    </select>
                </div>

                { props.touched.pac_dispositivo_o2 && props.errors.pac_dispositivo_o2 ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.pac_dispositivo_o2}</p>
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
                            onChange={() => props.setFieldValue("pac_hemodialisis", true)}
                            onBlur={props.handleBlur}
                            checked={props.values.pac_hemodialisis === true}
                        />
                        <label htmlFor="pac_hemodialisis_true">Sí</label>

                        <input
                            className="ml-4 mr-2 leading-tight"
                            id="pac_hemodialisis_false"
                            type="radio"
                            onChange={() => props.setFieldValue("pac_hemodialisis", false)}
                            onBlur={props.handleBlur}
                            checked={props.values.pac_hemodialisis === false}
                        />
                        <label htmlFor="pac_hemodialisis_false">No</label>
                    </div>
                </div>
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

                        props.setFieldValue(
                            'diagnostico1',
                            isChecked
                            ? [...props.values.diagnostico1, value]
                            : props.values.diagnostico1.filter((val) => val !== value)
                        );
                        }}
                        onBlur={props.handleBlur}
                        checked={props.values.diagnostico1.includes(option)}
                        className="mr-2"
                    />
                    {option}
                    </label>
                ))}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diagnostico">
                        Diagnóstico
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="diagnostico"
                        type="text"
                        placeholder="Diagnóstico"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.diagnostico}
                    />
                </div>

                { props.touched.diagnostico && props.errors.diagnostico ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.diagnostico}</p>
                    </div>
                ) : null  }

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="caracteristicas_especiales">
                    Caracteristicas Especiales 
                </label>
                {[
                    'TrasladoDeHospital',
                    'InfeccionReciente',
                    'Embarazo',
                    'Inmunosupresion',
                ].map((option) => (
                    <label key={option} className="block">
                    <input
                        type="checkbox"
                        name="caracteristicas_especiales"
                        value={option}
                        onChange={(e) => {
                        const isChecked = e.target.checked;
                        const value = e.target.value;

                        props.setFieldValue(
                            'caracteristicas_especiales',
                            isChecked
                            ? [...props.values.caracteristicas_especiales, value]
                            : props.values.caracteristicas_especiales.filter((val) => val !== value)
                        );
                        }}
                        onBlur={props.handleBlur}
                        checked={props.values.caracteristicas_especiales.includes(option)}
                        className="mr-2"
                    />
                    {option}
                    </label>
                ))}
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pac_codigo_uveh">
                        Código UVEH
                    </label>
                    {[
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
                        'SAMS',
                    ].map((option) => (
                        <label key={option} className="block">
                            <input
                                type="checkbox"
                                name="pac_codigo_uveh"
                                value={option}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const value = e.target.value;

                                    props.setFieldValue(
                                        'pac_codigo_uveh',
                                        isChecked
                                        ? [...props.values.pac_codigo_uveh, value]
                                        : props.values.pac_codigo_uveh.filter((val) => val !== value)
                                    );
                                }}
                                onBlur={props.handleBlur}
                                checked={props.values.pac_codigo_uveh.includes(option)}
                                className="mr-2"
                            />
                            {option}
                        </label>
                    ))}
                </div>



                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_ingreso">
                        Fecha de Ingreso
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fecha_ingreso"
                        type="datetime-local"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.fecha_ingreso}
                    />
                </div>

                { props.touched.fecha_ingreso && props.errors.fecha_ingreso ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.fecha_ingreso}</p>
                    </div>
                ) : null  }

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_prealta">
                        Fecha de Prealta
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fecha_prealta"
                        type="datetime-local"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.fecha_prealta}
                    />
                </div>

                { props.touched.fecha_prealta && props.errors.fecha_prealta ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.fecha_prealta}</p>
                    </div>
                ) : null  }


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_egreso">
                        Fecha de Egreso
                    </label>

                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fecha_egreso"
                        type="datetime-local"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.fecha_egreso}
                    />
                </div>

                { props.touched.fecha_egreso && props.errors.fecha_egreso ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                        <p className="font-bold">Error</p>
                        <p>{props.errors.fecha_egreso}</p>
                    </div>
                ) : null  }

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospitalizado">
                        Hospitalizado
                    </label>

                    <div className="flex items-center">
                        <input
                            className="mr-2 leading-tight"
                            id="hospitalizado_true"
                            type="radio"
                            onChange={() => props.setFieldValue("hospitalizado", true)}
                            onBlur={props.handleBlur}
                            checked={props.values.hospitalizado === true}
                        />
                        <label htmlFor="hospitalizado_true">Sí</label>

                        <input
                            className="ml-4 mr-2 leading-tight"
                            id="hospitalizado_false"
                            type="radio"
                            onChange={() => props.setFieldValue("hospitalizado", false)}
                            onBlur={props.handleBlur}
                            checked={props.values.hospitalizado === false}
                        />
                        <label htmlFor="hospitalizado_false">No</label>
                    </div>
                </div>
                <AsignarCama />   

                <input
                type="submit"
                className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                value="Guardar Cambios"
            />
            </form>
            )}
        </Formik>
    );
};

export default FormPaciente;
