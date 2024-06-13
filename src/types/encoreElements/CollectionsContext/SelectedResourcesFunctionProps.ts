export type SelectedResourcesFunction = (
  collectionIndex: number,
  resourcesSelected: number[]
) => Promise<void>;
