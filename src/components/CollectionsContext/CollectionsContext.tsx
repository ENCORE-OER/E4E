import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from 'react';
//import useLocalStorage from 'use-local-storage';
import { useLocalStorage } from 'usehooks-ts';
import { OerInCollectionProps } from '../../types/encoreElements';

type CollectionProps = {
  id: number;
  name: string;
  oers: OerInCollectionProps[];
};

type AddCollectionFunction = (id: number, name: string) => Promise<void>;
type AddResourceFunction = (
  collectionId: number,
  resource: OerInCollectionProps
) => Promise<void>;

type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: AddCollectionFunction;
  deleteCollection: (id: number) => void;
  addResource: AddResourceFunction;
  indexCollectionClicked: number;
  setIndexCollectionClicked: Dispatch<SetStateAction<number>>;
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

  const [indexCollectionClicked, setIndexCollectionClicked] =
    useLocalStorage<number>('indexCollectionClicked', -1);

  const addCollection = async (id: any, name: string): Promise<void> => {
    //console.log('ID passato addCollection: ' + id);
    //console.log('Name passato addCollection: ' + name);

    if (name.length === 0) {
      alert('Write a name for the collection!');
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
        //console.log('NEW COLLECTION: ' + newCollection.name);
        return new Promise((resolve) => {
          setCollections([...collections, newCollection]);
          resolve();
        });
      } else {
        alert('Collection "' + name + '" already exists!');
      }
    }
  };

  const deleteCollection = (id: any) => {
    const updatedCollections = collections.filter(
      (collection: CollectionProps) => collection.id !== id
    );
    setCollections(updatedCollections);
  };

  const addResource = async (
    collectionId: number,
    resource: OerInCollectionProps
  ): Promise<void> => {
    //console.log('collectionId addResource: ' + collectionId);
    //console.log('resource addResource: ' + resource);
    const updatedCollections = collections?.map((collection: CollectionProps) => {
      //console.log('COLLECTION --> ' + collection);
      if (collection.id === collectionId) {
        const isOerAlreadySaved = collection.oers?.some(
          (item: any) => item.idOer === resource.idOer
        );
        //console.log('Did you find the oer?  ' + isOerAlreadySaved);
        if (!isOerAlreadySaved) {
          // create a new object representing the updated collection
          return {
            ...collection,  // Copy all fields of the existing 'collection' object using the spread operator.
            oers: [...collection.oers, resource], // Adding new resource to the oers list of the collection
          };
        } else {
          alert(
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
      value={{
        collections,
        addCollection,
        deleteCollection,
        addResource,
        indexCollectionClicked,
        setIndexCollectionClicked,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
