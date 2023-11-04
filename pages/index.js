import Layout from '../components/Layout';
import Paciente from '../components/Paciente';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';

//De aquí con las busquedas reales
const OBTENER_PACIENTES = gql`
query ObtenerPacientes {
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
    diagnostico1
    caracteristicas_especiales
    pac_codigo_uveh
    fecha_ingreso
    fecha_prealta
    fecha_egreso
    hospitalizado
    cama_relacionada {
      id
      cama_numero
      cama_compartida
      cama_disponible
      cama_ocupada
      cama_genero
      cama_dispositivo_o2
      cama_hemodialisis
      cama_aislamiento
      cama_dan
      cama_codigo_uveh
    }
    microorganismo_relacionado {
      id
      fecha_deteccion
      metodo_deteccion
      microorganismo_tipo
      microorganismo_nombre
      susceptibilidad
      comentario_uveh
    }
    antibiotico_relacionado {
      id
      antibiotico_nombre
      antibiotico_comentario
      antibiotico_inicio
      antibiotico_fin
    }
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
        <h2 className="text-xl text-gray-800 font-light">Pacientes</h2>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/23 border px-1 py-1">#</th>
                <th className="w-1/23 border px-1 py-1">Expediente</th>
                <th className="w-1/23 border px-1 py-1">Cama</th>
                <th className="w-1/23 border px-1 py-1">Apellido Paterno</th>
                <th className="w-1/23 border px-1 py-1">Apellido Materno</th>
                <th className="w-1/23 border px-1 py-1">Nombre</th>
                <th className="w-1/23 border px-1 py-1">Edad</th>
                <th className="w-1/23 border px-1 py-1">Genero</th>
                <th className="w-1/23 border px-1 py-1">Dispositivo O2</th>
                <th className="w-1/23 border px-1 py-1">Hemodialisis</th>
                <th className="w-1/23 border px-1 py-1">Caracteristicas Especiales</th>
                <th className="w-1/23 border px-1 py-1">Código UVEH</th>
                <th className="w-1/23 border px-1 py-1">Microorganismo</th>
                <th className="w-1/23 border px-1 py-1">Diagnósticos Generales</th>
                <th className="w-1/23 border px-1 py-1">Diagnósticos Específicos</th>
                <th className="w-1/23 border px-1 py-1">Ingreso</th>
                <th className="w-1/23 border px-1 py-1">DEH</th>
                <th className="w-1/23 border px-1 py-1">Prealta</th>
                <th className="w-1/23 border px-1 py-1">Egreso</th>
                <th className="w-1/23 border px-1 py-1">Hospitalizado</th>
                <th className="w-1/23 border px-1 py-1">Editar</th>
                <th className="w-1/23 border px-1 py-1">Asignar Micro</th>
                <th className="w-1/23 border px-1 py-1">Ver Micro</th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {Array.from(data.obtenerPacientes)
              .sort((a, b) => parseInt(a.cama_numero) - parseInt(b.cama_numero))
              .map((paciente) => (
                <Paciente 
                  key={paciente.id} 
                  paciente={paciente}
                />
            ))}
            </tbody>
          </table>
        
      </Layout>
    </div>
  )
}

export default Index
