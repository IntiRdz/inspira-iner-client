import React, { useState } from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import AsignarCama from '../../components/AsignarCama';

const OBTENER_PACIENTE = gql`
    query obtenerPaciente($id:ID!) {
        obtenerPaciente(id:$id) {
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico
            pac_codigo_uveh
            fecha_prealta
            fecha_ingreso
            fecha_egreso
            hospitalizado
            cama_relacionada
            
        }
    }
`;

const ACTUALIZAR_PACIENTE = gql`
    mutation actualizarPaciente($id: ID!, $input: PacienteInput) {
        actualizarPaciente(id: $id, input: $input) {
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico
            pac_codigo_uveh
            fecha_prealta
            fecha_ingreso
            fecha_egreso
            hospitalizado
            cama_relacionada
            
        }
    }
`;

const EditarPaciente = () => {

    const [selectedCamaId, setSelectedCamaId] = useState([]);

    // obtener el ID actual
    const router = useRouter();
    const { query: { id } } = router;
    //console.log(id)

    // Consultar para obtener el paciente
    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: {
            id
        }
    });

   // console.log(data)

    // Actualizar el paciente
    const [ actualizarPaciente ] = useMutation( ACTUALIZAR_PACIENTE );

    // Schema de validacion
    const schemaValidacion = Yup.object({
        expediente: Yup.string().required('El expediente del paciente es obligatorio'),
        pac_apellido_paterno: Yup.string().required('El apellido paterno del paciente es obligatorio'),
        pac_apellido_materno: Yup.string().required('El apellido materno del paciente es obligatorio'),
        pac_nombre: Yup.string().required('El nombre del paciente es obligatorio'),
        pac_genero: Yup.string().oneOf(['Hombre', 'Mujer']).required('El género del paciente es obligatorio'),
        pac_FN: Yup.date(),
        pac_dispositivo_o2: Yup.string().oneOf([
            'AA', 
            'PN', 
            'PNAF', 
            'VMNI', 
            'VM']).required('El dispositivo O2 del paciente es obligatorio'),
        pac_hemodialisis: Yup.boolean(),
        diagnostico: Yup.string().required('El diagnóstico es obligatorio'),
        pac_codigo_uveh: Yup.string().required([
            'Sin Aislamientos',
            'Acinetobacter',
            'Colonización Acinetobacter',
            'Contacto Acinetobacter',
            'Hisopado Rectal',
            'Clostridium Difficile',
            'Enterobacterias XDR MDR',
            'Pseudomonas XDR MDR',
            'SAMR',
            'Tuberculosisis o Sospecha',
            'SAMS'
        ]).required('El Código es obligatorio'),
        fecha_ingreso: Yup.date(),
        fecha_prealta: Yup.date(),
        fecha_egreso: Yup.date(),
        hospitalizado: Yup.boolean()

    });


    if(loading) return 'Cargando...';

    // console.log(data.obtenerPaciente)

    const { obtenerPaciente } = data;

    const valoresIniciales = {
        expediente: obtenerPaciente.expediente ,
        pac_apellido_paterno: obtenerPaciente.pac_apellido_paterno,
        pac_apellido_materno: obtenerPaciente.pac_apellido_materno,
        pac_nombre: obtenerPaciente.pac_nombre,
        pac_genero: obtenerPaciente.pac_genero,
        pac_FN: obtenerPaciente.pac_FN ? format(new Date(obtenerPaciente.pac_FN), 'yyyy-MM-dd') : '',
        pac_dispositivo_o2: obtenerPaciente.pac_dispositivo_o2,
        pac_hemodialisis: obtenerPaciente.pac_hemodialisis ,
        diagnostico: obtenerPaciente.diagnostico ,
        pac_codigo_uveh: obtenerPaciente.pac_codigo_uveh  || '', 
        fecha_ingreso: obtenerPaciente.fecha_ingreso  ? format(new Date(obtenerPaciente.fecha_ingreso), 'yyyy-MM-dd') : '', // Si no hay fecha en las props, se establece como cadena vacía
        fecha_prealta: obtenerPaciente.fecha_prealta ? format(new Date(obtenerPaciente.fecha_prealta), 'yyyy-MM-dd') : '', // Si no hay fecha en las props, se establece como cadena vacía
        fecha_egreso: obtenerPaciente.fecha_egreso ? format(new Date(obtenerPaciente.fecha_egreso), 'yyyy-MM-dd') : '',
        hospitalizado: obtenerPaciente.hospitalizado,// Si no hay fecha en las props, se establece como cadena vacía
        cama_relacionada: obtenerPaciente.cama_relacionada
    };


    console.log("Valores Iniales",valoresIniciales)

    // Modifica el paciente en la BD
    const actualizarInfoPaciente = async valores => {
        const { 
            expediente,
            pac_apellido_paterno,
            pac_apellido_materno,
            pac_nombre,
            pac_genero,
            pac_FN,
            pac_dispositivo_o2,
            pac_hemodialisis,
            diagnostico,
            pac_codigo_uveh,
            fecha_ingreso,
            fecha_prealta,
            fecha_egreso,
            hospitalizado,
            cama_relacionada,
        } = valores;


        try {
            const { data} = await actualizarPaciente({
                variables: {
                    id,
                    input: {
                        expediente,
                        pac_apellido_paterno,
                        pac_apellido_materno,
                        pac_nombre,
                        pac_genero,
                        pac_FN,
                        pac_dispositivo_o2,
                        pac_hemodialisis,
                        diagnostico,
                        pac_codigo_uveh,
                        fecha_ingreso: fecha_ingreso === '' ? undefined : fecha_ingreso, // Si es cadena vacía, se envía undefined
                        fecha_prealta: fecha_prealta === '' ? undefined : fecha_prealta, // Si es cadena vacía, se envía undefined
                        fecha_egreso: fecha_egreso === '' ? undefined : fecha_egreso,
                        hospitalizado,
                        cama_relacionada: selectedCamaId,
                    }
                }
            });

            console.log("Esta e la ultima DATA",selectedCamaId);
  
            // Mostrar Alerta
            Swal.fire(
                'Actualizado',
                'El paciente se actualizó correctamente',
                'success'
            )

            // Redireccionar
            router.push('/');
            
        } catch (error) {
            setMensajeError(error.message.replace('GraphQL error: ', ''));
            setTimeout(() => {
                setMensajeError(null);
            }, 2000);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Paciente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidacion }
                        enableReinitialize
                        initialValues={ valoresIniciales }
                        onSubmit={ ( valores ) => {
                            actualizarInfoPaciente(valores)
                        }}
                    >

                    {props => {
                    // console.log(props);
                    return (
                        <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={props.handleSubmit}
                        >

                        <AsignarCama
                                selectedCamaId={selectedCamaId}
                                setSelectedCamaId={setSelectedCamaId}
                            /> 

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cama_relacionada">
                                    Cama Asignada
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="cama_relacionada"
                                    type="text"
                                    placeholder="Cama Relacionada"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.cama_relacionada} 
                                />
                            </div>

                            { props.touched.cama_relacionada && props.errors.cama_relacionada ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" >
                                    <p className="font-bold">Error</p>
                                    <p>{props.errors.cama_relacionada}</p>
                                </div>
                            ) : null  }


                            <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Paciente"

                            
                        />
                        </form>
                        )
                    }}
                    </Formik> 
                </div>
            </div>

        </Layout>
     );
}
 
export default EditarPaciente;