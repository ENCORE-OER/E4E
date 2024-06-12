import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Create from '../../../pages/create';
import Edit from '../../../pages/create/edit';

export default function TabGenerateAI() {
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);

  return (
    <Flex w="100%">
      {!isEditClicked ? (
        <Create
          isAddContentModal={true}
          isEditClicked={isEditClicked}
          setIsEditClicked={setIsEditClicked}
        />
      ) : (
        <Edit
          isAddContentModal={true}
          isEditClicked={isEditClicked}
          setIsEditClicked={setIsEditClicked}
        />
      )}
    </Flex>
  );
}
