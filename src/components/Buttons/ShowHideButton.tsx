import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Button, ButtonProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

interface ShowHideButtonProps extends ButtonProps {
  showButtonName: string; // the name of the button when it is not clicked
  hideButtonName?: string; // the name of the button when it is clicked
  // isClicked: boolean;
  // setIsClicked: Dispatch<SetStateAction<boolean>>;
  showBox: boolean;
  setShowBox: Dispatch<SetStateAction<boolean>>;
  isUpDown?: boolean; // Specifies if the arraows are before Up and than Down
}

export default function ShowHideButton({
  showButtonName,
  hideButtonName,
  // isClicked,
  // setIsClicked,
  showBox,
  setShowBox,
  isUpDown,
  ...rest
}: ShowHideButtonProps) {
  const [buttonName, setButtonName] = useState(showButtonName);

  const handleButtonClick = () => {
    if (showBox === false) {
      setButtonName(hideButtonName || showButtonName);
      setShowBox(true);
      // setIsClicked(!isClicked);
    } else {
      setButtonName(showButtonName);
      setShowBox(false);
      // setIsClicked(!isClicked);
    }

    // setButtonName(showButtonName);
    // setShowBox(!showBox);
    // setIsClicked(!isClicked);
  };

  return (
    <Button
      variant="link"
      rightIcon={
        !isUpDown ? (
          !showBox ? (
            <ChevronDownIcon />
          ) : (
            <ChevronUpIcon />
          )
        ) : showBox ? (
          <ChevronDownIcon />
        ) : (
          <ChevronUpIcon />
        )
      }
      onClick={handleButtonClick}
      {...rest}
    >
      {buttonName}
    </Button>
  );
}
