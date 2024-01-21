import { WheelchairIcon } from "../icons/WheelchairIcon";



export default function CardSocial({
    programa_social_grupo_etario,
    programa_social_genero,
    programa_social_orientacion_sexual,
    programa_social_municipio,
    programa_social_estado,
    programa_social_pais,
    programa_social_zona_marginada,
    programa_social_condicion_social,
    programa_social_deficit_economico,
    programa_social_migrante,
    programa_social_abandono_social,
    programa_social_situacion_calle,
    programa_social_red_apoyo,
    programa_social_tipo_familia,
    programa_social_idioma,
    programa_social_lengua_indigena,
    programa_social_discapacidad_cdpd,
    programa_social_escolaridad,
    programa_social_ocupacion,
    programa_social_derechohabiencia,
    programa_social_religion,
    programa_social_limitada,
    programa_social_violencia,
    programa_social_caso_medicolegal,
    programa_social_mater,
    programa_social_riesgos_vivienda,
    programa_social_vivienda_tipo,
    programa_social_vivienda_material,
    programa_social_vivienda_servicios,
    programa_social_vivienda_cuartos,
    programa_social_vivienda_personas,
    programa_social_vivienda_hacinamiento,
    programa_social_vivienda_atencion_alarma,
    programa_social_dispositivo_medicos,
    programa_social_animales,
    programa_social_animales_tipo,
    programa_social_lenia,
    programa_social_trabajo_riesgos,
    programa_social_barreras_aprendizaje,
    programa_social_exposicion_sustancias,
    programa_social_exposicion_sustancias_anios,
    programa_social_exposicion_sustancias_horas
}) {

    function renderizarValor(valor) {
        if (valor === null) {
            return 'Sin contestar';
        }
        return valor ? 'Sí' : 'No';
    }

    console.log("Nutrición Puntuación",programa_social_grupo_etario)
    
    return (

        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div 
                className="h-48 lg:h-auto lg:w-20 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden border-gray-400 border-2" 
                title="Tamiz Social">
               {/* <AstronautIcon className="h-full w-full text-gray-400" />  */}
               <WheelchairIcon className="h-2/4 w-2/4 text-gray-400" />
            </div>
            <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Tamiz Social
                    </div>
                    <p className="text-gray-700 text-base">
                        Grupo Etario  ={programa_social_grupo_etario }
                    </p>
                    <p className="text-gray-700 text-base">
                        Género =  {programa_social_genero }
                    </p>
                    <p className="text-gray-700 text-base">
                        Orientacion Sexual = { programa_social_orientacion_sexual}
                    </p>
                    <p className="text-gray-700 text-base">
                        Municipio = {programa_social_municipio}
                    </p>
                    <p className="text-gray-700 text-base">
                        Estado = {programa_social_estado }
                    </p>
                    <p className="text-gray-700 text-base">
                        País = {programa_social_pais }
                    </p>
                    <p className="text-gray-700 text-base">
                        Zona Marginada = {programa_social_zona_marginada}
                    </p>
                    <p className="text-gray-700 text-base">
                        Condición Social = {programa_social_condicion_social }
                    </p>
                    <p className="text-gray-700 text-base">
                        Déficit Económico  {renderizarValor(programa_social_deficit_economico)}
                    </p>


                </div>
            </div>
        </div>
    );
  }












