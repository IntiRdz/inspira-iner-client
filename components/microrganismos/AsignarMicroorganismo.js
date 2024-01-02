import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'

import PacienteContext from '../../context/pacientes/PacienteContext';

const options = [
  { id: '1', nombre: 'Streptococcus pneumoniae' },
  { id: '2', nombre: 'Haemophilus influenzae' },
  { id: '3', nombre: 'Moraxella catarrhalis' },
  { id: '4', nombre: 'Staphylococcus aureus' },
  { id: '5', nombre: 'Mycoplasma pneumoniae' },
  { id: '6', nombre: 'Chlamydophila pneumoniae' },
  { id: '7', nombre: 'Legionella pneumophila' },
  { id: '8', nombre: 'Klebsiella pneumoniae' },
  { id: '9', nombre: 'Escherichia coli' },
  { id: '10', nombre: 'Pseudomonas aeruginosa' },
  { id: '11', nombre: 'Enterobacter spp' },
  { id: '12', nombre: 'Streptococcus pyogenes' },
  { id: '13', nombre: 'Streptococcus agalactiae' },
  { id: '14', nombre: 'Mycobacterium tuberculosis' },
  { id: '15', nombre: 'Mycobacterias No tuberculosis' },
  { id: '16', nombre: 'Neisseria meningitidis' },
  { id: '17', nombre: 'Clostridium difficile' },

  { id: '18', nombre: 'Influenza' },
  { id: '20', nombre: 'Coronavirus' },
  { id: '19', nombre: 'Rinovirus' },
  { id: '19', nombre: 'Virus Sincitial Respiratorio' },
  { id: '21', nombre: 'Parainfluenza' },
  { id: '22', nombre: 'Metapneumovirus' },
  { id: '23', nombre: 'Virus de Epstein-Barr' },
  { id: '24', nombre: 'Virus Hepatitis B' },
  { id: '25', nombre: 'Virus Hepatitis C' },
  { id: '26', nombre: 'VIH' },
  { id: '27', nombre: 'Virus Herpes Simple' },
  { id: '28', nombre: 'Virus Herpes Zoster' },

  { id: '29', nombre: 'Aspergillus' },
  { id: '30', nombre: 'Candida' },
  { id: '31', nombre: 'Histoplasma capsulatum' },
  { id: '32', nombre: 'Coccidioides immitis' },
  { id: '33', nombre: 'Blastomyces dermatitidis' },
  { id: '34', nombre: 'Pneumocystis jirovecii' },
  { id: '35', nombre: 'Cryptococcus neoformans' },
  { id: '36', nombre: 'Mucorales' },

  { id: '20', nombre: 'Otros' },

]

export const AsignarMicroorganismo = () => {
  
    const[microorganismo, setMicroorganismo] =useState({});

    //Context de microorganismo
    const { agregarMicroorganismo } = useContext(PacienteContext);
   
    console.log("Nombre del Microorganismo ",microorganismo.nombre)

    useEffect(() => {
         agregarMicroorganismo (microorganismo.nombre);
     }, [microorganismo.nombre, agregarMicroorganismo])


   
    const seleccionarMicroorganismo = microorganismos => {
        setMicroorganismo(microorganismos);
      }
   
    return ( 
        <>
          <Select
            className="mt-3"
            options={ options }
            onChange={ opcion => seleccionarMicroorganismo(opcion) }
            getOptionValue={ opciones => opciones.id }
            getOptionLabel={ opciones => opciones.nombre }
            placeholder="Busque o Seleccione un Microorganismo"
            noOptionsMessage={() => "No se encuentra ese microorganismo disponible"}
          />
        </>
     );
}
 