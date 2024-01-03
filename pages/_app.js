import '../styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';


import PacienteState from '../context/pacientes/PacienteState';
import { AuthProvider } from '../context/usuarios/AuthContext';



function MyApp({ Component, pageProps }) {


  return (
    <ApolloProvider client={client}>
      <AuthProvider>
          <PacienteState>
            <Component {...pageProps} />
          </PacienteState>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
