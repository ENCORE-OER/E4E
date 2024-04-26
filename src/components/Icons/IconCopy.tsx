import { Flex, Icon, IconProps, Tooltip } from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa6';
import { CustomToast } from '../../utils/Toast/CustomToast';

interface IconCopyProps extends IconProps {
  fontSize: string | number;
  url: string;
}

export default function IconCopy({ fontSize, url, ...rest }: IconCopyProps) {
  const { addToast } = CustomToast();
  const handleIconClick = async (url: string) => {
    if (url.trim() != '') {
      try {
        await navigator.clipboard.writeText(url);
        console.log(url);
        addToast({
          message: 'OER url saved!',
          type: 'success',
        });
      } catch (error) {
        console.error(error);
        addToast({
          message: 'Opss... There was a problem. OER url not saved!',
          type: 'error',
        });
      }
    } else {
      addToast({
        message: 'Opss... Url is empty. OER url not saved!',
        type: 'error',
      });
    }
  };

  return (
    <Tooltip
      aria-label={'Copy OER url'}
      label={'Copy OER url'}
      hasArrow
      placement="right"
      bg="gray.100"
      color="primary"
      fontSize={'sm'}
      p={1}
    >
      <Flex>
        <Icon
          {...rest}
          as={FaCopy}
          style={{
            //background: 'none',
            cursor: 'pointer',
            position: 'sticky',
            fontSize: fontSize,
            padding: '2',
          }}
          _hover={{
            background: 'gray.200',
            borderRadius: '7px',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(url);
          }}
        />
      </Flex>
    </Tooltip>
  );
}
