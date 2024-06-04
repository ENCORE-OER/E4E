import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type GeneralContextProps = {
  MAX_CHARS_TEXT_TO_ANALYZE: number;  // Maximum number of characters accepted by the AnalyzeMaterial API
  apiKey: string | undefined;
  handleApiKey: (value: string) => void;
  setupModel: string | undefined;
  handleSetupModel: (value: string) => void;
};

export const GeneralContext = createContext<GeneralContextProps>(
  {} as GeneralContextProps
);

// Create a custom hook to use the context
export const useGeneralContext = () => useContext(GeneralContext);

// Create a provider to wrap the app and provide the context to all its children
export const GeneralContextProvider = ({ children }: any) => {

  const MAX_CHARS_TEXT_TO_ANALYZE = 60000;  // Maximum number of characters accepted by the AnalyzeMaterial API

  const [apiKey, setApiKey] = useLocalStorage<string | undefined>(
    'apiKey',
    undefined
  );

  const [setupModel, setSetupModel] = useLocalStorage<string | undefined>(
    'setupModel',
    undefined
  );

  const handleApiKey = (value: string) => {
    setApiKey(value);
  };

  const handleSetupModel = (value: string) => {
    setSetupModel(value);
  };

  return (
    <GeneralContext.Provider
      value={{
        MAX_CHARS_TEXT_TO_ANALYZE,
        apiKey,
        setupModel,
        handleApiKey,
        handleSetupModel,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
