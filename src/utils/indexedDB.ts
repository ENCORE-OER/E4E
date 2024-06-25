/*
 * View documentation: https://javascript.info/indexeddb
 * Other possibility is https://dexie.org/
 */

// TODO: move all the data of the lesson plan from LocalStorage to IndexedDB?

import { DropResult } from 'react-beautiful-dnd';
import { UploadedFilesProps } from '../types/encoreElements';

const DB_NAME = 'UploadedFilesStorage';
const DB_VERSION = 6; // Specify the version of the database. // TODO: upgrade it every time you have to change the database structure
const STORE_NAME = 'UploadedFiles';

interface FileRecordProps {
  id: string;
  name: string;
  data: File;
  activityIndex: number;
  urlFile: string;
}

// Function to open the IndexedDB database
export const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });

        // Define index on 'activityIndex'
        objectStore.createIndex('activityIndex', 'activityIndex', {
          unique: false,
        });
      }
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };
  });
};

// Function to save a single file to IndexedDB with specified activity index
export const saveFileToIndexedDB = async (
  file: File,
  activityIndex: number
): Promise<UploadedFilesProps> => {
  try {
    console.log('SAVING FILE...');

    const db = await openDB();
    const id = `${activityIndex}_${file.name}`; // Combined key

    return new Promise<UploadedFilesProps>((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = async () => {
        if (getRequest.result) {
          reject(new Error('File already exists in IndexedDB'));
        } else {
          const fileRecord: FileRecordProps = {
            id: id,
            name: file.name,
            data: file,
            activityIndex: activityIndex,
            urlFile: '', // Placeholder for now, will be updated after getting URL
          };

          const addRequest = objectStore.add(fileRecord);

          addRequest.onsuccess = async () => {
            try {
              const url = await getPersistentFileURL(fileRecord);
              console.log('GENERATED URL', url);
              if (url) {
                fileRecord.urlFile = url; // Update the urlFile in the object with the generated URL
                const updateRequest = objectStore.put(fileRecord); // Update the record with the URL
                updateRequest.onsuccess = () => {
                  const uploadedFiles: UploadedFilesProps = {
                    fileUploaded: file,
                    urlFile: url,
                  };
                  resolve(uploadedFiles);
                };
                updateRequest.onerror = () => {
                  reject(new Error('Failed to update file record with URL'));
                };
              } else {
                reject(new Error('Failed to get persistent file URL'));
              }
            } catch (error) {
              reject(new Error(`Failed to get persistent file URL: ${error}`));
            }
          };

          addRequest.onerror = () => {
            reject(new Error('Failed to save file to IndexedDB'));
          };
        }
      };

      getRequest.onerror = () => {
        reject(new Error('Failed to check if file exists in IndexedDB'));
      };
    });
  } catch (error) {
    throw new Error(`Failed to save file to IndexedDB: ${error}`);
  }
};

// Function to save multiple files to IndexedDB with specified activity index
export const saveMultipleFilesToIndexedDB = async (
  files: File[],
  activityIndex: number
): Promise<UploadedFilesProps[]> => {
  // const db = await openDB();
  return Promise.all(
    files.map(async (file: File) => {
      try {
        const savedFiles = await saveFileToIndexedDB(file, activityIndex);
        return savedFiles;
      } catch (error) {
        console.error('Failed to save file:', error);
        return { fileUploaded: {} } as UploadedFilesProps;
      }
    })
  );
};

// Function to retrieve a single file from IndexedDB by file name and activity index
export const getFileFromIndexedDB = async (
  id: string
): Promise<File | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const getRequest = objectStore.get(id); // Unique key for file in a specific activity

      getRequest.onsuccess = () => {
        const fileRecord: FileRecordProps = getRequest.result;
        if (fileRecord) {
          const file = fileRecord.data;
          const url = URL.createObjectURL(file);
          fileRecord.urlFile = url; // Update the URL
          resolve(file);
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => {
        reject(new Error('Failed to retrieve file from IndexedDB'));
      };
    });
  } catch (error) {
    throw new Error(`Failed to retrieve file from IndexedDB: ${error}`);
  }
};

// Function to retrieve multiple files from IndexedDB by an array of file ids
export const getMultipleFilesFromIndexedDB = async (
  ids: string[]
): Promise<(File | null)[]> => {
  try {
    return Promise.all(ids.map((id: string) => getFileFromIndexedDB(id)));
  } catch (error) {
    throw console.error(error);
  }
};

