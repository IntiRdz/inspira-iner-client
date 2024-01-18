import React from 'react'
import Layout from '../components/Layout';

import ClinicoTraslados from '../components/camas/ClinicoTraslados';
import DiagnosticoEditar2 from '../components/diagnosticos/DiagnosticoEditar2';


const id = "65a650eba1aee975aea4fb0b";

const z = () => {
  
  return (
    <Layout>
      <div className="text-xl backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">
        Traslados Realizados 
      </div>
     <ClinicoTraslados/>
     <DiagnosticoEditar2 id={id}/>
    </Layout>
  )
}

export default Index;