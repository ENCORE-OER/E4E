import '@fontsource/inter';
import '@fontsource/work-sans';
import '../components/AppMain.css';
import '../components/Card.css';
import '../styles/globals.css';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { CollectionsProvider } from '../components/CollectionsContext/CollectionsContext';
import { LearningPathDesignProvider } from '../Contexts/LearningPathDesignContext';
import reportWebVitals from '../reportWebVitals';
import theme from '../styles/theme';

/*const theme = extendTheme(
  {
    fonts: {
      heading: `Work Sans, system-ui, sans-serif`,
      body: `Inter, system-ui, sans-serif`,
    },
  },
  withProse()
);*/

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <CollectionsProvider>
          <LearningPathDesignProvider>
            <Component {...pageProps} />
            <Analytics />
          </LearningPathDesignProvider>
        </CollectionsProvider>
      </ChakraProvider>
    </UserProvider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
