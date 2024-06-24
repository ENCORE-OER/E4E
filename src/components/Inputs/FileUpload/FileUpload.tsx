import { Flex, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
// import { UploadedFilesProps } from '../../../types/encoreElements';
import { UploadedFilesProps } from '../../../types/encoreElements';
import { removeFileFromIndexedDB } from '../../../utils/indexedDB';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import { useHasHydrated } from '../../../utils/utils';
import BoxUploadedFile from '../../Boxes/BoxUploadedFile';
import UploadButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/UploadButton';
import { TabUploadFilesProps } from '../../Tabs/AddContentTabs/TabUploadFiles';

const FileUpload: React.FC<TabUploadFilesProps> = (props) => {
  const { activityIndex } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const { uploadedFilesAddContent, addUploadedFilesAddContent, removeUploadedFileAddContent } = useLearningPathDesignContext();
  const { addToast } = CustomToast();
  const hydrated = useHasHydrated();

  const validateFiles = (files: File[]): string | undefined => {
    const MAX_FILE_SIZE_MB = 10;
    for (const file of files) {
      const fileSizeMb = file.size / (1024 * 1024);
      if (fileSizeMb > MAX_FILE_SIZE_MB) {
        return `Max file size limit exceeded (${MAX_FILE_SIZE_MB}MB) for file: ${file.name}`;
      }
    }
    return undefined;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("FILES: ", files);
    if (files && files.length > 0) {
      const filesArray = Array.from(files);
      const validationError = validateFiles(filesArray);
      if (validationError) {
        addToast({ message: 'The selected files are too big!', type: 'error' });
      } else {
        const newFiles: UploadedFilesProps[] = filesArray.map((file: File) => (
          // file
          {
            fileUploaded: file,
            urlFile: URL.createObjectURL(file)
          }
        ));

        // Save files to IndexedDB and update the state
        // newFiles.forEach(file => saveFileToIndexedDB(file.fileUploaded));
        addUploadedFilesAddContent(newFiles);
      }
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const handleRemoveClick = async (file: UploadedFilesProps) => {
    try {
      removeUploadedFileAddContent(file);
      await removeFileFromIndexedDB(`${activityIndex}_${file.fileUploaded.name}`);
    } catch (error) {
      addToast({
        message: 'Error removing a file.',
        type: 'error'
      })
    }
  }


  // useEffect(() => {
  //   // Load previously saved files from IndexedDB when the component mounts
  //   loadUploadedFiles(activityIndex, false);
  // }, []);

  return (
    <Flex direction="column" justify="center" gap={2} pt={5}>
      <Input type="file" ref={inputRef} onChange={handleOnChange} hidden multiple accept="application/*" />
      <UploadButton handleUploadFile={onChooseFile} />

      {hydrated && uploadedFilesAddContent && (
        <Flex gap={2} direction="column">
          {uploadedFilesAddContent.map((file: UploadedFilesProps, index: number) => (
            <BoxUploadedFile
              key={index}
              fileName={file.fileUploaded.name}
              urlFile={file.urlFile ?? ''}
              handleRemoveClick={async () => {
                await handleRemoveClick(file);
              }}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default FileUpload;
