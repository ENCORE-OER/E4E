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
  DuplicateCollectionFunction,
  OerConceptInfo,
  OerInCollectionProps,
  RenameCollectionFunction,
  SelectedConceptsFunction,
  ToggleLikeFunction,
} from '../../types/encoreElements';
import { CustomToast } from '../../utils/Toast/CustomToast';
import { randomColorGenerator, useHasHydrated } from '../../utils/utils';

type CollectionContextProps = {
  collections: CollectionProps[];
  addCollection: AddCollectionFunction;
  duplicateCollection: DuplicateCollectionFunction;
  deleteCollection: DeleteCollectionFunction;
  renameCollection: RenameCollectionFunction;
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

  const generateUniqueId = async (): Promise<number> => {
    // Find the maximum ID already present in the collection
    const maxId = Math.max(...collections.map((col) => col.id), 0); // Prevents Math.max(-Infinity)

    // Return an incremented ID based on the maximum ID
    return maxId + 1;
  };

  const generateUniqueColor = async (): Promise<string> => {
    let collectionColor = '';
    let uniqueColor = false;
    // Generate an unique different color
    while (!uniqueColor) {
      // Generate random color
      collectionColor = randomColorGenerator();
      // Check if the color is already present in other collections
      const sameColorCollection = collections?.some(
        (collection: CollectionProps) => collection.color === collectionColor
      );
      if (!sameColorCollection) {
        uniqueColor = true;
      }
    }
    return collectionColor;
  };

  const addCollection = async (name: string): Promise<number> => {
    //console.log('ID passato addCollection: ' + id);
    //console.log('Name passato addCollection: ' + name);
    try {
      if (name.trim() === '') {
        // addToast({
        //   message: 'Write a name for the collection!',
        //   type: 'error',
        // });
        throw new Error('Write a name for the collection!');
      } else {
        const isCollectionPresent = collections.find(
          (collection: CollectionProps) => collection.name === name
        );
        if (isCollectionPresent) {
          throw new Error(`Collection "${name}" already exists!`);
          // addToast({
          //   message: `Collection "${name}" already exists!`,
          //   type: 'error',
          // });
        } else {
          // Generate new Id
          const newId = await generateUniqueId();
          // Generate new color
          const collectionColor = await generateUniqueColor();
          // Create new collection object
          const newCollection: CollectionProps = {
            id: newId,
            name: name,
            oers: [],
            conceptsSelected: [],
            color: collectionColor,
          };

          //console.log('NEW COLLECTION: ' + newCollection.name);
          return new Promise((resolve) => {
            setCollections((prevCollections) => {
              const updatedCollections = [...prevCollections, newCollection];

              addToast({
                message: `Collection "${name}" created successfully!`,
                type: 'success',
              });

              resolve(newId);
              return updatedCollections;
            });
          });
        }
      }
    } catch (error) {
      addToast({
        message: `${error}`,
        type: 'error',
      });
      return -1;
    }
  };

  const duplicateCollection = async (collectionId: number): Promise<void> => {
    try {
      console.log('//////////////////////');

      // Find the collection to duplicate by its ID
      const collectionToDuplicate = collections.find(
        (collection: CollectionProps) => collection.id === collectionId
      );

      // If the collection is not found, throw an error
      if (!collectionToDuplicate) {
        throw new Error('Collection not found');
      }

      if (collectionToDuplicate.oers.length > 0) {
        // Create a new collection by duplicating the original with a new ID and a modified name
        const newId = await generateUniqueId(); // Generate a new unique ID
        const collectionColor = await generateUniqueColor(); // Generate new color
        const duplicatedCollection: CollectionProps = {
          ...collectionToDuplicate, // Copy all properties from the original collection
          id: newId, // Assign the new unique ID
          name: `${collectionToDuplicate.name} (copy)`, // Append "(copy)" to the name
          color: collectionColor, // Assign the new color
        };

        // // Add the duplicated collection to the state
        // setCollections(collections.concat(duplicatedCollection));

        // // Display a success toast notification
        // addToast({
        //   message: `Collection "${duplicatedCollection.name}" duplicated successfully!`,
        //   type: 'success',
        // });

        return new Promise((resolve) => {
          // Add the duplicated collection to the state
          setCollections(collections.concat(duplicatedCollection));

          // Display a success toast notification
          addToast({
            message: `Collection "${duplicatedCollection.name}" duplicated successfully!`,
            type: 'success',
          });

          resolve();
        });
      } else {
        throw new Error(
          'Cannot duplicate an empty collection. Please add at least one resource before proceeding.'
        );
      }
    } catch (error) {
      // Display an error toast notification if duplication fails
      addToast({
        message: `Error duplicating collection: ${error}`,
        type: 'error',
      });
    }
  };

  const deleteCollection = async (id: number, name: string): Promise<void> => {
    try {
      const updatedCollections = collections.filter(
        (collection: CollectionProps) => collection.id !== id
      );

      return new Promise((resolve) => {
        collections
          ?.find((collection: CollectionProps) => collection.id === id)
          ?.oers?.forEach(async (oer: OerInCollectionProps) => {
            const api = new APIV2(undefined);
            await api.updateCount(oer.id);
          });
        setCollections(updatedCollections);

        addToast({
          message: `Collection "${name}" delated succesfully!`,
          type: 'success',
        });
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

  const renameCollection = async (
    id: number,
    newName: string
  ): Promise<void> => {
    try {
      if (newName.trim() === '') {
        // addToast({
        //   message: 'Write a name for the collection!',
        //   type: 'error',
        // });
        throw new Error('Write a name for the collection!');
      }

      const collectionToRename = collections.find(
        (collection: CollectionProps) => collection.id === id
      );

      if (!collectionToRename) {
        throw new Error('Collection not found');
      }

      // Check if a collection with the new name already exists and it's not the same collection
      const isCollectionPresent = collections.some(
        (collection: CollectionProps) =>
          collection.name.trim() === newName.trim() && collection.id !== id
      );

      if (isCollectionPresent) {
        throw new Error(`Collection "${newName.trim()}" already exists!`);
      }

      // Update the collection name
      const updatedCollections = collections.map((collection) =>
        collection.id === id
          ? { ...collection, name: newName.trim() }
          : collection
      );

      // Update the collections array
      setCollections(updatedCollections);

      addToast({
        message: `Collection renamed to "${newName.trim()}" successfully!`,
        type: 'success',
      });
    } catch (error) {
      addToast({
        message: `Renaming failed. ${error}`,
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

        return new Promise(async (resolve) => {
          const api = new APIV2(undefined);
          await api.updateCount(idOer);
          setCollections(updatedCollections);

          addToast({
            message: `OER succesfully deleted from "${collections[collectionIndex]?.name}" collection.`,
            type: 'success',
          });
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
        duplicateCollection,
        deleteCollection,
        renameCollection,
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
