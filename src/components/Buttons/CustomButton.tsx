import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type CustomButtonProps = {
  text: string;
  pathname?: string;
  variant?: string;
};

export default function CustomButton({
  text,
  pathname,
  variant,
}: CustomButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: pathname,
    });
  };

  return (
    <Button
      display="flex"
      variant={variant}
      onClick={(e: any) => {
        e.preventDefault();
        handleClick();
      }}
    >
      {text}
    </Button>
  );
}
