import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico1 from '../components/camas/Clinico1';

export default function Clinico1Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 1 
      </div>
      <ClientOnly>
          <Clinico1 />
      </ClientOnly>
    </Layout>
  )
}
