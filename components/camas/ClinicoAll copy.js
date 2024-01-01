import React, {useState, useEffect} from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { format, differenceInYears, differenceInDays, isTomorrow } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'; 
import Router from 'next/router';

import { EditIcon, TaskIcon, BedIcon, Female, Male, Kidneys, SoapIcon } from '../../components/icons';

import { OBTENER_CAMAS } from '../../graphql/queries'; 
import { SUSCRIPCION_ACTUALIZAR_CAMA } from '../../graphql/subscriptions';

const timeZone = 'America/Mexico_City'; // Define la zona horaria

const ClinicoAll = () => {

    const [camas, setCamas] = useState([]);

    // Consultar los camas
    const { data, loading, error } = useQuery(OBTENER_CAMAS);
    const { data: dataSubscription, loading: loadingSubscription, error: errorSubscription } = useSubscription(SUSCRIPCION_ACTUALIZAR_CAMA);
    if (dataSubscription) {
      console.log('Cama actualizada recibido:', dataSubscription);
    }
    useEffect(() => {
      if (data) {
        setCamas(data.obtenerCamas);
      }
    }, [data]);
  
    useEffect(() => {
      if (dataSubscription) {
        const camaActualizada = dataSubscription.actualizarCama;
        setCamas(camasPrev => camasPrev.map(cama => 
          cama.id === camaActualizada.id ? camaActualizada : cama
        ));
      }
    }, [dataSubscription]);

    if (loading) return 'Cargando...';
    if (error) return `Error: ${error.message}`;
    
    if (dataSubscription) {
        console.log('Cama actualizada recibido:', dataSubscription);
      }


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
    'Tuberculosisis_o_sospecha': 'Tuberculosisis o sospecha',
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
      case 'Tuberculosisis_o_sospecha': return 'bg-emerald-300';
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
  
  const navegar = (ruta) => Router.push({ pathname: ruta });

  return (
    
      <>

          <div  className="p-4 backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg w-full w-lg" >

          <table className="table-auto shadow-md mt-2 w-full w-lg ">
            <thead className="bg-gray-800 ">
              <tr className="text-white">
                  <th className="w-1/14 px-1 py-1">Cama</th>
                  <th className="w-1/12 px-1 py-1">Prioridad</th>
                  {/* <th className="w-1/12 px-1 py-1">Estado</th> */}
                  <th className="w-1/12 px-1 py-1">Género</th>
                  <th className="w-1/12 px-1 py-1">O2</th>
                  <th className="w-1/12 px-1 py-1">Hemodialisis</th>
                  <th className="w-1/11 px-1 py-1">Código UVEH</th>
                  <th className="w-1/12 px-1 py-1">Aislamiento</th>
                  <th className="w-1/12 px-1 py-1">DAN</th>

                  <th className="w-1/12 px-1 py-1">Caracteristicas</th>
                  <th className="w-1/12 px-1 py-1">Genero</th>
                  <th className="w-1/12 px-1 py-1">O2</th>
                  <th className="w-1/12 px-1 py-1">Hemodialisis</th>
                  <th className="w-1/11 px-1 py-1">Código UVEH</th>
                  <th className="w-1/12 px-1 py-1">Microorganismos</th>
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
          

                {ultimaAdmision && ultimaAdmision.hospitalizado ? (
                  <>
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
                    <td className="border px-1">
                    {Array.isArray(ultimaAdmision.microorganismo_relacionado) 
                      ? ultimaAdmision.microorganismo_relacionado.map(microorganismo => 
                          <span key={microorganismo.id}>{microorganismo.microorganismo_nombre}</span>
                        ).join(', ') 
                      : ultimaAdmision.microorganismo_relacionado.microorganismo_nombre} 
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
export default ClinicoAll;
