import { WheelchairIcon } from "../icons/WheelchairIcon";

export default function CardDiscapacidad({
    programa_discapacidad_hipoacusia, 
    programa_discapacidad_disminucion_visual,
    programa_discapacidad_perdida_barthel,
    programa_discapacidad_disminucion_cognitiva,
    programa_discapacidad_gds_fast,
    programa_discapacidad_nu_desc
}) {


    function renderizarValor(valor) {
        if (valor === null) {
            return 'Sin contestar';
        }
        return valor ? 'Sí' : 'No';
    }

    console.log("hipoacusia",programa_discapacidad_hipoacusia)
    
    return (

        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div 
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" 
                title="Tamiz Discapacidad">
               {/* <AstronautIcon className="h-full w-full text-gray-400" />  */}
               <WheelchairIcon className="h-5/6 w-5/6 text-gray-400" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Tamiz Discapacidad
                    </div>
                    <p className="text-gray-700 text-base">
                        Hipoacusia  = {renderizarValor(programa_discapacidad_hipoacusia)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Disminución Visual = {renderizarValor(programa_discapacidad_disminucion_visual)}
                    </p>
                    <p className="text-gray-700 text-base">
                        Perdida Barthel = {programa_discapacidad_perdida_barthel}   
                    </p>
                    <p className="text-gray-700 text-base">
                        Disminución Cognitiva = {programa_discapacidad_disminucion_cognitiva}   
                    </p>
                    <p className="text-gray-700 text-base">
                        GDS Fast = {programa_discapacidad_gds_fast}
                    </p>
                    <p className="text-gray-700 text-base">
                        NU DESC = {programa_discapacidad_nu_desc }
                    </p>
                </div>
            </div>
        </div>
    );
  }












