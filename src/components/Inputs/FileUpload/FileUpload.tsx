import { Flex, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { CustomToast } from "../../../utils/Toast/CustomToast";
import BoxUploadedFile from "../../Boxes/BoxUploadedFile";
import UploadButton from "../../Buttons/ButtonsDesignPage/ButtonsLessonCard/UploadButton";
// import "./FileUpload.css";

const FileUpload: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const { addToast } = CustomToast()

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
                    message: "The selected files are too big!",
                    type: "error"
                })
            } else {
                setSelectedFiles((prevFiles: File[]) => [...prevFiles, ...filesArray]);
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

    const removeFile = (fileName: string) => {
        setSelectedFiles((prevFiles: File[]) => prevFiles.filter((file: File) => fileName !== file.name));
    };

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


            {selectedFiles && (
                <Flex gap={2} direction="column">
                    {Array.from(selectedFiles).map((file: File, index: number) => (
                        <BoxUploadedFile
                            key={index}
                            fileName={file.name}
                            handleRemoveClick={() => removeFile(file.name)}
                        />
                    ))}
                </Flex>
            )}
        </Flex>
    );
};

export default FileUpload;