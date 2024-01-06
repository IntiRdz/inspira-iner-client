import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico5 from '../components/camas/Clinico5';

export default function Clinico5Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 5
      </div>
      <ClientOnly>
          <Clinico5 />
      </ClientOnly>
    </Layout>
  )
}
