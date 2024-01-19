import { WheelchairIcon } from "../icons/WheelchairIcon";



export default function CardNutricion({
    programa_nutricion_puntuacion, 
    programa_nutricion_grupoRiesgo,
    programa_nutricion_via,
}) {

    function renderizarValor(valor) {
        if (valor === null) {
            return 'Sin contestar';
        }
        return valor ? 'Sí' : 'No';
    }

    console.log("Nutrición Puntuación",programa_nutricion_puntuacion)
    
    return (

        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div 
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
                title="Tamiz Nutrición">
               {/* <AstronautIcon className="h-full w-full text-gray-400" />  */}
               <WheelchairIcon className="h-5/6 w-5/6 text-gray-400" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Tamiz Nutrición
                    </div>
                    <p className="text-gray-700 text-base">
                    PUNTOS VALORACION DE RIESGO NUTRICIONAL  = {programa_nutricion_puntuacion}
                    </p>
                    <p className="text-gray-700 text-base">
                        Grupo de riesgo = {programa_nutricion_grupoRiesgo}
                    </p>
                    <p className="text-gray-700 text-base">
                        Via de alimentación = {programa_nutricion_via}
                    </p>
                </div>
            </div>
        </div>
    );
  }












