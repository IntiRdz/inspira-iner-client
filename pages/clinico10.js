import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico10 from '../components/camas/Clinico10';

export default function Clinico10Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 10
      </div>
      <ClientOnly>
          <Clinico10 />
      </ClientOnly>
    </Layout>
  )
}
