import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico8 from '../components/camas/Clinico8';

export default function Clinico8Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 8
      </div>
      <ClientOnly>
          <Clinico8 />
      </ClientOnly>
    </Layout>
  )
}
