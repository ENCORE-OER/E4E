
export type EncoreConceptMapNode = {
  node_id: number;
  name: string;
};

export type EncoreConceptMapEdge = {
  from: number;
  to: number;
};

export type EncoreConceptMap = {
  nodes: any[];
  edges: any[];
};

export type EncoreOer = {
 id: any;
 skills: any;
 title: string;
 domain: string;
 media_type: string;
}

export type ConceptNode = {
  data: {numOfResources?: number};
 }
