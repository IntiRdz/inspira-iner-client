import React from 'react'
import Layout from '../components/Layout';
import ClientOnly from "../components/ClientOnly";
import Clinico0 from '../components/camas/Clinico0';

export default function Home() {
  return (
    <Layout>
      <div className="backdrop-filter backdrop-blur-lg bg-gray-600 border border-gray-300 shadow-lg rounded-lg p-2 text-xl">
        Urgencias 
      </div>
      <ClientOnly>
          <Clinico0 />
      </ClientOnly>
    </Layout>
  )
}
