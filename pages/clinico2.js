import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico2 from '../components/camas/Clinico2';

export default function Clinico2Page () {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Servicio Clínico 2 
      </div>
      <ClientOnly>
          <Clinico2 />
      </ClientOnly>
    </Layout>
  )
}
