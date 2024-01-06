import React, {useState} from 'react';
import { DocuPDF } from '../pdf/DocuPDF';
import { DocuPDF2 } from '../pdf/DocuPDF2';
import { PDFViewer } from '@react-pdf/renderer';
import { TablaTamiz } from '../tablas/TablaTamiz';



export default function  PdfPacPrograma ({obtenerPaciente}) {

    const [mostrarPDF, setMostrarPDF] = useState(false);
    const [mostrarPDF2, setMostrarPDF2] = useState(false);

  return (
    <>
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
                    <DocuPDF data={obtenerPaciente} />
                </PDFViewer>
                )}
            </div>
        </div>
        <div className="flex justify-center ">        
            <div className="w-full max-w-4xl">
                <div className="flex justify-center mt-6">
                    <button
                        type="button"
                        onClick={() => setMostrarPDF2(!mostrarPDF2)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                    >
                        {mostrarPDF2 ? 'Ocultar PDF' : 'Ver PDF'}
                    </button>
                </div>
                {/* Condición para renderizar el PDFViewer */}
                {mostrarPDF2 && (
                <PDFViewer style={{width:"100%", height:"90vh"}}>
                    <DocuPDF2 data={obtenerPaciente} />
                </PDFViewer>
                )}
            </div>
        </div>

        <div>
            <TablaTamiz />
        </div>

    </>
  )
}