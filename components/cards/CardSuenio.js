import { WheelchairIcon } from "../icons/WheelchairIcon";



export default function CardSuenio({
    programa_suenio_imc, 
    programa_suenio_hipoventilacion,
    programa_suenio_restriccionTorax,
    programa_suenio_neuromuscular,
}) {

    function renderizarValor(valor) {
        if (valor === null) {
            return 'Sin contestar';
        }
        return valor ? 'Sí' : 'No';
    }

    console.log("Sorpresa",programa_suenio_imc)
    
    return (

        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div 
                className="h-48 lg:h-auto lg:w-20 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-gray-400 border-2" 
                title="Tamiz sueño">
               {/* <AstronautIcon className="h-full w-full text-gray-400" />  */}
               <WheelchairIcon className="h-2/4 w-2/4 text-gray-400" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Tamiz sueño
                    </div>
                    <p className="text-gray-700 text-base">
                        IMC =  {renderizarValor(programa_suenio_imc)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Hipoventilacion Crónica = {renderizarValor (programa_suenio_hipoventilacion )}
                    </p>
                    <p className="text-gray-700 text-base">
                        Restricción de Caja Torácica = {renderizarValor(programa_suenio_restriccionTorax)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Enfermedad Neuromuscular  ={renderizarValor(programa_suenio_neuromuscular)}
                    </p>
                </div>
            </div>
        </div>
    );
  }












