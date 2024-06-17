import { Flex, FormControl, FormErrorMessage, InputGroup, Text } from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import UploadButton from '../Buttons/ButtonsDesignPage/ButtonsLessonCard/UploadButton';

type FileUploadProps = {
    register: UseFormRegisterReturn;
    accept?: string;
    multiple?: boolean;
    children?: ReactNode;
    onFilesSelected: (files: FileList) => void;
};

const FileUpload = (props: FileUploadProps) => {
    const { register, accept, multiple, children, onFilesSelected } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

    const handleClick = () => inputRef.current?.click();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            onFilesSelected(files);
        }
    };

    return (
        <InputGroup onClick={handleClick}>
            <input
                type="file"
                multiple={multiple || false}
                hidden
                accept={accept}
                onChange={handleChange}
                {...rest}
                ref={(e) => {
                    ref(e);
                    inputRef.current = e;
                }}
            />
            {children}
        </InputGroup>
    );
};

type FormValues = {
    file_: FileList;
};

const UploadFile = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit = handleSubmit((data) => {
        console.log('On Submit: ', data);
        setSelectedFiles(data.file_);
        // Handle file upload here
    });

    const validateFiles = (value: FileList) => {
        if (value.length < 1) {
            return 'Files are required';
        }
        for (const file of Array.from(value)) {
            const fsMb = file.size / (1024 * 1024);
            const MAX_FILE_SIZE = 10;
            if (fsMb > MAX_FILE_SIZE) {
                return 'Max file size 10MB';
            }
        }
        return true;
    };

    const handleFilesSelected = (files: FileList) => {
        setSelectedFiles(files);
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <FormControl isInvalid={!!errors.file_} isRequired>
                    <FileUpload
                        accept="application/*"
                        multiple
                        register={register('file_', { validate: validateFiles })}
                        onFilesSelected={handleFilesSelected}
                    >
                        <UploadButton />
                    </FileUpload>
                    <FormErrorMessage>
                        {errors.file_ && errors?.file_.message}
                    </FormErrorMessage>
                </FormControl>
                {/* {selectedFiles && selectedFiles.length > 0 && ( */}
                <button type="submit">Confirm</button>
                {/* )} */}
            </form>
            {selectedFiles && selectedFiles.length > 0 && (
                <Flex justify="center" direction="column" mt={4}>
                    <Text mb={2}>Selected Files:</Text>
                    {Array.from(selectedFiles).map((file: File, index: number) => (
                        <Text key={index}>{file.name}</Text>
                    ))}
                </Flex>
            )}
        </>
    );
};

export default UploadFile;