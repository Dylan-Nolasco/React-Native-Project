import React from 'react';
import auth from '@react-native-firebase/auth';
import {Input, Text, Box, VStack, Button, Image, HStack, Icon} from 'native-base';
import styles from './styles';
import friends from '../../../assets/js/images/LoginFriends.jpg';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Login({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [passwordIcon, setPasswordIcon] = React.useState('eye');
  const [isPassword, setIsPassword] = React.useState('password');
  /**
   * Go to signup screen
   */
  const goToSignup = () => {
    navigation.navigate('Signup');
  };

  /**
   * Handle login
   */
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        }
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('User not found');
        }
        if (error.code === 'auth/wrong-password') {
          setErrorMessage('Wrong password');
        }
      });
  };

  const togglePassword = () => {
    setPasswordIcon(prev => prev === 'eye' ? 'eye-slash' : 'eye')
    setIsPassword(prev => prev === 'password' ? 'text' : 'password');
  }

  return (
    <Box bgColor={'white'} flex={1} safeAreaTop>
      <Image
        source={friends}
        style={{
          height: 350,
        }}
        alt={'image'}
      />
      <VStack p={10} space={4}>
        {errorMessage && (
          <Text color={'red.500'} textAlign={'center'} bold>
            {errorMessage}
          </Text>
        )}
        <Box>
          <Text color={'black'}>Email</Text>
          <Input
            variant="filled"
            placeholder="Email"
            bgColor={'gray.100'}
            value={email}
            keyboardType={'email-address'}
            textContentType={'emailAddress'}
            onChangeText={text => setEmail(text)}
          />
        </Box>
        <Box>
          <Text color={'black'}>Password</Text>
          <Input
            variant="filled"
            placeholder="Password"
            type={isPassword}
            backgroundColor={'gray.100'}
            value={password}
            onChangeText={text => setPassword(text)}
            InputRightElement={
              <Icon
              size="6"
              style={{
                margin: 2,
                marginRight: 1,
                fontSize: 20,
                color: 'gray',
                width: 35
              }}
              onPress={togglePassword}
              as={<FontAwesome5 name={passwordIcon} />}
              />
            }
          />
        </Box>
        <Button
          alignSelf={'center'}
          variant={'solid'}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: 'blue',
            width: 200
          }}
          disabled={email === '' || password === ''}
          onPress={handleLogin}>
          <Text
            color={'blue.500'}
            fontWeight={'bold'}
            fontSize={20}
            borderColor={'blue'}>
            Login
          </Text>
        </Button>
        <Button variant={'link'} onPress={goToSignup} alignSelf={'center'}>
        <Text color={'gray'} fontSize={16}>
          Don't have an account?
          <Text fontSize={20} bold> Join us!</Text>
        </Text>
        </Button>
      </VStack>
    </Box>
  );
}
