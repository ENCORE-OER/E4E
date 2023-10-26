import React, { useState } from 'react';
import { CheckboxGroup, Checkbox, Stack, CSSReset } from '@chakra-ui/react';

type CheckboxMenuProps = {
  onOptionsChange: (newSelectedOptions: string[]) => void;
};

export default function CheckboxMenu({ onOptionsChange }: CheckboxMenuProps) {
  const [selectedOptions, setSelectedOptions] = useState(['List']);

  const handleCheckboxChange = (newSelectedOptions: string[]) => {
    setSelectedOptions(newSelectedOptions);
    onOptionsChange(newSelectedOptions); // Richiama la funzione di callback per passare le scelte al componente genitore
  };

  return (
    <>
      <CSSReset />
      <CheckboxGroup value={selectedOptions} onChange={handleCheckboxChange}>
        <Stack spacing={2} className="radio-menu">
          <Checkbox value="List">List</Checkbox>
          <Checkbox value="Recognise">Recognise</Checkbox>
          <Checkbox value="Recall">Recall</Checkbox>
          <Checkbox value="Identify">Identify</Checkbox>
        </Stack>
      </CheckboxGroup>
    </>
  );
}
