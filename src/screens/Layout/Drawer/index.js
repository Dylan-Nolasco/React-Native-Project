import React, {useEffect, useState} from 'react';
import {HStack, VStack, Icon, Text, Avatar, Badge, Box} from 'native-base';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

export default function Drawer() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    // Assuming user is logged in
    const userId = auth().currentUser.uid;
    const reference = database().ref(`/online/${userId}`);

    // Set the /users/:userId value to true
    reference
      .set(true)
      .then(() => console.log('Online presence set'))
      .catch(error => {
        Alert.alert(error.message);
      });

    // Remove the node whenever the client disconnects
    reference
      .onDisconnect()
      .remove()
      .then(() => console.log('On disconnect function configured.'));

    database()
      .ref('/online')
      .on('value', snapshot => {
        const data = snapshot.val();
        getOnlineUsers(data);
      });
  }, []);

  const navigation = useNavigation();
  const menuItems = [
    {
      name: 'Home',
      icon: 'home',
      route: 'Home',
    },
    {
      name: 'Profile',
      icon: 'person',
      route: 'Profile',
    },
    {
      name: 'Settings',
      icon: 'settings',
      route: 'Settings',
    },
  ];

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      });
  };

  const getOnlineUsers = online => {
    const userId = auth().currentUser.uid;
    setOnlineUsers([]);
    database()
      .ref('/users')
      .on('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          if (online[childSnapshot.key]) {
            setOnlineUsers(prev => [...prev, childSnapshot.val()]);
          }
        });
      });
  };

  const MenuItem = props => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(props.route)}>
        <HStack
          alignItems={'center'}
          m={2}
          p={1}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderBottomColor: 'gray',
          }}>
          <Icon
            name={props.icon}
            as={MaterialIcons}
            size={'md'}
            mr={3}
            color={'blue'}
          />
          <Text fontSize={18} bold color={'red'}>
            {props.name}
          </Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  const FriendItem = props => {
    return (
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <HStack>
          <Avatar size={'sm'} source={{uri: props.avatar}} mr={3} />
          <Text fontSize={18}>{`${props.name} ${props.lastName}`}</Text>
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
    <VStack safeArea space={3} px={3}>
      {menuItems.map(item => (
        <MenuItem name={item.name} icon={item.icon} route={item.route} />
      ))}
      {onlineUsers.length ? <Text>Online users: </Text> : null}
      {onlineUsers.map(user => (
        <FriendItem name={user.name} lastName={user.lastName} />
      ))}
      <TouchableOpacity onPress={logout}>
        <HStack alignItems={'center'} m={3} mt={10}>
          <Icon
            name={'logout'}
            as={MaterialIcons}
            size={'md'}
            mr={3}
          />
          <Text fontSize={18} bold color={'gray'}>
            Logout
          </Text>
        </HStack>
      </TouchableOpacity>
    </VStack>
  );
}
