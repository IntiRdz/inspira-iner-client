
const CamaVista = ({cama}) => {
    const { 
        cama_numero,
        cama_compartida,
        cama_disponible,
        cama_ocupada,
        cama_genero,
        cama_dispositivo_o2,
        cama_hemodialisis,
        cama_aislamiento,
        cama_dan,
        cama_codigo_uveh,
     } = cama;


    return ( 
        <tr>
            <td className="border px-4 py-2">{cama_numero} </td>
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_compartida) {
                        case true:
                        return 'bg-indigo-100';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_compartida ? 'Compartido' : 'Asilado'}
            </td>
            <td className="border px-4 py-2">{cama_disponible ? 'Disponible' : 'No disponible'} </td>
            <td className="border px-4 py-2">{cama_ocupada ? 'Ocupada' : 'Libre'} </td>
            <td className="border px-4 py-2">{cama_genero} </td>
            <td className="border px-4 py-2">{cama_dispositivo_o2} </td>
            <td className="border px-4 py-2">{cama_hemodialisis ? 'HD' : 'No HD'} </td>
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_codigo_uveh) {
                        case 'Previamente_Acinetobacter':
                        return 'bg-pink-300';
                        case 'Previamente_Clostridium':
                            return 'bg-emerald-300';
                        case 'Previamente_Enterobacterias_XDR':
                        return 'bg-violet-300';
                        case 'Previamente_Pseudomonas_Aeruginosa_XD':
                        return 'bg-amber-400';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_codigo_uveh}
            </td>
           {/*  <td className="border px-4 py-2">{cama_aislamiento ? 'Sí' : 'No'} </td> */}
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_aislamiento) {
                        case true:
                        return 'bg-rose-200';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_aislamiento ? 'Aislamiento' : 'No Aislamiento'}
            </td>
            {/* <td className="border px-4 py-2">{cama_dan ? 'Sí' : 'No'} </td> */}
            <td
                className={`border px-4 py-2 ${
                    (() => {
                    switch (cama_dan) {
                        case true:
                        return 'bg-red-400';
                        default:
                        return ''; 
                    }
                    })()
                }`}
                >
                {cama_dan ? 'DAN' : 'No DAN'}
            </td>
        </tr>
     );
}
 
export default CamaVista;
