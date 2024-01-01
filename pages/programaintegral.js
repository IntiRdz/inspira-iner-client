import React, {useState} from 'react';
import { DocuPDF } from '../components/pdf/DocuPDF';
import { PDFViewer } from '@react-pdf/renderer';
import { TablaTamiz } from '../components/tablas/TablaTamiz';
import {  useQuery } from '@apollo/client';

import { OBTENER_PACIENTES_HOSPITALIZADOS } from '../graphql/queries';


const ProgramaIntegral = () => {

    const [mostrarPDF, setMostrarPDF] = useState(false);
    const { data, loading, error } = useQuery(OBTENER_PACIENTES_HOSPITALIZADOS);
    console.log("data",data)

    return (
    <div className="flex justify-center ">        
    <div className="w-full max-w-4xl">
    <div className="flex justify-center mt-6">
      <button
          type="button"
          onClick={() => setMostrarPDF(!mostrarPDF)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
          {mostrarPDF ? 'Ocultar PDF' : 'Ver PDF'}
      </button>
    </div>
    {/* Condición para renderizar el PDFViewer */}
    {mostrarPDF && (
    <PDFViewer style={{width:"100%", height:"90vh"}}>
        <DocuPDF data={data.obtenerPacientesHospitalizados} />
    </PDFViewer>
    )}
    </div>
    <div>

    <TablaTamiz />
    </div>
</div>
  )
}

export default ProgramaIntegral