import Layout from '../components/Layout';
import Paciente from '../components/Paciente';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link'

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
          diagnostico
          pac_codigo_uveh
          fecha_ingreso
          fecha_prealta
          fecha_egreso
          hospitalizado
          cama_relacionada
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
              <th className="w-1/6 py-2 text-xs">#</th>
                <th className="w-1/6 py-2 text-xs">Expediente</th>
                <th className="w-1/6 py-2 text-xs">Cama</th>
                <th className="w-1/6 py-2 text-xs">Apellido Paterno</th>
                <th className="w-1/6 py-2 text-xs">Apellido Materno</th>
                <th className="w-1/6 py-2 text-xs">Nombre</th>
                <th className="w-1/6 py-2 text-xs">Genero</th>
                <th className="w-1/6 py-2 text-xs">Edad</th>
                <th className="w-1/6 py-2 text-xs">Dispositivo O2</th>
                <th className="w-1/6 py-2 text-xs">Hemodialisis</th>
                <th className="w-1/6 py-2 text-xs">Diagnóstico</th>
                <th className="w-1/6 py-2 text-xs">Código UVEH</th>
                <th className="w-1/6 py-2 text-xs">Ingreso</th>
                <th className="w-1/6 py-2 text-xs">Prealta</th>
                <th className="w-1/6 py-2 text-xs">Egreso</th>
                <th className="w-1/6 py-2 text-xs">Hospitalizado</th>
                {/* <th className="w-1/6 py-2 text-xs">Eliminar</th> */}
                <th className="w-1/6 py-2 text-xs">Editar</th>
                <th className="w-1/6 py-2 text-xs">Microorganismos</th>
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
