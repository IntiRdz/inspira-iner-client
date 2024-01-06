import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico3 from '../components/camas/Clinico3';

export default function Clinico3Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 3 
      </div>
      <ClientOnly>
          <Clinico3 />
      </ClientOnly>
    </Layout>
  )
}
