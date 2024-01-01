import Layout from '../components/Layout';
import PacienteNoHosp from '../components/PacienteNoHosp';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';

//De aquí con las busquedas reales
import { OBTENER_PACIENTES_NO_HOSPITALIZADOS } from '../graphql/queries';

const NoHospitalizados = () => {

  const router = useRouter();
  // Consulta de Apollo
  const { data, loading, error } = useQuery(OBTENER_PACIENTES_NO_HOSPITALIZADOS);

  //console.log(data)
  // console.log(loading)
  // console.log(error)
  
  if(loading) return 'Cargando....';

  if( !data.obtenerPacientesNoHospitalizados ) {
    return router.push('/login');
  } 

  return (
    <div>
      <Layout>
        <h1 className="text-xl text-gray-800 font-light">Pacientes</h1>

          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="border px-2 py-2">#</th>
                <th className="w-1/20 border px-1 py-1">Expediente</th>
                <th className="w-1/20 border px-1 py-1">Cama</th>
                <th className="w-1/20 border px-1 py-1">Apellido Paterno</th>
                <th className="w-1/20 border px-1 py-1">Apellido Materno</th>
                <th className="w-1/20 border px-1 py-1">Nombre</th>
                <th className="w-1/20 border px-1 py-1">Edad</th>
                <th className="w-1/20 border px-1 py-1">Genero</th>
                <th className="w-1/20 border px-1 py-1">Dispositivo O2</th>
                <th className="w-1/20 border px-1 py-1">Hemodialisis</th>
                <th className="w-1/20 border px-1 py-1">Caracteristicas Especiales</th>
                <th className="w-1/20 border px-1 py-1">Código UVEH</th>
                <th className="w-1/20 border px-1 py-1">Microorganismo</th>
                <th className="w-1/20 border px-1 py-1">Diagnósticos Generales</th>
                <th className="w-1/20 border px-1 py-1">Diagnósticos Específicos</th>
                <th className="w-1/20 border px-1 py-1">Ingreso</th>
                <th className="w-1/20 border px-1 py-1">DEH</th>
                <th className="w-1/20 border px-1 py-1">Egreso</th>
                {/* <th className="border px-2 py-2">Hospitalizado</th> */}
                {/* <th className="w-1/6 py-2 text-xs">Eliminar</th> */}
                <th className="w-1/20 border px-1 py-1">Editar</th>
                <th className="w-1/20 border px-1 py-1">Asignar Micro</th>
                <th className="w-1/20 border px-1 py-1">Ver Micro</th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {Array.from(data.obtenerPacientesNoHospitalizados)
                .sort((a, b) => parseInt(b.cama_numero) - parseInt(a.cama_numero))
                .map((paciente, index) => (
                <PacienteNoHosp 
                  key={paciente.id} 
                  paciente={paciente}
                  contador={index + 1}
                />
              ))}
            </tbody>
          </table>
        
      </Layout>
    </div>
  )
}

export default NoHospitalizados
