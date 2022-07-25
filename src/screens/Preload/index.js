import React, {useEffect} from 'react';
import {Container, LoadingIcon} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import PetShop from '../../assets/house-pet.svg';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // validar o token
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, []);

  return (
    <Container>
      <PetShop width="100%" height="160" />
      <LoadingIcon size="large" color="#ffffff" />
    </Container>
  );
};
