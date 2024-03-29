import { createContext, Dispatch, SetStateAction, useContext } from 'react';
//import useLocalStorage from 'use-local-storage';
import { useLocalStorage } from 'usehooks-ts';
import { APIV2 } from '../../data/api';
import {
  AddCollectionFunction,
  AddResourceFunction,
  CollectionProps,
  DeleteCollectionFunction,
  DeleteResourceFunction,
  OerConceptInfo,
  OerInCollectionProps,
  SelectedConceptsFunction,
  ToggleLikeFunction,
} from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../utils/utils';

type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: AddCollectionFunction;
  deleteCollection: DeleteCollectionFunction;
  addResource: AddResourceFunction;
  deleteResourceFromCollection: DeleteResourceFunction;
  indexCollectionClicked: number;
  setIndexCollectionClicked: Dispatch<SetStateAction<number>>;
  setSelectedConceptsForCollection: SelectedConceptsFunction;
  toggleLikeOER: ToggleLikeFunction;
  likedOers: number[];
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

  const [likedOers, setLikedOers] = useLocalStorage<number[]>('likedOers', []); // to save the id of the liked oers

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
            //console.log("I'm triggering collections");
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
        collections
          ?.find((collection: CollectionProps) => collection.id === id)
          ?.oers?.forEach(async (oer: OerInCollectionProps) => {
            const api = new APIV2(undefined);
            await api.updateCount(oer.id);
          });
        setCollections(updatedCollections);
        //console.log("I'm triggering collections");
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
          throw new Error(
            `The OER is already saved into "${collection.name}" collection!`
          );
          /*addToast({
            message: `The OER is already saved into "${collection.name}" collection!`,
            type: 'error',
          });*/
        }
      } else {
        throw new Error("The collection doesn't exist!");
        /*addToast({
          message: "The collection doesn't exist!",
          type: 'error',
        });*/
      }

      //console.log(updatedCollections);
      return new Promise(async (resolve) => {
        console.log('Saving OER');
        const api = new APIV2(undefined);
        await api.saveOER(resource.id, resource.title, resource.description);
        setCollections(updatedCollections);
        //console.log("I'm triggering collections");
        resolve();
      });
    } catch (error) {
      addToast({
        message: `${error}`,
        type: 'error',
      });
    }
  };

  const deleteResourceFromCollection = async (
    collectionIndex: number,
    idOer: number
  ): Promise<void> => {
    try {
      const updatedCollections = [...collections];

      if (
        !updatedCollections[collectionIndex] ||
        !updatedCollections[collectionIndex]?.oers
      ) {
        throw new Error(
          `Collection {with ID ${collectionIndex}} doesn't exist or doesn't have any OERs.`
        );
      } else {
        const updatedCollectionOers = updatedCollections[
          collectionIndex
        ]?.oers?.filter((oer: OerInCollectionProps) => oer.id !== idOer);

        //console.log(
        // 'oers: ' +
        //  updatedCollectionOers?.map((oer: OerInCollectionProps) => oer.title)
        //);

        const updatedCollection = {
          ...collections[collectionIndex],
          oers: updatedCollectionOers,
          //conceptsSelected: updatedConceptsSelected,
        };

        updatedCollections[collectionIndex] = updatedCollection;

        while (!hydrated) {
          console.log('Waiting for hydration...');
        }

        addToast({
          message: `OER succesfully deleted from "${collections[collectionIndex]?.name}" collection.`,
          type: 'success',
        });

        return new Promise(async (resolve) => {
          const api = new APIV2(undefined);
          await api.updateCount(idOer);
          setCollections(updatedCollections);
          //setSelectedConceptsForCollection(collections[collectionIndex].id, updatedConceptsSelected);
          resolve();
        });
      }
    } catch (error) {
      addToast({
        message: `${error}`,
        type: 'error',
      });
    }
  };

  // used
  const setSelectedConceptsForCollection = (
    collectionId: number,
    concepts: OerConceptInfo[]
  ) => {
    try {
      // Find the collection with the given ID
      const updatedCollections = collections?.map((collection) => {
        if (collection.id === collectionId) {
          if (concepts !== undefined) {
            return {
              ...collection,
              conceptsSelected: concepts,
            };
          } else {
            console.error('Concepts is undefined');
          }
        }
        return collection;
      });

      // Update the collections state with new selected concepts
      setCollections(updatedCollections);
      // return new Promise((resolve) => {
      //   setCollections(updatedCollections);
      //   console.log("I'm triggering collections");
      //   console.log(concepts);
      //   resolve();
      // });
    } catch (error) {
      addToast({
        message: `${error}`,
        type: 'error',
      });
    }
  };

  const toggleLikeOER = async (idOer: number | undefined): Promise<void> => {
    if (idOer === undefined) {
      return;
    }
    try {
      // To check if the resource is already liked
      const isLiked = likedOers.includes(idOer);

      // Add or remove like
      const updatedLikedResources = isLiked
        ? likedOers.filter((id) => id !== idOer)
        : [...likedOers, idOer];

      setLikedOers(updatedLikedResources);

      // To update the like on the database
      const api = new APIV2(undefined);
      if (isLiked) {
        await api.reduceLikeOER(idOer);
      } else {
        await api.setLikeOER(idOer);
      }
    } catch (error) {
      console.error(error);
    }
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
        toggleLikeOER,
        likedOers,
      }}
    >
      {children}
    </CollectionsContext.Provider>
  );
};
