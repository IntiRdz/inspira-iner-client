import React from 'react'
import LinesChart from '../components/charts/LinesChart'
import LinesChart2 from '../components/charts/LinesChart2'
import BarsChart from '../components/charts/BarsChart'
import PiesChart from '../components/charts/PiesChart'

export default function grafic () {
  return (
    <div>
    <h1 className="bg-blue-300 text-center font-mono font-bold leading-normal">Gráficas ChartJS</h1>
    <div>
        <p className="my-2"><b>Ejemplo #1: </b>Gráfico de líneas básico</p>
        <div className="bg-gray-100 mx-auto px-2 border-2 border-blue-500" style={{width:"450px", height:"230px"}}>
            <LinesChart />
        </div>
    </div>
    <div>
        <p className="my-2"><b>Ejemplo #1: </b>Gráfico de líneas básico</p>
        <div className="bg-gray-100 mx-auto px-2 border-2 border-blue-500" style={{width:"450px", height:"230px"}}>
            <LinesChart2 />
        </div>
    </div>

    <hr className="mt-3 mb-2"/>

    <div>
        <p className="my-2"><b>Ejemplo #2: </b>Gráfico de barras</p>
        <div className="bg-gray-100 mx-auto px-2 border-2 border-blue-500" style={{width:"450px", height:"225px"}}>
            <BarsChart />
        </div>
    </div>

    <hr className="mt-3 mb-2"/>

    <div>
        <p className="my-2"><b>Ejemplo #3: </b>Gráfico circular</p>
        <div className="bg-gray-100 mx-auto border-2 border-blue-500" style={{width:"450px", height:"250px"}}>
            <div style={{width:"100%", height:"100%", padding:"10px 0"}}>
                <PiesChart />                       
            </div>
        </div>
    </div>
</div>
);
}