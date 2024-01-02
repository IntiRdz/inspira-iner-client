import React from 'react'
import Layout from '../components/Layout';

import ClinicoTraslados from '../components/camas/ClinicoTraslados';

const Index = () => {
  return (
    <Layout>
      <div className="text-xl backdrop-filter backdrop-blur-lg bg-white border border-gray-300 shadow-lg rounded-lg p-2">
        Traslados Realizados 
      </div>
     <ClinicoTraslados/>
    </Layout>
  )
}

export default Index;