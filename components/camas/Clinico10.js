'use client';
import { useQuery, useSubscription } from '@apollo/client';
import { format, differenceInYears, differenceInDays, isTomorrow } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'; 
import { useRouter } from 'next/navigation';

import { EditIcon, TaskIcon, BedIcon, Female, Male, Kidneys, SoapIcon } from '../icons';

import { OBTENER_CAMAS_10 } from '../../graphql/queries'; 

const timeZone = 'America/Mexico_City'; // Define la zona horaria

export default function Clinico10 (){

  const router = useRouter();

  const { data, loading, error } = useQuery(OBTENER_CAMAS_10);

  if (loading) {
    return <h2><a href="#loading" aria-hidden="true" className="aal_anchor" id="loading"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fillRule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const camas = data ? data.obtenerCamas10 : [];

  const camasOrdenadas = [...camas].sort((a, b) => a.cama_numero - b.cama_numero);
  console.log(camasOrdenadas)

  // Verificación de fechas y diagnósticos
  const calcularEdad = fechaNacimiento => {
    if (!fechaNacimiento) return '';
    const fechaNacZoned = utcToZonedTime(new Date(fechaNacimiento), timeZone);
    return differenceInYears(new Date(), fechaNacZoned);
  };
  // Función para calcular los días de estancia basado en fecha de ingreso y egreso
  const calcularDiasEstancia = (fechaIngreso, fechaEgreso) => {
    if (!fechaIngreso) return '';
    const inicio = utcToZonedTime(new Date(fechaIngreso), timeZone);
    const fin = fechaEgreso ? utcToZonedTime(new Date(fechaEgreso), timeZone) : utcToZonedTime(new Date(), timeZone);
    return differenceInDays(fin, inicio);
  };

  // Verificar si es mañana para fecha prealta
  const calcularFechaPreAltaClasses = (fechaPrealta) => {
    if (!fechaPrealta) return "border px-1 py-1";
    const fechaPrealtaZoned = utcToZonedTime(new Date(fechaPrealta), timeZone);
    return isTomorrow(fechaPrealtaZoned) ? "border px-1 py-1 bg-blue-500 text-white" : "border px-1 py-1";
  };

  
  const aislamientoCamaTextMap = {
    'Sin_Definir': 'Sin definir',
    'Sin_Aislamientos': ' ',
    'Previamente_Acinetobacter': 'Previamente Acinetobacter',
    'Previamente_Clostridium': 'Previamente Clostridium',
    'Previamente_Enterobacterias_XDR': 'Previamente Enterobacterias XDR',
    'Previamente_Pseudomonas_Aeruginosa_XDR': 'Previamente Pseudomonas Aeruginosa XDR',
    // ...otros casos...
  };
  const aislamientoCamaText = (codigo) => aislamientoCamaTextMap[codigo] || codigo;

  const getUvehColor = (codigoUveh) => {
    switch (codigoUveh) {
      case 'Previamente_Acinetobacter': return 'bg-pink-300';
      case 'Previamente_Clostridium': return 'bg-emerald-300';
      case 'Previamente_Enterobacterias_XDR': return 'bg-violet-300';
      case 'Previamente_Pseudomonas_Aeruginosa_XD': return 'bg-amber-400';
      default: return ''; 
    }
  };

  const aislamientoPacienteTextMap = {
    'Sin_Definir': 'Sin definir',
    'Sin_Aislamientos': ' ',
    'Acinetobacter': 'Acinetobacter',
    'Colonizacion_Acinetobacter': 'Colonización Acinetobacter',
    'Contacto_Acinetobacter': 'Contacto Acinetobacter',
    'Hisopado_Rectal': 'Hisopado Rectal',
    'Clostridium_Difficile': 'Clostridium Difficile',
    'Enterobacterias_XDR_MDR': 'Enterobacterias XDR/MDR',
    'Pseudomonas_XDR_MDR': 'Pseudomonas XDR/MDR',
    'Tuberculosisis_o_Sospecha': 'Tuberculosisis o sospecha',
    'SAMR': 'SAMR',
    'SAMS': 'SAMS',
    // ...otros casos...
  };
  const aislamientoPacienteText = (codigo) => aislamientoPacienteTextMap[codigo] || codigo;


  const uvehColorPaciente = (pac_codigo_uveh) => {
    switch (pac_codigo_uveh) {
      case 'Acinetobacter': return 'bg-pink-300';
      case 'Colonizacion_Acinetobacter': return 'bg-pink-300';
      case 'Contacto_Acinetobacter': return 'bg-pink-300';
      case 'Hisopado_Rectal': return 'bg-pink-300';
      case 'Clostridium_Difficile': return 'bg-emerald-300';
      case 'Enterobacterias_XDR_MDR': return 'bg-violet-300';
      case 'Pseudomonas_XDR_MDR': return 'bg-amber-400';
      case 'Tuberculosisis_o_Sospecha': return 'bg-emerald-300';
      case 'SAMR': return 'bg-emerald-300';
      case 'SAMS': return 'bg-emerald-300';
      default: return ''; 
    }
  };
  
  
  const caracteristicasPacienteTextMap = {
    'TrasladoDeHospital': 'Traslado de Hospital',
    'InfeccionReciente': 'Infección Reciente',
    'Embarazo': 'Embarazo',
    'Inmunosupresion': 'Inmunosupresión',
    'ComunidadLG': 'Comunidad LG',

    // ...otros casos...
  };
  const CaracteristicasPacienteText = (codigo) => caracteristicasPacienteTextMap[codigo] || codigo;



const progreso = 30;
  
  const navegar = (ruta) => router.push(ruta);

  return (
    
      <>

          <div  className="p-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg w-full w-lg" >

          <table className="table-auto shadow-md mt-2 w-full w-lg ">
            <thead className="bg-gray-800 ">
              <tr className="text-white">
                  {/* <th className="w-1/12 px-1 py-1">Estado</th> */}
                  <th className="w-1/14 px-1 py-1">Cama</th>
                  <th className="w-1/12 px-1 py-1">Prioridad</th>
                  <th className="w-1/12 px-1 py-1">Género</th>
                  <th className="w-1/12 px-1 py-1">O2</th>
                  <th className="w-1/12 px-1 py-1">Hemodialisis</th>
                  <th className="w-1/11 px-1 py-1">Código UVEH</th>
                  <th className="w-1/12 px-1 py-1">Aislamiento</th>
                  <th className="w-1/12 px-1 py-1">DAN</th>
                  <th className="w-1/12 px-1 py-1">Editar</th>

                  <th className="w-1/12 px-1 py-1">Tratante</th>
                  <th className="w-1/12 px-1 py-1">Caracteristicas</th>
                  <th className="w-1/12 px-1 py-1">Genero</th>
                  <th className="w-1/12 px-1 py-1">O2</th>
                  <th className="w-1/12 px-1 py-1">Hemodialisis</th>
                  <th className="w-1/11 px-1 py-1">Código UVEH</th>
                  <th className="w-1/12 px-1 py-1">Expediente</th>
                  <th className="w-1/12 px-1 py-1">Nombre</th>
                  <th className="w-1/11 px-1 py-1">Apellido Paterno</th>
                  <th className="w-1/12 px-1 py-1">Apellido Materno</th>
                  <th className="w-1/12 px-1 py-1">Edad</th>
                  <th className="w-1/12 px-1 py-1">Ingreso</th>
                  <th className="w-1/12 px-1 py-1">Prealta</th>
                  <th className="w-1/12 px-1 py-1">DEH</th>
                  <th className="w-1/12 px-1 py-1">Microorganismos</th>
                  <th className="w-1/12 px-1 py-1">Atención Integral</th>
                  <th className="w-1/12 px-1 py-1">Editar</th>
              </tr>
            </thead>
            <tbody>
            {camasOrdenadas.map((cama) => {
              // Asumiendo que 'camahistorial' es un arreglo y queremos la última entrada
              const ultimoHistorial = cama.camahistorial && cama.camahistorial.length > 0
                ? cama.camahistorial[cama.camahistorial.length - 1]
                : null;

              // Acceder a 'admision_relacionada' a través del 'ultimoHistorial'
              const ultimaAdmision = ultimoHistorial && ultimoHistorial.admision_relacionada
                ? ultimoHistorial.admision_relacionada
                : {};

              // Calcular las clases para la fecha de prealta
              let fechaPreAltaClasses = calcularFechaPreAltaClasses(ultimaAdmision.fecha_prealta);

            return (
              <tr key={cama.id} className={`${cama.cama_lado === 'Arriba' ? 'border-t-2 border-t-sky-700' : cama.cama_lado === 'Bajo' ? 'border-b-2 border-b-sky-700' : ''} ${!cama.cama_ocupada ? 'bg-gray-200' : ''}`}>
                {/* <td className="border px-1">{cama.cama_ocupada ? 'Ocupada' : 'Libre'}</td> */}
                <td className= "border px-1 text-center text-white bg-blue-800">{cama.cama_numero}</td>
                <td className= "border px-1 text-left"  >{cama.cama_prioridad !== "SinPrioridad" ? cama.cama_prioridad : ''}</td>
                <td className= "border px-1 text-center">{cama.cama_genero === 'Mujer' ? <Female width="2rem" height="2rem" color='#808080' style={{ display: 'inline-block' }} /> : cama.cama_genero === 'Hombre' ? <Male width="2rem" height="2rem" color='#808080' style={{ display: 'inline-block' }}/> : ''}</td>
                <td className= "border px-1 text-center">{cama.cama_dispositivo_o2}</td>
                <td className= "border px-1 text-center">{cama.cama_hemodialisis ? <Kidneys width="2rem" height="2rem" color='#808080' style={{ display: 'inline-block' }} /> : ''}</td>
                <td className={`border px-1 text-left ${getUvehColor(cama.cama_codigo_uveh)}`}>{aislamientoCamaText(cama.cama_codigo_uveh)}</td>
                <td className={`border px-1 text-center ${cama.cama_aislamiento ? 'bg-rose-200' : ''}`}>{cama.cama_aislamiento ? 'Aislamiento' : ''}</td>
                <td className={`border px-1 text-center ${cama.cama_dan ? 'bg-red-200' : ''}`}>{cama.cama_dan ? <SoapIcon width="2rem" height="2rem" style={{ display: 'inline-block' }} /> : ''}</td>
          
                <td className="border px-1 border-r-2 border-r-sky-700 ">
                  <span className="flex justify-center items-center">
                    <button 
                      onClick={() => navegar(`/editarcama/${cama.id}`)}
                      className="tooltip flex justify-center items-center bg-blue-800 p-2 rounded text-xs"
                      data-tooltip="Editar"
                    >
                      <EditIcon color='white' />
                    </button>
                  </span>

                </td>
                {cama.cama_ocupada && ultimaAdmision && ultimaAdmision.hospitalizado ? (
                  <>
                    <td className="border px-1 ">{ultimaAdmision.servicio_tratante || ''}</td>
                    <td className="border px-1 ">
                        {Array.isArray(ultimaAdmision.paciente_relacionado.caracteristicas_especiales)
                            ? ultimaAdmision.paciente_relacionado.caracteristicas_especiales.map((caracteristica, index) => (
                                <div key={index}>{CaracteristicasPacienteText(caracteristica)}</div>
                              ))
                            : (ultimaAdmision.paciente_relacionado.caracteristicas_especiales || '')
                        }
                    </td>

                    <td className="border px-1 text-center">{ultimaAdmision.paciente_relacionado.pac_genero ==='Mujer' ? <Female width="2rem" height="2rem" color="#c084fc" style={{ display: 'inline-block' }}/> : ultimaAdmision.paciente_relacionado.pac_genero === 'Hombre' ? <Male width="2rem" height="2rem" color="#1e40af" style={{ display: 'inline-block' }} /> : ''}</td>
                    <td className="border px-1 text-center">{ultimaAdmision.paciente_relacionado.pac_dispositivo_o2 || ''}</td>
                    <td className="border px-1 text-center">{ultimaAdmision.paciente_relacionado.pac_hemodialisis ? <Kidneys width="2rem" height="2rem" color="#1e40af" style={{ display: 'inline-block' }}/> : ''}</td>
                    <td className={`border px-1 text-left ${
                        Array.isArray(ultimaAdmision.paciente_relacionado.pac_codigo_uveh) 
                        ? ultimaAdmision.paciente_relacionado.pac_codigo_uveh.map(uvehColorPaciente).join(' ') 
                        : getUvehColor(ultimaAdmision.paciente_relacionado.pac_codigo_uveh)
                    }`}>
                        {Array.isArray(ultimaAdmision.paciente_relacionado.pac_codigo_uveh) 
                        ? ultimaAdmision.paciente_relacionado.pac_codigo_uveh.map((codigo, index) => (
                            <div key={index}>{aislamientoPacienteText(codigo)}</div>
                          ))
                        : aislamientoPacienteText(ultimaAdmision.paciente_relacionado.pac_codigo_uveh)
                        }
                    </td>
                    <td className="border px-1 text-center">{ultimaAdmision.paciente_relacionado.expediente || ''}</td>
                    <td className="border px-1 ">{ultimaAdmision.paciente_relacionado.pac_nombre || ''}</td>
                    <td className="border px-1 ">{ultimaAdmision.paciente_relacionado.pac_apellido_paterno || ''}</td>
                    <td className="border px-1 ">{ultimaAdmision.paciente_relacionado.pac_apellido_materno || ''}</td>
                    <td className="border px-1 text-center">{calcularEdad(ultimaAdmision.paciente_relacionado.pac_FN) || ''}</td>
                    <td className="border px-1 ">{ultimaAdmision.fecha_ingreso ? format(utcToZonedTime(new Date(ultimaAdmision.fecha_ingreso), timeZone), 'dd/MM/yy') : ''}</td>
                    <td className={fechaPreAltaClasses}>{ultimaAdmision.fecha_prealta ? format(utcToZonedTime(new Date(ultimaAdmision.fecha_prealta), timeZone), 'dd/MM/yy') : ''}</td>
                    <td className="border px-1 text-center">{calcularDiasEstancia(ultimaAdmision.fecha_ingreso)}</td>
                    <td className="border px-1">
                      {ultimaAdmision.cama_relacionada.flatMap(cama => 
                        Array.isArray(cama.microorganismo_relacionado) 
                          ? cama.microorganismo_relacionado.map(microorganismo => microorganismo.microorganismo_nombre) 
                          : [cama.microorganismo_relacionado.microorganismo_nombre]
                      ).join(', ')}
                    </td>
                    <td className="border px-1 relative">
                      <div className="w-full bg-gray-200 rounded">
                          <div 
                              className="bg-blue-800 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded" 
                              style={{ width: `${progreso}%` }}
                          >
                              {progreso}%
                          </div>
                      </div>
                    </td>
                    <td className="border px-1">
                      <span className="flex justify-center items-center">
                        <button 
                          onClick={() => navegar(`/programaintegral/${ultimaAdmision.paciente_relacionado.id}`)}
                          className="tooltip mr-2 flex justify-center items-center bg-blue-800 p-2  rounded text-xs"
                          data-tooltip="Programa Integral"
                        >
                          <TaskIcon color='white' />
                        </button>
                        <button 
                          onClick={() => navegar(`/editarpaciente/${ultimaAdmision.paciente_relacionado.id}`)}
                          className="tooltip mr-2 flex justify-center items-center bg-blue-800 p-2  rounded text-xs"
                          data-tooltip="Editar"
                        >
                          <EditIcon color='white' />
                        </button>
                        <button 
                          onClick={() => navegar(`/newbed/${ultimaAdmision.paciente_relacionado.id}`)}
                          className="tooltip flex justify-center items-center bg-blue-800 p-2 rounded text-xs"
                          data-tooltip="Cambiar Cama"
                        >
                          <BedIcon color='white' />
                        </button>
                      </span>
                    </td>
                  </>
                ) : (
                  <>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                  <td className="border px-1"></td>
                </>
                )}
              </tr>
            );
          })}
        </tbody>

        </table>
        </div>

      </>
    
  );
}