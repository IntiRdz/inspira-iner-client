import React, { useState, } from 'react';
import Layout from '../components/Layout';
import AsignarCama from '../components/AsignarCama';



const BuscarCama = () => {
  // Supongo que selectedCamaId proviene de alguna fuente de datos
const [selectedCamaId, setSelectedCamaId] = useState(null);



  return (
    <div>
      <Layout>
      <AsignarCama
          selectedCamaId={selectedCamaId}
          setSelectedCamaId={setSelectedCamaId}
        />

        {/* Puedes usar selectedCamaId en este componente */}
        {selectedCamaId && (
          <div className="mb-4">
          <p className="text-sm text-gray-600">
            Cama seleccionada en BuscarCama: {selectedCamaId}
          </p>


          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fecha_ingreso">
              Fecha de Ingreso
          </label>

          <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fecha_ingreso"
              type="date"
              onChange={handleChange}
              onBlur={handleBlur}
              value={selectedCamaId}
          />
</div>

        )}
      </Layout>
    </div>
  );
};

export default BuscarCama;
