import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import PacienteState from '../context/pacientes/PacienteState';

function MyApp({ Component, pageProps }) {
  const [apolloClient, setApolloClient] = useState(null);

  useEffect(() => {
    import('../config/apollo').then((module) => {
      setApolloClient(module.default);
    });
  }, []);

  if (!apolloClient) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <PacienteState>
      <Component {...pageProps} />
      </PacienteState>
    </ApolloProvider>
  );
}

export default MyApp;
