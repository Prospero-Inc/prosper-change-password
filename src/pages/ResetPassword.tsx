import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Controller, useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'wouter';

import language from '../languages/en/index.json';
interface FormState {
  password: string;
  confirmPassword: string;
}
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(language.errors.password.required)
    .min(8, language.errors.password.min)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      language.errors.password.pattern
    ),
  confirmPassword: yup
    .string()
    .required(language.errors.confirmPassword.required)
    .oneOf([yup.ref('password')], language.errors.confirmPassword.match),
});

type ResetPasswordProps = {
  token: string;
};
export const ResetPassword = ({ token }: ResetPasswordProps) => {
  const toast = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormState>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onsubmit = async (data: FormState) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        toast({
          title: language.toast.success.title,
          description: language.toast.success.description,
          status: 'success',
          isClosable: true,
        });
        return setLocation('/reset-password-successfully', {
          replace: true,
        });
      }
      if (!response?.ok) {
        return toast({
          title: language.toast.error.title,
          description: language.toast.error.description,
          status: 'error',
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minH={'100vh'}
      w={'sm'}
    >
      <Box as='article'>
        <Stack mb={'2.375rem'}>
          <Image src='/brand.svg' mb={'3.875rem'} />
          <Heading as={'h4'} mb={'1.125rem'}>
            {language.heading}
          </Heading>
          <Text color={'gray.500'}>{language.text}</Text>
        </Stack>

        <form onSubmit={handleSubmit(onsubmit)}>
          <FormControl mb='1rem'>
            <FormLabel fontWeight={600}>{language.labelPassword}</FormLabel>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <Input {...field} type='password' name='password' size={'lg'} />
              )}
            />
            {errors.password && (
              <Text color={'red.500'}>{errors.password.message}</Text>
            )}
          </FormControl>
          <FormControl mb='1.625rem'>
            <FormLabel fontWeight={600}>{language.labelConfirmPassword}</FormLabel>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type='password'
                  name='confirmPassword'
                  size={'lg'}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text color={'red.500'}>{errors?.confirmPassword?.message}</Text>
            )}
          </FormControl>
          <Button
            type='submit'
            colorScheme='primary'
            w={'full'}
            size={'lg'}
            isLoading={isLoading}
          >
            {language.submit}
          </Button>
        </form>
      </Box>
    </Container>
  );
};
