import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select'

import PacienteContext from '../../context/pacientes/PacienteContext';

const options = [
  { id: '1', nombre: 'Acinetobacter' },
  { id: '2', nombre: 'Burkholderia' },
  { id: '3', nombre: 'Chlamydophila pneumoniae' },
  { id: '4', nombre: 'Clostridium difficile' },
  { id: '5', nombre: 'Enterobacter spp' },
  { id: '6', nombre: 'Escherichia coli' },
  { id: '7', nombre: 'Haemophilus influenzae' },
  { id: '8', nombre: 'Klebsiella' },
  { id: '9', nombre: 'Legionella' },
  { id: '10', nombre: 'Moraxella catarrhalis' },
  { id: '11', nombre: 'Mycobacterium tuberculosis' },
  { id: '12', nombre: 'Mycobacterias No tuberculosis' },
  { id: '13', nombre: 'Mycoplasma pneumoniae' },
  { id: '14', nombre: 'Neisseria meningitidis' },
  { id: '15', nombre: 'Pseudomonas aeruginosa' },
  { id: '16', nombre: 'Serratia' },
  { id: '17', nombre: 'Staphylococcus aureus' },
  { id: '18', nombre: 'Stenotrophomonas' },
  { id: '19', nombre: 'Streptococcus agalactiae' },
  { id: '20', nombre: 'Streptococcus pneumoniae' },
  { id: '21', nombre: 'Streptococcus pyogenes' },

  { id: '22', nombre: 'Coronavirus' },
  { id: '23', nombre: 'Coronavirus SARS-CoV-2' },
  { id: '24', nombre: 'Coronavirus 229E' },
  { id: '25', nombre: 'Coronavirus NL63' },
  { id: '26', nombre: 'Coronavirus OC43' },
  { id: '27', nombre: 'Coronavirus HKU1' },
  { id: '28', nombre: 'Enterovirus/Rinovirus' },
  { id: '53', nombre: 'Influenza A' },
  { id: '29', nombre: 'Influenza A H1N1' },
  { id: '30', nombre: 'Influenza A H3N2' },
  { id: '31', nombre: 'Influenza B' },
  { id: '32', nombre: 'Metapneumovirus' },
  { id: '33', nombre: 'Parainfluenza 1' },
  { id: '34', nombre: 'Parainfluenza 2' },
  { id: '35', nombre: 'Parainfluenza 3' },
  { id: '36', nombre: 'Parainfluenza 4' },
  { id: '37', nombre: 'Virus de Epstein-Barr' },
  { id: '38', nombre: 'Virus Hepatitis B' },
  { id: '39', nombre: 'Virus Hepatitis C' },
  { id: '40', nombre: 'Virus Herpes Simple' },
  { id: '41', nombre: 'Virus Herpes Zoster' },
  { id: '42', nombre: 'VIH' },
  { id: '43', nombre: 'Virus Sincitial Respiratorio' },

  { id: '44', nombre: 'Aspergillus' },
  { id: '45', nombre: 'Blastomyces dermatitidis' },
  { id: '46', nombre: 'Candida' },
  { id: '47', nombre: 'Coccidioides immitis' },
  { id: '48', nombre: 'Cryptococcus neoformans' },
  { id: '49', nombre: 'Histoplasma capsulatum' },
  { id: '50', nombre: 'Mucorales' },
  { id: '51', nombre: 'Pneumocystis jirovecii' },

  { id: '52', nombre: 'Otros' },

]

export const AsignarMicroorganismo = ({ id }) => {
  
    const[microorganismo, setMicroorganismo] =useState({});

    //Context de microorganismo
    const { agregarMicroorganismo } = useContext(PacienteContext);
   
    console.log("Nombre del Microorganismo ",microorganismo.nombre)

    useEffect(() => {
         agregarMicroorganismo (microorganismo.nombre);
     }, [microorganismo.nombre])


   
    const seleccionarMicroorganismo = microorganismos => {
        setMicroorganismo(microorganismos);
      }
   
    return ( 
      <div className="mb-4">
      <label id={`${id}-label`} className="block text-gray-700 text-sm font-bold mb-2">
          Nombre del Microorganismo
      </label>
      <Select
          className="mt-3"
          aria-labelledby={`${id}-label`}
          options={options}
          onChange={opcion => seleccionarMicroorganismo(opcion)}
          getOptionValue={opciones => opciones.id}
          getOptionLabel={opciones => opciones.nombre}
          placeholder="Busque o Seleccione un Microorganismo"
          noOptionsMessage={() => "No se encuentra ese microorganismo disponible"}
      />
  </div>
     );
}
 