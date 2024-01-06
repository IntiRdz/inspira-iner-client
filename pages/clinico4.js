import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico4 from '../components/camas/Clinico4';

export default function Clinico4Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 4 
      </div>
      <ClientOnly>
          <Clinico4 />
      </ClientOnly>
    </Layout>
  )
}
