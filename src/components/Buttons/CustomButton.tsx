import { Button, ButtonProps } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface CustomButtonProps extends ButtonProps {
  text: string;
  pathname?: string;
  variant?: string;
  handleCustomClick?: () => void;
}

export default function CustomButton({
  text,
  pathname,
  variant,
  handleCustomClick,
  ...rest
}: CustomButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: pathname,
    });
  };

  return (
    <Button
      {...rest}
      display="flex"
      variant={variant}
      onClick={(e: any) => {
        e.preventDefault();
        if (handleCustomClick) handleCustomClick();
        if (pathname) handleClick();
      }}
    >
      {text}
    </Button>
  );
}
