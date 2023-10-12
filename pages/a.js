import Layout from '../components/Layout';
import Cama from '../components/Cama';
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'



const A = () => {

    
    return ( 

        <>
            <Layout> 
                <h1 className="text-center text-2xl text-white font-light">Pagina de pasada</h1>
                        Hola
                <div className="flex justify-center mt-5">

                </div>
            </Layout>
        </>
     );
}
 
export default A;