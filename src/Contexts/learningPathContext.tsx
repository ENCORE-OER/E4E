import React, { useContext, useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { APIV2 } from '../data/api';
import { PolyglotFlow, PolyglotFlowInfo } from '../types/polyglot/PolyglotFlow';

interface LearningPathContextProps {
  learningPath: PolyglotFlow | undefined;
  createNew: (
    flow: Partial<PolyglotFlowInfo>,
    conceptId: number
  ) => Promise<PolyglotFlow>;
  getFragment: (conceptId: number) => Promise<PolyglotFlow>;
  updateInfo: (info: Partial<PolyglotFlowInfo>) => Promise<void>;
  addExisting: (id: string) => Promise<PolyglotFlow>;
}

export const LearningPathContext =
  React.createContext<LearningPathContextProps>({
    learningPath: undefined,
    createNew: async () => ({}) as PolyglotFlow,
    getFragment: async () => ({}) as PolyglotFlow,
    updateInfo: async () => void 0,
    addExisting: async () => ({}) as PolyglotFlow,
  });

export const useLearningPathContext = () => useContext(LearningPathContext);

export const LearningPathProvider = ({ children }: any) => {
  const API = useMemo(() => new APIV2(undefined), []);

  const learningPathid = useMemo(() => v4(), []);

  const fragments = useMemo(() => new Map<number, PolyglotFlow>(), []);

  const [learningPath, setLearningPath] = useState<PolyglotFlow>();

  const updateInfo = async (info: Partial<PolyglotFlowInfo>) => {
    Array.from(fragments).map(async (pair) => {
      const fragment = pair[1];
      const conceptId = pair[0];
      const flow = (await API.updateFlow({ ...info, _id: fragment._id })).data;
      fragments.set(conceptId, flow);
    });
  };

  const createNew = async (
    flow: Partial<PolyglotFlowInfo>,
    conceptId: number
  ) => {
    const payload = await API.createNewFlow({
      ...flow,
      learningPathId: learningPathid,
    });
    const lp = payload.data;

    setLearningPath(lp);
    fragments.set(conceptId, lp);

    return lp;
  };

  const getFragment = async (conceptId: number) => {
    let fragment = fragments.get(conceptId);
    if (!fragment) {
      fragment = await createNew({}, conceptId);
    }

    return fragment;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addExisting = async (id: string) => {
    // TODO: implement this
    return learningPath ?? ({} as PolyglotFlow);
  };

  return (
    <LearningPathContext.Provider
      value={{
        learningPath,
        createNew,
        getFragment,
        updateInfo,
        addExisting,
      }}
    >
      {children}
    </LearningPathContext.Provider>
  );
};
