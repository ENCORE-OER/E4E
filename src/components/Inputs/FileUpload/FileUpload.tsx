import { Flex, Input } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { useLearningPathDesignContext } from '../../../Contexts/LearningPathDesignContext/LearningPathDesignContext';
import { UploadedFilesProps } from '../../../types/encoreElements';
import { CustomToast } from '../../../utils/Toast/CustomToast';
import BoxUploadedFile from '../../Boxes/BoxUploadedFile';
import UploadButton from '../../Buttons/ButtonsDesignPage/ButtonsLessonCard/UploadButton';
// import "./FileUpload.css";

const FileUpload: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    // const [selectedFiles, setSelectedFiles] = useState<UploadedFilesProps[]>([]);
    const { uploadedFilesAddContent, addUploadedFilesAddContent, removeUploadedFileAddContent } = useLearningPathDesignContext();
    const { addToast } = CustomToast();

    // Validation function
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

    // Handle the change event when a file is selected
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const filesArray = Array.from(files);
            const validationError = validateFiles(filesArray);
            if (validationError) {
                // Handle error appropriately
                addToast({
                    message: 'The selected files are too big!',
                    type: 'error',
                });
            } else {
                const newFiles: UploadedFilesProps[] = filesArray.map((file: File) => ({
                    fileUploaded: file,
                    urlFile: URL.createObjectURL(file)
                }));
                // setSelectedFiles((prevFiles: UploadedFilesProps[]) => [...prevFiles, ...newFiles]);
                addUploadedFilesAddContent(newFiles);
            }
        }
    };

    const onChooseFile = () => {
        inputRef.current?.click();
    };

    // function arrayToFileList(array: File[] | null): FileList | null {
    //     if (array !== null && array.length > 0) {
    //         const dataTransfer = new DataTransfer();
    //         array.forEach(file => {
    //             dataTransfer.items.add(file);
    //         });
    //         return dataTransfer.files;
    //     } else {
    //         return null;
    //     }
    // }

    // const removeFile = (fileName: string) => {
    //     setSelectedFiles((prevFiles: UploadedFilesProps[]) => {
    //         const fileToRemove = prevFiles.find(file => file.fileUploaded.name === fileName);
    //         if (fileToRemove) {
    //             URL.revokeObjectURL(fileToRemove.urlFile);
    //         }
    //         return prevFiles.filter(file => file.fileUploaded.name !== fileName);
    //     });
    // };

    return (
        <Flex direction="column" justify="center" gap={2} pt={5}>
            {/* Hidden file input element */}
            {/* <input
                type="file"
                ref={inputRef}
                onChange={handleOnChange}
                // style={{ display: "none" }}
                hidden
                multiple
                accept="application/*"
            /> */}
            <Input
                type="file"
                ref={inputRef}
                onChange={handleOnChange}
                // style={{ display: "none" }}
                hidden
                multiple
                accept="application/*"
            />

            {/* Button to trigger the file input dialog */}
            <UploadButton handleUploadFile={onChooseFile} />

            {uploadedFilesAddContent && (
                <Flex gap={2} direction="column">
                    {uploadedFilesAddContent.map((file: UploadedFilesProps, index: number) => (
                        <BoxUploadedFile
                            key={index}
                            fileName={file.fileUploaded.name}
                            urlFile={file.urlFile}
                            handleRemoveClick={() => removeUploadedFileAddContent(file)}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default FileUpload;
