import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useHasHydrated } from '../../utils/utils';

type EditableRadioMenuProps = {
  initialOptions: { [key: string]: boolean };
  onChange: (answer: string, isChecked: boolean) => void;
  onOptionsChange: (newOptions: { [key: string]: boolean }) => void;
};

function EditableRadioMenu({
  initialOptions,
  onChange,
  onOptionsChange,
}: EditableRadioMenuProps) {
  const [options, setOptions] = useState(initialOptions || []);
  const [selectedValue, setSelectedValue] = useState('1');
  const [inputText, setInputText] = useState('');
  const hydrated = useHasHydrated();

  useEffect(() => {
    const selectedKey = Object.keys(options).find(
      (key) => options[key] === true
    );
    setSelectedValue(selectedKey || '');
  }, [options]);

  const handleRadioChange = (key: string) => {
    setOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };

      // Imposta tutte le opzioni a false
      Object.keys(updatedOptions).forEach((optionKey) => {
        updatedOptions[optionKey] = false;
      });

      // Imposta la voce selezionata a true
      updatedOptions[key] = true;

      // Notifica al componente padre le modifiche di tutte le opzioni
      onOptionsChange(updatedOptions);

      return updatedOptions;
    });

    setSelectedValue(key);
    onChange(key, true); // Notifica al componente padre le modifiche della voce selezionata
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
    setOptions(newOptions);
    onOptionsChange(newOptions);
    console.log(_);
  };

  return (
    <>
      <RadioGroup onChange={handleRadioChange} value={selectedValue}>
        <Stack direction="column">
          {hydrated &&
            Object.entries(options).map(([key]) => (
              <Flex key={key}>
                <Radio value={key} w="40%" colorScheme="yellow">
                  {key}
                </Radio>
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
      </RadioGroup>
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

export default EditableRadioMenu;
