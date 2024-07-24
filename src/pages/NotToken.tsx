import { Box, Container, Heading, Image, Stack, Text } from '@chakra-ui/react';

export const NotToken = () => {
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
            Invalid Token
          </Heading>
          <Text color={'gray.500'}>
            The token is invalid. Please request a new password reset link
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};
