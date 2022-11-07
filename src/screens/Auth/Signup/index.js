import React, { useState } from 'react';
import {Input, Text, Box, VStack, Button, HStack, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {ActivityIndicator} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Signup({navigation}) {
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [passwordIcon, setPasswordIcon] = React.useState('eye');
  const [isPassword, setIsPassword] = React.useState('password');

  /**
   * Go to login screen
   */
  const goToLoginScreen = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        return database().ref(`/users/${response.user.uid}`).set({
          name,
          lastName,
          email,
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        }
      });
  };

  const verifyPassword = () => {
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return false;
    }
    return password === confirmPassword;
  };

  const togglePassword = () => {
    setPasswordIcon(prev => prev === 'eye' ? 'eye-slash' : 'eye')
    setIsPassword(prev => prev === 'password' ? 'text' : 'password');
  }

  return (
    <Box bgColor={'white'} justifyContent={'center'} flex={1} safeAreaTop>
      <Button variant={'ghost'} width={120} onPress={goToLoginScreen}>
        <HStack pl={5} alignContent={'center'}>
          <Icon
            as={Ionicons}
            name={'arrow-back-outline'}
            size={'md'}
            color={'blue.500'}
            fontWeight={'bold'}
          />
          <Text color={'blue.500'} fontWeight={'bold'}>
            Login
          </Text>
        </HStack>
      </Button>
      <Box flex={1}>
        <VStack p={10} space={4}>
          <Text
            textAlign={'center'}
            fontSize={26}
            color={'gray'}
            fontWeight={'bold'}>
            Signup
          </Text>
          {errorMessage && <Text color={'red.500'}>{errorMessage}</Text>}
          <Box>
            <Text color={'white'}>Name</Text>
            <Input
              variant="filled"
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)}
            />
          </Box>
          <Box>
            <Text color={'white'}>Last Name</Text>
            <Input
              variant="filled"
              placeholder="Last Name"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </Box>
          <Box>
            <Text color={'white'}>Email</Text>
            <Input
              variant="filled"
              placeholder="Email"
              value={email}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              onChangeText={text => setEmail(text)}
            />
          </Box>
          <Box>
            <Text color={'white'}>Password</Text>
            <Input
              variant="filled"
              placeholder="Password"
              value={password}
              type={isPassword}
              onChangeText={text => setPassword(text)}
              onBlur={verifyPassword}
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
          <Box>
            <Text color={'white'}>Repeat Password</Text>
            <Input
              variant="filled"
              placeholder="Password"
              type={'password'}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              onBlur={verifyPassword}
            />
          </Box>
          <Button
            alignSelf={'center'}
            variant={'solid'}
            bgColor={'white'}
            mt={5}
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'blue',
              width: 200
            }}
            onPress={handleSignup}
            disabled={!verifyPassword || loading}>
            <HStack>
              {loading && <ActivityIndicator />}
              <Text color={'blue.500'} fontWeight={'bold'}>
                Create account
              </Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}