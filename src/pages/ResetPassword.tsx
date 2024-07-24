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
interface FormState {
  password: string;
  confirmPassword: string;
}
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and one dot'
    ),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
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
        `${import.meta.env.VITE_API_URL}/reset-password/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return toast({
          title: 'An error occurred.',
          description: 'Unable to reset password',
          status: 'error',
          isClosable: true,
        });
      }

      await response.json();

      toast({
        title: 'Password reset successfully',
        description: 'You can now login with your new password',
        status: 'success',
        isClosable: true,
      });
      setLocation('/reset-password-successfully', {
        replace: true,
      });
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
            Set a new Password
          </Heading>
          <Text color={'gray.500'}>
            Create a new password. Ensure it differs from previous ones for security
          </Text>
        </Stack>

        <form onSubmit={handleSubmit(onsubmit)}>
          <FormControl mb='1rem'>
            <FormLabel fontWeight={600}>Password</FormLabel>
            <Controller
              name='password'
              control={control}
              rules={{
                required: 'This field is required',
              }}
              render={({ field }) => (
                <Input {...field} type='password' name='password' size={'lg'} />
              )}
            />
            {errors.password && (
              <Text color={'red.500'}>{errors.password.message}</Text>
            )}
          </FormControl>
          <FormControl mb='1.625rem'>
            <FormLabel fontWeight={600}>Confirm Password</FormLabel>
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
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};
