import { Button, Flex, Input, Checkbox, Stack, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { useHasHydrated } from '../../utils/utils';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { OptionsData } from '../../types/encoreElements';

type EditableCheckboxMenuProps = {
  initialOptions: OptionsData[];
  onChange: (option: OptionsData) => void;
  onOptionsChange?: (newOptions: OptionsData[]) => void;
};

function EditableCheckboxMenu({
  initialOptions,
  onChange, //gestisce il cambiamento di stato di una voce
  onOptionsChange, //gestisce il cambiamento di stato di tutte le voci
}: EditableCheckboxMenuProps) {
  const [options, setOptions] = useState(initialOptions || []);
  const [inputText, setInputText] = useState('');
  const hydrated = useHasHydrated();

  const handleCheckboxChange = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions[index][1] = !updatedOptions[index][1];
    setOptions(updatedOptions);
    onChange(updatedOptions[index]);
  };

  const handleAddOption = () => {
    if (inputText.trim() !== '') {
      const newOption: OptionsData = [inputText, false];
      setOptions([...options, newOption]);
      setInputText('');
      onChange(newOption);
    }
  };

  const handleRemoveOption = (index: number) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
    if (onOptionsChange) onOptionsChange(updatedOptions);
  };

  return (
    <>
      <Stack direction="column">
        {hydrated &&
          options.map(([text, isChecked], index) => (
            <Flex key={index}>
              <Checkbox
                isChecked={isChecked}
                onChange={() => handleCheckboxChange(index)}
                w="40%"
                colorScheme="yellow"
              >
                {text}
              </Checkbox>
              <Button
                colorScheme="yellow"
                size="md"
                ml={2}
                onClick={() => handleRemoveOption(index)}
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
        <Button colorScheme="yellow" size="md" onClick={handleAddOption} ml={2}>
          <Flex align="center">
            <Icon as={AddIcon} w={4} h={4} />
          </Flex>
        </Button>
      </Flex>
    </>
  );
}

export default EditableCheckboxMenu;
