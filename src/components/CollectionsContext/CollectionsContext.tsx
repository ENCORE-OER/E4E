import { createContext, useContext, useEffect } from 'react';
//import useLocalStorage from 'use-local-storage';
import { useLocalStorage } from 'usehooks-ts';

type OerProps = {
  idOer: any;
  title: string;
  description: string;
  skills: any[];
  concepts: any[];
};

type CollectionProps = {
  id: any;
  name: string;
  oers: OerProps[];
};

type AddCollectionFunction = (id: any, name: string) => Promise<void>;
type AddResourceFunction = (
  collectionId: any,
  resource: OerProps
) => Promise<void>;

type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: AddCollectionFunction;
  deleteCollection: (id: any) => void;
  addResource: AddResourceFunction;
};

/*type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: (id: any, name: string) => void;
  deleteCollection: (id: any) => void;
  addResource: (collectionId: any, resource: OerProps) => void;
};*/

const CollectionsContext = createContext<CollectionContextProps>(
  {} as CollectionContextProps
);

export const useCollectionsContext = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }: any) => {
  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collection',
    []
  );

  const addCollection = async (id: any, name: string): Promise<void> => {
    console.log('ID passato addCollection: ' + id);
    console.log('Name passato addCollection: ' + name);

    if (name.length === 0) {
      console.log('Write a name for the collection!');
    } else {
      const isCollectionPresent = collections.some(
        (collection: any) => collection.name === name || collection.id === id
      );
      if (!isCollectionPresent) {
        const newCollection: CollectionProps = {
          id: id,
          name: name,
          oers: [],
        };
        console.log('NEW COLLECTION: ' + newCollection.name);
        return new Promise((resolve) => {
          setCollections([...collections, newCollection]);
          resolve();
        });
      } else {
        console.log('Collection name already exists!');
      }
    }
  };

  const deleteCollection = (id: any) => {
    const updatedCollections = collections.filter(
      (collection: any) => collection.id !== id
    );
    setCollections(updatedCollections);
  };

  const addResource = async (
    collectionId: any,
    resource: OerProps
  ): Promise<void> => {
    console.log('collectionId addResource: ' + collectionId);
    console.log('resource addResource: ' + resource);
    const updatedCollections = collections?.map((collection) => {
      console.log('COLLECTION --> ' + collection);
      if (collection.id === collectionId) {
        const isOerAlreadySaved = collection.oers?.some(
          (item: any) => item.idOer === resource.idOer
        );
        console.log('Did you find the oer?  ' + isOerAlreadySaved);
        if (!isOerAlreadySaved) {
          return {
            ...collection,
            oers: [...collection.oers, resource],
          };
        } else {
          console.log(
            'The oer is already saved into collection -> ' + collection.name
          );
          return collection;
        }
      } else {
        console.log("The collection doesn't exist!");
        return collection;
      }
    });

    console.log(updatedCollections);
    return new Promise((resolve) => {
      setCollections(updatedCollections);
      resolve();
    });
  };

  useEffect(() => {
    console.log(`Adding Collection: ${collections}`);
  }, [collections]);

  return (
    <CollectionsContext.Provider
      value={{ collections, addCollection, deleteCollection, addResource }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