export const getAllFilesByActivityIndex = async (
  activityIndex: number
): Promise<UploadedFilesProps[]> => {
  try {
    console.log('GET FILES FROM DB...');
    const db = await openDB();
    const uploadedFiles: UploadedFilesProps[] = [];

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const objectStore = transaction.objectStore(STORE_NAME);
    const index = objectStore.index('activityIndex');
    const request = index.openCursor(IDBKeyRange.only(activityIndex));

    return new Promise<UploadedFilesProps[]>((resolve, reject) => {
      request.onsuccess = async (event) => {
        const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const fileRecord: FileRecordProps = cursor.value;

          // Update the URL
          const file = fileRecord.data;
          const url = URL.createObjectURL(file);
          fileRecord.urlFile = url;

          // Update the record in the database with the new URL
          const updateRequest = cursor.update(fileRecord);

          updateRequest.onsuccess = () => {
            const uploadedFile: UploadedFilesProps = {
              fileUploaded: file,
              urlFile: fileRecord.urlFile,
            };
            uploadedFiles.push(uploadedFile);
            cursor.continue();
          };

          updateRequest.onerror = () => {
            reject(new Error('Failed to update file record with new URL'));
          };
        } else {
          resolve(uploadedFiles);
        }
      };

      request.onerror = () => {
        reject(new Error('Failed to retrieve files from IndexedDB'));
      };
    });
  } catch (error) {
    throw new Error(`Failed to retrieve files from IndexedDB: ${error}`);
  }
};

// Function to remove a file from IndexedDB by file name and activity index
export const removeFileFromIndexedDB = async (id: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const deleteRequest = objectStore.delete(id); // Unique key for file in a specific activity

      deleteRequest.onsuccess = () => {
        resolve();
      };

      deleteRequest.onerror = () => {
        reject(new Error('Failed to delete file from IndexedDB'));
      };
    });
  } catch (error) {
    throw new Error(`Failed to delete file from IndexedDB: ${error}`);
  }
};

// Function to get a persistent URL for a file record
export const getPersistentFileURL = async (
  fileRecord: FileRecordProps
): Promise<string | undefined> => {
  try {
    console.log('GETTING URL...');
    if (!fileRecord.data) {
      throw new Error('File not found in IndexedDB');
    }

    const file = fileRecord.data;
    const url = URL.createObjectURL(file);

    return url;
  } catch (error) {
    console.error('Failed to create persistent file URL:', error);
    return undefined;
  }
};

// Function to reset the IndexedDB database
export const resetIndexedDB = async (): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const clearRequest = objectStore.clear();

      clearRequest.onsuccess = () => {
        resolve();
      };

      clearRequest.onerror = () => {
        reject(new Error('Failed to reset IndexedDB'));
      };
    });
  } catch (error) {
    throw new Error(`Failed to reset IndexedDB: ${error}`);
  }
};

// Delete files from the index specified and updates each rows with the right files from the row after
export const deleteActivityAndUpdateFiles = async (
  activityIndex: number,
  totalActivities: number
) => {
  const db = await openDB();

  // Step 1: Delete files associated with the deleted activity
  let transaction = db.transaction([STORE_NAME], 'readwrite');
  let objectStore = transaction.objectStore(STORE_NAME);

  const deleteRequest = objectStore
    .index('activityIndex')
    .openCursor(IDBKeyRange.only(activityIndex));

  deleteRequest.onsuccess = async (event) => {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
    if (cursor) {
      await cursor.delete();
      cursor.continue();
    }
  };

  // Wait for delete operation to complete
  await new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = reject;
  });

  // Step 2: Update indices of subsequent activities and their associated files
  for (let i = activityIndex + 1; i < totalActivities; i++) {
    const newActivityIndex = i - 1;

    // Update the associated files in the database
    transaction = db.transaction([STORE_NAME], 'readwrite');
    objectStore = transaction.objectStore(STORE_NAME);

    const tempFiles: FileRecordProps[] = [];

    const updateRequest = objectStore
      .index('activityIndex')
      .openCursor(IDBKeyRange.only(i));

    updateRequest.onsuccess = async (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const fileRecord: FileRecordProps = cursor.value;
        tempFiles.push(fileRecord);
        await cursor.delete();
        cursor.continue();
      } else {
        // Move the temporary saved files to the new activity index
        for (const fileRecord of tempFiles) {
          fileRecord.activityIndex = newActivityIndex;
          fileRecord.id = `${newActivityIndex}_${fileRecord.name}`;
          await addFileRecord(objectStore, fileRecord);
        }
      }
    };

    await new Promise((resolve, reject) => {
      transaction.oncomplete = resolve;
      transaction.onerror = reject;
    });
  }

  console.log('Indices successfully updated');
};

