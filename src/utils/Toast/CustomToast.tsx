import { useToast } from '@chakra-ui/react';

type ToastProps = {
  message: string | undefined;
  type: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
};

export const CustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const addToast = (newRes: ToastProps) => {
    toast({
      description: newRes.message,
      status: newRes.type,
      position: 'top-right',
      isClosable: true,
      duration: 5000,
      variant: 'left-accent',
    });
  };

  return { addToast };
};
