import '@fontsource/inter';
import '@fontsource/work-sans';
import '../components/AppMain.css';
import '../components/Card.css';
import '../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { CollectionsProvider } from '../Contexts/CollectionsContext/CollectionsContext';
import { CreateOERsProvider } from '../Contexts/CreateOERsContext';
import { LearningPathDesignProvider } from '../Contexts/LearningPathDesignContext';
import { GeneralContextProvider } from '../Contexts/GeneralContext';
import reportWebVitals from '../reportWebVitals';
import theme from '../styles/theme';

/*const theme = extendTheme(
  {
    fonts: {
      heading: `Work Sans, system-ui, sans-serif`,
      body: `Inter, system-ui, sans-serif`,
    },
  },J
  withProse()
);*/

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <GeneralContextProvider>
          <CollectionsProvider>
            <LearningPathDesignProvider>
              <CreateOERsProvider>
                <Component {...pageProps} />
                <Analytics />
              </CreateOERsProvider>
            </LearningPathDesignProvider>
          </CollectionsProvider>
        </GeneralContextProvider>
      </ChakraProvider>
    </UserProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
