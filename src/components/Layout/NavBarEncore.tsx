import { Flex } from '@chakra-ui/react';
import themeEncore from '../../styles/theme';

type NavProps = {
  children?: React.ReactNode;
  p?: number;
  bg?: string;
  color?: string;
  justify?: string;
};

export default function Nav({ children, p, bg, color, justify }: NavProps) {
  return (
    <Flex
      as="nav"
      //align="center"
      justify={justify || 'space-between'}
      wrap="wrap"
      p={p || 4}
      bg={bg || 'white'}
      color={color || 'black'}
      height="60px"
      width="100%"
      //padding={['10px', '20px', '10px', '20px']}
      //pos="fixed"
      zIndex="sticky"
      position="fixed"
      borderBottom="0.5px"
      borderBottomColor={themeEncore.colors.secondary}
      borderBottomStyle={'solid'}
    >
      {children}
    </Flex>
  );
}
