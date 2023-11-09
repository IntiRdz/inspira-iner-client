import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

import PacienteContext from '../../context/pacientes/PacienteContext';
import FormEditPaciente from '../../components/pacientes/FormEditPaciente';

const OBTENER_PACIENTES = gql`
    query obtenerPacientes {
        obtenerPacientes {
            id
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico1
            diagnostico
            pac_codigo_uveh
            fecha_prealta
            fecha_ingreso
            fecha_egreso
            hospitalizado
        }
    }
`;

const OBTENER_PACIENTE = gql`
    query ObtenerPaciente($id: ID!) {
        obtenerPaciente(id: $id) {
            expediente
            pac_apellido_paterno
            pac_apellido_materno
            pac_nombre
            pac_genero
            pac_FN
            pac_dispositivo_o2
            pac_hemodialisis
            diagnostico1
            diagnostico
            pac_codigo_uveh
            fecha_ingreso
            fecha_prealta
            fecha_egreso
            hospitalizado
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
            diagnostico1
            diagnostico
            pac_codigo_uveh
            fecha_prealta
            fecha_ingreso
            fecha_egreso
            hospitalizado
        }
    }
`;

const EditarPaciente = () => {

    const router = useRouter();
    const { query: { id } } = router;
    
    // Mensaje de alerta
    const [mensajeError, setMensajeError] = useState(null);

    // Consultar para obtener el paciente
    const { data, loading, error } = useQuery(OBTENER_PACIENTE, {
        variables: {
            id:id
        }
    });

    const { cama } = useContext(PacienteContext);
    //console.log("Valor de id.cama desde el contexto:", cama);
    
    const { data: pacientesData, loading: pacientesLoading, error: pacientesError } = useQuery(OBTENER_PACIENTES);
    
    
    // Mutation para modificar al paceinte
    const [actualizarPaciente] = useMutation(ACTUALIZAR_PACIENTE, {
        update(cache, { data: { actualizarPaciente } }) {
            // Obtener el objeto de cache directamente desde la consulta anterior
            const { obtenerPacientes } = pacientesData;
    
            // Verificar si hay errores o está cargando en la consulta original
            if (pacientesLoading || pacientesError) {
                console.log('Cargando o error en la consulta de pacientes');
                return;
            }
    
            // Reescribir ese objeto
            cache.writeQuery({
                query: OBTENER_PACIENTES,
                data: {
                    obtenerPacientes: [...obtenerPacientes, actualizarPaciente]
                }
            });
        },
    });

    // Schema de validacion
    const schemaValidacion = Yup.object({
        expediente: Yup.string()
        .required('El expediente del paciente es obligatorio')
        .matches(/^[a-zA-Z0-9]{6,8}$/, 'El expediente debe tener entre 6 y 8 caracteres alfanuméricos'),
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
        caracteristicas_especiales:  Yup.array()
        .min(0, 'Seleccione una catecteristica especial del paciente')
        .of(
            Yup.string().oneOf([
            'TrasladoDeHospital',
            'InfeccionReciente',
            'Embarazo',
            'Inmunosupresion',
            ])
        ),
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
        fecha_ingreso: Yup.date(),
        fecha_prealta: Yup.date(),
        fecha_egreso: Yup.date(),
        hospitalizado: Yup.boolean()

    });

    if(loading) return 'Cargando...';
    
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
        pac_hemodialisis: obtenerPaciente.pac_hemodialisis,
        diagnostico1: obtenerPaciente.diagnostico1 || [] ,
        diagnostico: obtenerPaciente.diagnostico ,
        caracteristicas_especiales: obtenerPaciente.caracteristicas_especiales || [] ,
        pac_codigo_uveh: obtenerPaciente.pac_codigo_uveh  || [], 
        fecha_ingreso: obtenerPaciente.fecha_ingreso  ? format(new Date(obtenerPaciente.fecha_ingreso), 'yyyy-MM-dd HH:mm') : '', // Si no hay fecha en las props, se establece como cadena vacía
        fecha_prealta: obtenerPaciente.fecha_prealta ? format(new Date(obtenerPaciente.fecha_prealta), 'yyyy-MM-dd') : '', // Si no hay fecha en las props, se establece como cadena vacía
        fecha_egreso: obtenerPaciente.fecha_egreso ? format(new Date(obtenerPaciente.fecha_egreso), 'yyyy-MM-dd') : '',
        hospitalizado: obtenerPaciente.hospitalizado,// Si no hay fecha en las props, se establece como cadena vacía
        cama_relacionada: obtenerPaciente.cama_relacionada
    };


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
            diagnostico1,
            diagnostico,
            caracteristicas_especiales,
            pac_codigo_uveh,
            fecha_ingreso,
            fecha_prealta,
            fecha_egreso,
            hospitalizado,
            cama_relacionada
        } = valores;

        //console.log("Valores Inciales:", valores)

        const valoresActualizados = {
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
            caracteristicas_especiales,
            pac_codigo_uveh,
            fecha_ingreso: fecha_ingreso === '' ? undefined : fecha_ingreso, // Si es cadena vacía, se envía undefined
            fecha_prealta: fecha_prealta === '' ? undefined : fecha_prealta, // Si es cadena vacía, se envía undefined
            fecha_egreso: fecha_egreso === '' ? undefined : fecha_egreso,
            hospitalizado,
            cama_relacionada: cama,
        };

        console.log("Valores actualizados:", valoresActualizados)

        try {
            const { data} = await actualizarPaciente({
                variables: {
                    id,
                    input: valoresActualizados
                }
            });

            console.log("Después de la llamada a actualizarPaciente");

            // Mostrar Alerta
            Swal.fire(
                'Actualizado',
                'El paciente se actualizó correctamente',
                'success'
            )

            // Redireccionar
            router.push('/');
            
        } catch (error) {
            console.error("Error durante la llamada a actualizarPaciente:", error);

            setMensajeError(error.message.replace('GraphQL error: ', ''));
            setTimeout(() => {
                setMensajeError(null);
            }, 3000);
        }
    }

    return ( 
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Paciente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <FormEditPaciente
                        valoresIniciales={valoresIniciales}
                        onSubmit={actualizarInfoPaciente}
                        schemaValidacion={schemaValidacion}
                    />
                </div>
            </div>
        </Layout>
     );
}
 
export default EditarPaciente;