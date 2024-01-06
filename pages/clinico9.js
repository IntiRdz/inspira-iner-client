import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico9 from '../components/camas/Clinico9';

export default function Clinico9Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 9
      </div>
      <ClientOnly>
          <Clinico9 />
      </ClientOnly>
    </Layout>
  )
}
