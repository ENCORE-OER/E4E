import { Flex } from '@chakra-ui/react';
import UploadFile from '../../FileUpload/UploadFile';

export default function TabUploadFiles() {
  // const [uploading, setUploading] = useState(false);
  // const { addToast } = CustomToast();

  // const handleUploadFile = async (file: File) => {
  //   try {
  //     setUploading(true);
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await fetch('SERVER_URL', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       addToast({
  //         message: 'File uploaded successfully!',
  //         type: 'success',
  //       });
  //     } else {
  //       addToast({
  //         message: `Error during the file uploading: ${response.statusText}`,
  //         type: 'error',
  //       });
  //     }
  //   } catch (error) {
  //     addToast({
  //       message: `Error during the file uploading: ${error}`,
  //       type: 'error',
  //     });
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <Flex w="100%" justify="center">
      {/* <Flex direction="column">
        <UploadButton
          handleUploadFile={handleUploadFile}
          // disabled={uploading}
          disabled={true}
        />
        {uploading && <Text>File Uploading...</Text>}
      </Flex> */}
      <UploadFile />
    </Flex>
  );
}
