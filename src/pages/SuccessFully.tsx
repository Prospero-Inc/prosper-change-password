import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';

export const Successfully = () => {
  return (
    <Container
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      minH={'100vh'}
    >
      <Box as='article'>
        <Stack mb={'2.375rem'}>
          <Image src='/brand.svg' mb={'3.875rem'} />
          <Heading as={'h4'} mb={'1.125rem'}>
            Password Reset Successfully
          </Heading>
          <Text color={'gray.500'}>
            Your password has been successfully reset. You can now login with your new password

          </Text>
          
        </Stack>
      </Box>
    </Container>
  );
};
