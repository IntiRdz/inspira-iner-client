import { WheelchairIcon } from "../icons/WheelchairIcon";



export default function CardPaliativos({
    programa_paliativos_sorpresa, 
    programa_paliativos_perdida_funcionalidad,
    programa_paliativos_perdida_nutricional,
    programa_paliativos_multimorbilidad,
    programa_paliativos_recursosOingresos,
    programa_paliativos_otraEnfermedaAvanzada,
    programa_paliativos_total,
    programa_paliativos_ecog
}) {

    function renderizarValor(valor) {
        if (valor === null) {
            return 'Nulo';
        }
        return valor ? 'Sí' : 'No';
    }

    console.log("Sorpresa",programa_paliativos_sorpresa)
    
    return (

        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div 
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
                title="Tamiz Paliativos">
               {/* <AstronautIcon className="h-full w-full text-gray-400" />  */}
               <WheelchairIcon className="h-5/6 w-5/6 text-gray-400" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Tamiz Paliativos
                    </div>
                    <p className="text-gray-700 text-base">
                        Sorpresa =  {renderizarValor(programa_paliativos_sorpresa)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Pérdida Funcionalidad = {renderizarValor (programa_paliativos_perdida_funcionalidad )}
                    </p>
                    <p className="text-gray-700 text-base">
                        Perdida Nuticional = {renderizarValor(programa_paliativos_perdida_nutricional)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Multimorbilidiad  ={renderizarValor(programa_paliativos_multimorbilidad)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Recurso o ingresos = {renderizarValor(programa_paliativos_recursosOingresos)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Otra enfermedad avanzada = {renderizarValor(programa_paliativos_otraEnfermedaAvanzada)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Puntuacion Paliativos Total = {programa_paliativos_total }
                    </p>
                    <p className="text-gray-700 text-base">
                        ECOG  ={programa_paliativos_ecog }
                    </p>
                </div>
            </div>
        </div>
    );
  }












