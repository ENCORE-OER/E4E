import { createContext, Dispatch, SetStateAction, useContext } from 'react';
//import useLocalStorage from 'use-local-storage';
import { useLocalStorage } from 'usehooks-ts';
import {
  CollectionProps,
  OerConceptInfo,
  OerInCollectionProps,
} from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';

type AddCollectionFunction = (
  id: number,
  name: string,
  color: string
) => Promise<void>;
type AddResourceFunction = (
  collectionId: number,
  resource: OerInCollectionProps
) => Promise<void>;
type DeleteCollectionFunction = (id: number, name: string) => Promise<void>;
type SelectedConceptsFunction = (
  collectionId: number,
  concepts: OerConceptInfo[]
) => Promise<void>;
type DeleteResourceFunction = (idCollection: number, idOer: number) => Promise<void>;

type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: AddCollectionFunction;
  deleteCollection: DeleteCollectionFunction;
  addResource: AddResourceFunction;
  deleteResourceFromCollection: DeleteResourceFunction;
  indexCollectionClicked: number;
  setIndexCollectionClicked: Dispatch<SetStateAction<number>>;
  setSelectedConceptsForCollection: SelectedConceptsFunction;
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

  const addCollection = async (
    id: number,
    name: string,
    color: string
  ): Promise<void> => {
    //console.log('ID passato addCollection: ' + id);
    //console.log('Name passato addCollection: ' + name);

    try {
      if (name.trim() === '') {
        addToast({
          message: 'Write a name for the collection!',
          type: 'error',
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
            type: 'error',
          });
        } else {
          const newCollection: CollectionProps = {
            id: id,
            name: name,
            oers: [],
            conceptsSelected: [],
            color: color,
          };

          addToast({
            message: `Collection "${name}" created successfully!`,
            type: 'success',
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
        type: 'error',
      });
    }
  };

  const deleteCollection = async (id: number, name: string): Promise<void> => {
    try {
      const updatedCollections = collections.filter(
        (collection: CollectionProps) => collection.id !== id
      );
      addToast({
        message: `Collection "${name}" delated succesfully!`,
        type: 'success',
      });
      return new Promise((resolve) => {
        setCollections(updatedCollections);
        resolve();
      });
    } catch (error) {
      addToast({
        message: `Delating failed with this error: ${error}`,
        type: 'error',
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
          (item: OerInCollectionProps) => item.id === resource.id
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
              message: `OER added to "${collections[collectionIndex]?.name}" collection.`,
              type: 'success',
            });
          }
        } else {
          addToast({
            message: `The OER is already saved into "${collection.name}" collection!`,
            type: 'error',
          });
        }
      } else {
        addToast({
          message: "The collection doesn't exist!",
          type: 'error',
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
        type: 'error',
      });
    }
  };


  const deleteResourceFromCollection = async (
    idCollection: number,
    idOer: number,
  ): Promise<void> => {
    try {

      const updatedCollections = [...collections];
      const updatedCollectionOers = updatedCollections[idCollection].oers?.filter(
        (oer: OerInCollectionProps) => oer.id !== idOer
      );

      const updatedCollection = {
        ...collections[idCollection],
        oers: updatedCollectionOers,
      };

      updatedCollections[idCollection] = updatedCollection;

      if (hydrated) {
        addToast({
          message: `OER succesfully deleted from "${collections[idCollection]?.name}" collection.`,
          type: 'success',
        });
      }

      return new Promise((resolve) => {
        setCollections(updatedCollections);
        resolve();
      });

    } catch (error) {
      addToast({
        message: `OER deleting failed with this error: ${error}`,
        type: 'error',
      });
    }
  }

  // used
  const setSelectedConceptsForCollection = async (
    collectionId: number,
    concepts: OerConceptInfo[]
  ): Promise<void> => {
    // Trova la collezione corrispondente in collections
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          conceptsSelected: concepts,
        };
      }
      return collection;
    });

    // Aggiorna lo stato globale delle collezioni con i nuovi concetti selezionati
    setCollections(updatedCollections);
  };

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        addCollection,
        deleteCollection,
        addResource,
        deleteResourceFromCollection,
        indexCollectionClicked, //used in CollectionMenu component
        setIndexCollectionClicked,
        setSelectedConceptsForCollection,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
