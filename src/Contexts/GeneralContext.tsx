import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type GeneralContextProps = {
  apiKey: string | undefined;
  handleApiKey: (value: string) => void;
};

export const GeneralContext = createContext<GeneralContextProps>(
  {} as GeneralContextProps
);

// Create a custom hook to use the context
export const useGeneralContext = () => useContext(GeneralContext);

// Create a provider to wrap the app and provide the context to all its children
export const GeneralContextProvider = ({ children }: any) => {
  const [apiKey, setApiKey] = useLocalStorage<string | undefined>(
    'apiKey',
    undefined
  );

  const handleApiKey = (value: string) => {
    setApiKey(value);
  };

  return (
    <GeneralContext.Provider
      value={{
        apiKey,
        handleApiKey,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
