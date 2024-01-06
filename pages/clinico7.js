import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico7 from '../components/camas/Clinico7';

export default function Clinico7Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 7
      </div>
      <ClientOnly>
          <Clinico7 />
      </ClientOnly>
    </Layout>
  )
}
