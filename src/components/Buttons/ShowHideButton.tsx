import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

interface ShowHideButtonProps {
  showButtonName: string; // the name of the button when it is not clicked
  hideButtonName: string; // the name of the button when it is clicked
  isClicked: boolean;
  setIsClicked: Dispatch<SetStateAction<boolean>>;
  showBox: boolean;
  setShowBox: Dispatch<SetStateAction<boolean>>;
}

export default function ShowHideButton({
  showButtonName,
  hideButtonName,
  isClicked,
  setIsClicked,
  showBox,
  setShowBox,
}: ShowHideButtonProps) {
  const [buttonName, setButtonName] = useState(showButtonName);

  const handleButtonClick = () => {
    if (showBox === false) {
      setButtonName(hideButtonName);
      setShowBox(true);
      setIsClicked(!isClicked);
    } else {
      setButtonName(showButtonName);
      setShowBox(false);
      setIsClicked(!isClicked);
    }
  };

  return (
    <Button
      variant="link"
      rightIcon={!isClicked ? <ChevronDownIcon /> : <ChevronUpIcon />}
      onClick={handleButtonClick}
    >
      {buttonName}
    </Button>
  );
}
