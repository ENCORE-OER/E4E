import { useToast } from '@chakra-ui/react';

type ToastProps = {
  message: string | undefined;
  status: 'info' | 'warning' | 'success' | 'error' | 'loading' | undefined;
};

export const CustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const addToast = (newRes: ToastProps) => {
    toast({
      description: newRes.message,
      status: newRes.status,
      position: 'top-right',
      isClosable: true,
      duration: 5000,
      variant: 'left-accent',
    });
  };

  return { addToast };
};
