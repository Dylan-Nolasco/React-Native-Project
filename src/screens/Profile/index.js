import {
  VStack,
  Image,
  Icon,
  HStack,
  Avatar,
  ScrollView,
  Box,
} from 'native-base';
import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import friends from '../../assets/js/images/LoginFriends.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useState, useEffect} from 'react';

export default function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([]);
    // Assuming user is logged in
    const userId = auth().currentUser.uid;

    database()
      .ref('/users')
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          if (childSnapshot.key !== userId) {
            setUsers(prev => [...prev, childSnapshot.val()]);
          }
        });
      });
  }, []);

  const FriendItem = props => {
    return (
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack margin={1}>
          <Avatar
            size={'sm'}
            source={props.avatar && {uri: props.avatar}}
            mr={3}
          />
          <Text fontSize={18}>{`${props.name}`}</Text>
        </HStack>
        <Icon
          as={MaterialIcons}
          name="radio-button-checked"
          style={{color: 'green'}}
        />
      </HStack>
    );
  };

  return (
    <Box style={styles.container}>
      <ScrollView>
        <VStack>
          <View style={styles.bgContainer}>
            <Image source={friends} style={styles.bgImg} alt={'image'} />
          </View>
          <View>
            <View>
              <Image source={friends} style={styles.profileImg} alt={'image'} />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Dylan Nolasco</Text>
          </View>
          <View style={styles.infoText}>
            <Text>Info: </Text>
            <VStack>
              <HStack marginBottom={1}>
                <Icon
                  name={'facebook'}
                  as={MaterialIcons}
                  size={'md'}
                  mr={3}
                  color={'blue'}
                />
                <Text>Dylan Nolasco</Text>
              </HStack>
              <HStack marginBottom={1}>
                <Icon
                  name={'email'}
                  as={MaterialIcons}
                  size={'md'}
                  mr={3}
                  color={'blue'}
                />
                <Text>dylann@bluetrailsoft.com</Text>
              </HStack>
              <HStack marginBottom={1}>
                <Icon
                  name={'phone'}
                  as={MaterialIcons}
                  size={'md'}
                  mr={3}
                  color={'blue'}
                />
                <Text>777-444-5455</Text>
              </HStack>
            </VStack>
          </View>
          <View style={styles.infoText}>
            <Text>Friends: </Text>
            {users.map(user => (
              <FriendItem name={user.name} avatar={user.avatar} />
            ))}
          </View>
        </VStack>
      </ScrollView>
    </Box>
  );
}
