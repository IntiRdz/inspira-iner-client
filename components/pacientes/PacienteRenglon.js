import React, { useState } from 'react';
import {differenceInYears} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz'; 
import { EditIcon, Female, Kidneys, Male } from '../icons';
import EditarPaciente from './EditarPaciente';

const timeZone = 'America/Mexico_City'; // Definir la zona horaria

const PacienteRenglon = ({obtenerPaciente}) => {

  const [editPatient, setEditPatient] = useState(false);

  // Verificación de fechas y diagnósticos
  const calcularEdad = fechaNacimiento => {
    if (!fechaNacimiento) return '';
    const fechaNacZoned = utcToZonedTime(new Date(fechaNacimiento), timeZone);
    return differenceInYears(new Date(), fechaNacZoned);
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
    
    
      //console.log("obtenerPaciente", obtenerPaciente);

  return (
    <div>
        <table className="table-auto shadow-md mt-2 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/23 border px-1 py-1">Expediente</th>
                <th className="w-1/23 border px-1 py-1">Caracteristicas Especiales</th>
                <th className="w-1/23 border px-1 py-1">Nombre</th>
                <th className="w-1/23 border px-1 py-1">Apellido Paterno</th>
                <th className="w-1/23 border px-1 py-1">Apellido Materno</th>
                <th className="w-1/23 border px-1 py-1">Edad</th>
                <th className="w-1/23 border px-1 py-1">Genero</th>
                <th className="w-1/23 border px-1 py-1">Dispositivo O2</th>
                <th className="w-1/23 border px-1 py-1">Hemodialisis</th>
                <th className="w-1/23 border px-1 py-1">Código UVEH</th>
                <th className="w-1/23 border px-1 py-1">Diagnósticos Generales</th>
                <th className="w-1/23 border px-1 py-1">Diagnósticos Específicos</th>
                <th className="w-1/23 border px-1 py-1">Editar</th>
              </tr>
            </thead>
            <tbody className="bg-white">
            <tr>
                <td className="border px-1 py-1">{obtenerPaciente.expediente}</td>
                <td className="border px-1 ">
                        {Array.isArray(obtenerPaciente.caracteristicas_especiales)
                            ? obtenerPaciente.caracteristicas_especiales.map((caracteristica, index) => (
                                <div key={index}>{CaracteristicasPacienteText(caracteristica)}</div>
                              ))
                            : (obtenerPaciente.caracteristicas_especiales || '')
                        }
                    </td>
                <td className="border px-1 py-1">{obtenerPaciente.pac_nombre}</td>
                <td className="border px-1 py-1">{obtenerPaciente.pac_apellido_paterno}</td>
                <td className="border px-1 py-1">{obtenerPaciente.pac_apellido_materno}</td>
                <td className="border px-1 py-1">{calcularEdad(obtenerPaciente.pac_FN)}</td>
                <td className="border px-1 py-1">{obtenerPaciente.pac_genero ==='Mujer' ? <Female width="2rem" height="2rem" color="#c084fc" style={{ display: 'inline-block' }}/> : obtenerPaciente.pac_genero === 'Hombre' ? <Male width="2rem" height="2rem" color="#1e40af" style={{ display: 'inline-block' }} /> : ''}</td>
                <td className="border px-1 py-1">{obtenerPaciente.pac_dispositivo_o2}</td>
                <td className="border px-1 py-1">{obtenerPaciente.pac_hemodialisis? <Kidneys width="2rem" height="2rem" color="#1e40af" style={{ display: 'inline-block' }}/> : ''}</td>
                <td className={`border px-1 text-left ${
                        Array.isArray(obtenerPaciente.pac_codigo_uveh) 
                        ? obtenerPaciente.pac_codigo_uveh.map(uvehColorPaciente).join(' ') 
                        : getUvehColor(obtenerPaciente.pac_codigo_uveh.pac_codigo_uveh)
                    }`}>
                        {Array.isArray(obtenerPaciente.pac_codigo_uveh) 
                        ? obtenerPaciente.pac_codigo_uveh.map((codigo, index) => (
                            <div key={index}>{aislamientoPacienteText(codigo)}</div>
                          ))
                        : aislamientoPacienteText(obtenerPaciente.pac_codigo_uveh)
                        }
                    </td>
                <td className="border px-1 py-1">{obtenerPaciente.diagnostico1 || []}</td>
                <td className="border px-1 py-1">{obtenerPaciente.diagnostico}</td>
                <td className="border px-1">
                      <span className="flex justify-center items-center">
                        <button 
                          onClick={() => setEditPatient(!editPatient)}
                          className="tooltip mr-2 flex justify-center items-center bg-blue-800 p-2  rounded text-xs"
                          data-tooltip="Editar"
                        >
                          <EditIcon color='white' />
                        </button>
                      </span>
                </td>
              </tr>
            </tbody>
          </table>


          <div className="w-full w-lg">              
                    {editPatient && <EditarPaciente obtenerPaciente ={obtenerPaciente}/>}

                </div>
    </div>
  )
}

export default PacienteRenglon