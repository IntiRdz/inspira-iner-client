import Layout from '../components/Layout';
import Paciente from '../components/Paciente';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link'


//De aquí con las busquedas reales
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
          fecha_ingreso
          fecha_prealta
          fecha_egreso
          hospitalizado
          cama_relacionada
          microorganismo_relacionado

        }
    }
`;



const Index = () => {

  const router = useRouter();

  // Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_PACIENTES);

  //console.log(data)
  // console.log(loading)
  // console.log(error)
  
  if(loading) return 'Cargando....';

  if( !data.obtenerPacientes ) {
    return router.push('/login');
  } 

  return (
    <div>
      <Layout>
        <h1 className="text-xl text-gray-800 font-light">Pacientes</h1>
        <Link href="/nuevopaciente">
          <a className="bg-blue-800 py-2 px-4 mt-3 inline-block text-white rounded text-xs hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">Nuevo Paciente</a>
        </Link>

        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
              <th className="border px-2 py-2">#</th>
                <th className="border px-2 py-2">Expediente</th>
                <th className="border px-2 py-2">Cama</th>
                <th className="border px-2 py-2">Apellido Paterno</th>
                <th className="border px-2 py-2">Apellido Materno</th>
                <th className="border px-2 py-2">Nombre</th>
                <th className="border px-2 py-2">Genero</th>
                <th className="border px-2 py-2">Edad</th>
                <th className="border px-2 py-2">Dispositivo O2</th>
                <th className="border px-2 py-2">Hemodialisis</th>
                <th className="border px-2 py-2">Diagnósticos Generales</th>
                <th className="border px-2 py-2">Diagnósticos Específicos</th>
                <th className="border px-2 py-2">Código UVEH</th>
                <th className="border px-2 py-2">Ingreso</th>
                <th className="border px-2 py-2">Prealta</th>
                <th className="border px-2 py-2">Egreso</th>
                <th className="border px-2 py-2">Hospitalizado</th>
                {/* <th className="w-1/6 py-2 text-xs">Eliminar</th> */}
                <th className="border px-2 py-2">Editar</th>
                <th className="border px-2 py-2">Asignar Micro</th>
                <th className="border px-2 py-2">Ver Micro</th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {data.obtenerPacientes
                .sort((a, b) => parseInt(b.cama_numero) - parseInt(a.cama_numero))
                .map((paciente,) => (
                <Paciente 
                  key={paciente.id} 
                  paciente={paciente}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  )
}

export default Index
