export type EncoreConceptMapNode = {
  node_id: number;
  name: string;
};

export type EncoreConceptMapEdge = {
  from: number;
  to: number;
};

export type EncoreConceptMap = {
  nodes: EncoreConceptMapEdge[];
  edges: EncoreConceptMapEdge[];
};
