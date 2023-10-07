import { ApolloProvider } from '@apollo/client';
import { useEffect, useState } from 'react';
import client from '../config/apollo'; // Ruta al archivo donde se configura el cliente Apollo
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [apolloClient, setApolloClient] = useState(null);

  useEffect(() => {
    setApolloClient(client);
  }, []);

  if (!apolloClient) {
    return <div>Loading...</div>;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;