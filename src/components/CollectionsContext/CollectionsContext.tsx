import { createContext, Dispatch, SetStateAction, useContext } from 'react';
//import useLocalStorage from 'use-local-storage';
import { useLocalStorage } from 'usehooks-ts';
import {
  CollectionProps,
  OerInCollectionProps,
} from '../../types/encoreElements';
import { useHasHydrated } from '../../utils/utils';
import { CustomToast } from '../Toast/CustomToast';

type AddCollectionFunction = (id: number, name: string) => Promise<void>;
type AddResourceFunction = (
  collectionId: number,
  resource: OerInCollectionProps
) => Promise<void>;

type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: AddCollectionFunction;
  deleteCollection: (id: number, name: string) => void;
  addResource: AddResourceFunction;
  indexCollectionClicked: number;
  setIndexCollectionClicked: Dispatch<SetStateAction<number>>;
};

const CollectionsContext = createContext<CollectionContextProps>(
  {} as CollectionContextProps
);

export const useCollectionsContext = () => useContext(CollectionsContext);

export const CollectionsProvider = ({ children }: any) => {
  const { addToast } = CustomToast();

  const [collections, setCollections] = useLocalStorage<CollectionProps[]>(
    'collection',
    []
  );

  const [indexCollectionClicked, setIndexCollectionClicked] =
    useLocalStorage<number>('indexCollectionClicked', -1);

  const hydrated = useHasHydrated();

  const addCollection = async (id: number, name: string): Promise<void> => {
    //console.log('ID passato addCollection: ' + id);
    //console.log('Name passato addCollection: ' + name);

    try {
      if (name.trim() === '') {
        addToast({
          message: 'Write a name for the collection!',
          status: 'error',
        });
        return;
      } else {
        const isCollectionPresent = collections.find(
          (collection: CollectionProps) =>
            collection.name === name || collection.id === id
        );
        if (isCollectionPresent) {
          addToast({
            message: `Collection "${name}" already exists!`,
            status: 'error',
          });
        } else {
          const newCollection: CollectionProps = {
            id: id,
            name: name,
            oers: [],
          };

          addToast({
            message: `Collection "${name}" created successfully!`,
            status: 'success',
          });

          //console.log('NEW COLLECTION: ' + newCollection.name);
          return new Promise((resolve) => {
            setCollections([...collections, newCollection]);
            resolve();
          });
        }
      }
    } catch (error) {
      addToast({
        message: `Error: ${error}`,
        status: 'error',
      });
    }
  };

  const deleteCollection = (id: number, name: string) => {
    try {
      const updatedCollections = collections.filter(
        (collection: CollectionProps) => collection.id !== id
      );
      setCollections(updatedCollections);
      addToast({
        message: `Collection "${name}" delated succesfully!`,
        status: 'success',
      });
    } catch (error) {
      addToast({
        message: `Delating failed with this error: ${error}`,
        status: 'error',
      });
    }
  };

  const addResource = async (
    collectionId: number,
    resource: OerInCollectionProps
  ): Promise<void> => {
    //console.log('collectionId addResource: ' + collectionId);
    //console.log('resource addResource: ' + resource);
    try {
      const updatedCollections = [...collections];

      const collectionIndex = updatedCollections.findIndex(
        // search the index of collection where the resource must be add
        (collection: CollectionProps) => collection.id === collectionId
      );

      if (collectionIndex > -1) {
        const collection = updatedCollections[collectionIndex];

        const isOerAlreadySaved = collection.oers?.some(
          // check if oer is already saved in the collection selected
          (item: any) => item.idOer === resource.idOer
        );
        //console.log('Did you find the oer?  ' + isOerAlreadySaved);
        if (!isOerAlreadySaved) {
          // create a new object representing the updated collection
          const collectionUpdated = {
            ...collection, // Copy all fields of the existing 'collection' object using the spread operator.
            oers: [...collection.oers, resource], // Adding new resource to the oers list of the collection
          };

          updatedCollections[collectionIndex] = collectionUpdated;

          if (hydrated) {
            addToast({
              message: `Resource added to "${collections[collectionIndex]?.name}" collection.`,
              status: 'success',
            });
          }
        } else {
          addToast({
            message: `The oer is already saved into "${collection.name}" collection!`,
            status: 'error',
          });
        }
      } else {
        addToast({
          message: "The collection doesn't exist!",
          status: 'error',
        });
      }

      /*const updatedCollections = collections?.map(
        (collection: CollectionProps) => {
          //console.log('COLLECTION --> ' + collection);
          if (collection.id === collectionId) {
            const isOerAlreadySaved = collection.oers?.some(
              (item: any) => item.idOer === resource.idOer
            );
            //console.log('Did you find the oer?  ' + isOerAlreadySaved);
            if (!isOerAlreadySaved) {
              // create a new object representing the updated collection
              const collectionUpdated = {
                ...collection, // Copy all fields of the existing 'collection' object using the spread operator.
                oers: [...collection.oers, resource], // Adding new resource to the oers list of the collection
              };
              //addToast({
              //  message: `Resource added to "${collections[indexCollectionClicked]?.name}" collection.`,
              //  status: 'success'
              //});
              return collectionUpdated;
            } else {
              addToast({
                message: `The oer is already saved into "${collection.name}" collection!`,
                status: 'error'
              });
              return collection;
            }
          } else {  // problems because the others collections will be always return, so we'll have a lot of "collection doesn't exist" message
            //addToast({
            //  message: "The collection doesn't exist!",
            //  status: 'error'
            //});
            return collection;
          }
        }
      );*/

      //console.log(updatedCollections);
      return new Promise((resolve) => {
        setCollections(updatedCollections);
        resolve();
      });
    } catch (error) {
      addToast({
        message: `Error: ${error}`,
        status: 'error',
      });
    }
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        addCollection,
        deleteCollection,
        addResource,
        indexCollectionClicked, //used in CollectionMenu component
        setIndexCollectionClicked,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