export const reorderActivitiesAndFiles = async (
  result: DropResult
  // totalActivities: number
): Promise<void> => {
  if (!result.destination) return;

  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const objectStore = transaction.objectStore(STORE_NAME);

  const sourceIndex = result.source.index;
  const destinationIndex = result.destination.index;

  try {
    // 1. Save the file records of the row being moved temporarily
    const tempFiles = await getFileRecordsByActivityIndex(
      objectStore,
      sourceIndex
    );

    // 2. Remove the file records of the row being moved from the database
    await removeFileRecordsByActivityIndex(objectStore, sourceIndex);

    // 3. Shift the other rows to fill the gap
    if (sourceIndex < destinationIndex) {
      // Move item down: process from sourceIndex+1 to destinationIndex
      for (let i = sourceIndex + 1; i <= destinationIndex; i++) {
        await shiftFileRecord(objectStore, i, i - 1);
      }
    } else {
      // Move item up: process from sourceIndex-1 to destinationIndex
      for (let i = sourceIndex - 1; i >= destinationIndex; i--) {
        await shiftFileRecord(objectStore, i, i + 1);
      }
    }

    // 4. Insert the saved file records into the new position
    for (const fileRecord of tempFiles) {
      fileRecord.activityIndex = destinationIndex;
      fileRecord.id = `${destinationIndex}_${fileRecord.name}`;
      await addFileRecord(objectStore, fileRecord);
    }

    console.log('Order successfully updated');
  } catch (error) {
    console.error('Error updating file records:', error);
  }

  transaction.oncomplete = () => {
    console.log('Transaction completed successfully');
  };

  transaction.onerror = () => {
    console.error('Transaction error');
  };
};

const getFileRecordsByActivityIndex = (
  objectStore: IDBObjectStore,
  activityIndex: number
): Promise<FileRecordProps[]> => {
  return new Promise((resolve, reject) => {
    const index = objectStore.index('activityIndex');
    const request = index.openCursor(IDBKeyRange.only(activityIndex));
    const fileRecords: FileRecordProps[] = [];

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        fileRecords.push(cursor.value);
        cursor.continue();
      } else {
        resolve(fileRecords);
      }
    };

    request.onerror = () => {
      reject(new Error('Failed to get file records by activity index'));
    };
  });
};

const removeFileRecordsByActivityIndex = (
  objectStore: IDBObjectStore,
  activityIndex: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = objectStore.index('activityIndex');
    const request = index.openCursor(IDBKeyRange.only(activityIndex));

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        objectStore.delete(cursor.primaryKey);
        cursor.continue();
      } else {
        resolve();
      }
    };

    request.onerror = () => {
      reject(new Error('Failed to remove file records by activity index'));
    };
  });
};

const shiftFileRecord = (
  objectStore: IDBObjectStore,
  oldIndex: number,
  newIndex: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const index = objectStore.index('activityIndex');
    const request = index.openCursor(IDBKeyRange.only(oldIndex));

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
      if (cursor) {
        const fileRecord: FileRecordProps = cursor.value;
        const updatedRecord: FileRecordProps = {
          ...fileRecord,
          activityIndex: newIndex,
          id: `${newIndex}_${fileRecord.name}`,
        };

        const deleteRequest = objectStore.delete(cursor.primaryKey);

        deleteRequest.onsuccess = () => {
          const addRequest = objectStore.add(updatedRecord);
          addRequest.onsuccess = () => {
            cursor.continue();
          };
          addRequest.onerror = () => {
            reject(new Error('Failed to add shifted file record'));
          };
        };

        deleteRequest.onerror = () => {
          reject(new Error('Failed to delete old file record'));
        };
      } else {
        resolve();
      }
    };

    request.onerror = () => {
      reject(new Error('Failed to open cursor for shifting file records'));
    };
  });
};

const addFileRecord = (
  objectStore: IDBObjectStore,
  fileRecord: FileRecordProps
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const addRequest = objectStore.add(fileRecord);
    addRequest.onsuccess = () => {
      resolve();
    };
    addRequest.onerror = () => {
      reject(new Error('Failed to add file record'));
    };
  });
};

// export const getPersistentFileURL = async (
//   fileRecord: FileRecordProps
// ): Promise<string | undefined> => {
//   try {
//     console.log('GETTING URL...');
//     if (!fileRecord.data) {
//       throw new Error('File not found in IndexedDB');
//     }

//     console.log('GETTING URL...');

//     const file = new File([fileRecord.data], fileRecord.name);
//     const reader = new FileReader();

//     return new Promise<string>((resolve, reject) => {
//       reader.onloadend = () => {
//         console.log('ON LOAD END');
//         const url = reader.result as string;
//         resolve(url);
//       };

//       reader.onerror = () => {
//         reject(new Error('Failed to create persistent file URL'));
//       };

//       reader.readAsDataURL(file);  // This convert the file in a base64 string, so it is not convenient
//     });
//   } catch (error) {
//     console.error('Failed to create persistent file URL:', error);
//     return undefined;
//   }
// };
// // Global error handling for unhandled promise rejections
// window.addEventListener('unhandledrejection', (event) => {
//   const request = event.target;
//   console.log(request);
//   const error = event.reason;
//   console.error('Unhandled promise rejection:', error);

//   // Optionally, you can report this error to a monitoring service or display a user-friendly message
//   reportErrorToService(error);
// });

// function reportErrorToService(error: any) {
//   // Example function to report the error to an external service
//   fetch('/error-reporting', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       message: error.message,
//       stack: error.stack,
//     }),
//   }).catch((reportError) => {
//     console.error('Failed to report error:', reportError);
//   });
// }
