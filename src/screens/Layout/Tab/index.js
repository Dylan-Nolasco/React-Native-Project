import React, {useEffect, useState} from 'react';
import {HStack, VStack, Icon, Text, Avatar, Badge, Box} from 'native-base';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

export default function Tab() {

  const navigation = useNavigation();
  const menuItems = [
    {
      name: 'Home',
      icon: 'home',
      route: 'Home',
    },
    {
      name: 'Search',
      icon: 'search',
      route: 'Search',
    },
    {
      name: 'Notifications',
      icon: 'notification',
      route: 'Notifications',
    },
  ];

  const MenuItem = props => {
    console.log("HOLA")
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
            ola
          </Text>
        </HStack>
      </TouchableOpacity>
    );
  };

  return (
    <HStack safeArea space={3} px={3}>
      {menuItems.map(item => (
        <MenuItem name={item.name} icon={item.icon} route={item.route} />
      ))}
    </HStack>
  );
}
