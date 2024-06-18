import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  InputGroup,
  Text,
} from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";
import UploadButton from '../Buttons/ButtonsDesignPage/ButtonsLessonCard/UploadButton';
import IconDocument from '../Icons/IconDocuments/IconDocument';

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
  const { ref, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
  };

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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
      <Flex justifyItems="center" direction="column" >
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
          <Flex w="100%" justifyItems="center" direction="column" pt={4}>
            <Text mb={2}>Selected Files:</Text>
            {Array.from(selectedFiles).map((file: File, index: number) => (
              <Flex key={index} align="center" border="1px solid" bg="white" borderRadius="lg" p={2} gap={1}>
                <IconDocument />
                <Text >{file.name}</Text>
                <Button variant="ghost" p={0}><IoMdClose fontSize="x-large" /></Button>
              </Flex>
            ))}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default UploadFile;
