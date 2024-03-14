import {
  Button,
  Flex,
  Input,
  Checkbox,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHasHydrated } from '../../utils/utils';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

type EditableCheckboxMenuProps = {
  initialOptions: { [key: string]: boolean };
  onChange: (answer: string, isChecked: boolean) => void;
  onOptionsChange?: (newOptions: { [key: string]: boolean }) => void;
};

function EditableCheckboxMenu({ initialOptions, onChange, onOptionsChange }: EditableCheckboxMenuProps) {
  const [options, setOptions] = useState(initialOptions || {});
  const [inputText, setInputText] = useState('');
  const hydrated = useHasHydrated();

  const handleCheckboxChange = (key: string) => {
    setOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions, [key]: !prevOptions[key] };
      onChange(key, updatedOptions[key]);
      return updatedOptions;
    });
  };

  const handleAddOption = () => {
    if (inputText.trim() !== '') {
      setOptions({ ...options, [inputText]: false });
      setInputText('');
      onChange(inputText, false);
    }
  };

  const handleRemoveOption = (key: string) => {
    const { [key]: _, ...newOptions } = options;
    console.log(_);
    setOptions(newOptions);
    if(onOptionsChange) onOptionsChange(newOptions);
  };

  return (
    <>
      <Stack direction="column">
        {hydrated &&
          Object.entries(options).map(([key, value]) => (
            <Flex key={key}>
              <Checkbox
                isChecked={value}
                onChange={() => handleCheckboxChange(key)}
                w="40%"
                colorScheme="yellow"
              >
                {key}
              </Checkbox>
              <Button
                colorScheme="yellow"
                size="md"
                onClick={() => handleRemoveOption(key)}
              >
                <Icon as={DeleteIcon} w={4} h={4} />
              </Button>
            </Flex>
          ))}
      </Stack>
      <Flex paddingTop={'0.25rem'}>
        <Input
          w={'40%'}
          placeholder="New option"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button colorScheme="yellow" size="md" onClick={handleAddOption}>
          <Flex align="center">
            <Icon as={AddIcon} w={4} h={4} />
          </Flex>
        </Button>
      </Flex>
    </>
  );
}

export default EditableCheckboxMenu;
