import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import ClinicoAll from '../components/camas/ClinicoAll';

export default function CamasPage() {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Todas las camas 
      </div>
      <ClientOnly>
          <ClinicoAll />
      </ClientOnly>
    </Layout>
  )
}
