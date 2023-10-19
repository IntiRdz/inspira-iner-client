import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import PacienteContext from '../../context/pacientes/PacienteContext';
import { AsignarCama } from '../../components/pacientes/AsignarCama';

const OBTENER_PACIENTE = gql`
    query ObtenerPaciente($id: ID!) {
        obtenerPaciente(id: $id) {
            _id
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico
            diagnostico1
            pac_codigo_uveh
            fecha_ingreso
            fecha_prealta
            fecha_egreso
            hospitalizado
            creado
            user
            cama_relacionada {
            _id
            cama_numero
            }
            microorganismo_relacionado {
            _id
            microorganismo_nombre
            }
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

    const [mensajeError, setMensajeError] = useState(null);

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
    
    const { cama } = useContext(PacienteContext);
    //console.log("Valor de id.cama desde el contexto:", cama);

   //console.log(data)

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
        diagnostico: Yup.string(),
        pac_codigo_uveh: Yup.string().required([
            'Sin Definir',
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

    //console.log("la dada es",data)
    //console.log(" data.obteberPaciente es",data.obtenerPaciente)
    const { obtenerPaciente } = data;
    //console.log("Data de Obtener Paciente",obtenerPaciente)

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


    //console.log("Valores Iniales",valoresIniciales)

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
            cama_relacionada
        } = valores;


        try {
            const { data} = await actualizarPaciente({
                variables: {
                    _id,
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
                        cama_relacionada: cama
                    }
                }
            });

            console.log("data antes de la alerta",data)
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
                        ... demás código ...
                        )
                    }}
                    </Formik>
                </div>
            </div>

        </Layout>
     );
}
 
export default EditarPaciente;