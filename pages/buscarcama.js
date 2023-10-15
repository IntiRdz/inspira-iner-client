import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { AsignarCama } from '../components/pacientes/AsignarCama';
import PacienteContext from '../context/pacientes/PacienteContext';



const BuscarCama = () => {

  //Utilizar context y utilizar sus valores
  //Context de cama
  const { cama } = useContext(PacienteContext);

  console.log("Valor de id.cama desde el contexto:", cama);


  return (
    <div>
      <Layout>
      <AsignarCama

      />  

        <div className="mb-4">
          hola


        </div>      


      

      </Layout>
    </div>
  );
};

export default BuscarCama;
