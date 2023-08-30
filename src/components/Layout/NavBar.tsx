import { Flex } from '@chakra-ui/react';

type NavProps = {
  children?: React.ReactNode;
  p?: number;
  bg?: string;
  color?: string;
  justify?: string;
  height?: string;
  width?: string;
  zIndex?: string;
  position?: any;
  borderBottom?: string;
  borderBottomColor?: string;
  borderBottomStyle?: any;
};

export default function Nav({
  children,
  p,
  bg,
  color,
  justify,
  borderBottom,
  borderBottomColor,
  borderBottomStyle,
  height,
  position,
  width,
  zIndex,
}: NavProps) {
  return (
    <Flex
      as="nav"
      //align="center"
      justify={justify || 'space-between'}
      //wrap="wrap"
      p={p || 4}
      bg={bg || 'white'}
      color={color || 'black'}
      height={height || '60px'}
      width={width || '100%'}
      //padding={['10px', '20px', '10px', '20px']}
      //pos="fixed"
      zIndex={zIndex || 'sticky'}
      position={position || 'fixed'}
      borderBottom={borderBottom || '0.5px'}
      borderBottomColor={borderBottomColor || 'secondary'}
      borderBottomStyle={borderBottomStyle || 'solid'}
    >
      {children}
    </Flex>
  );
}
