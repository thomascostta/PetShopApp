import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../api';

import {UserContext} from '../../contexts/UserContext';

import {
  Container,
  InputArea,
  CustomButton,
  CustomButtomText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';
import SignInput from '../../components/SignInput';

import PetShop from '../../assets/house-pet.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const {dispatch: userDispatch} = useContext(UserContext);
  const navigation = useNavigation();

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  const handleSignClick = async () => {
    if (emailField != '' && passwordField != '') {
      let json = await Api.signIn(emailField, passwordField);

      if (json.token) {
        await AsyncStorage.setItem('token', json.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: json.data.avatar,
          },
        });

        navigation.reset({
          routes: [{name: 'MainTab'}],
        });
      } else {
        alert('E-mail e/ou senha errados!');
      }
    } else {
      alert('Preencha os Campos');
    }
  };

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{name: 'SignUp'}],
    });
  };

  return (
    <Container>
      <PetShop width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite seu e-mail"
          value={emailField}
          onChangeText={(text) => setEmailField(text)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite sua senha"
          email={passwordField}
          onChangeText={(text) => setPasswordField(text)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustomButtomText>LOGIN</CustomButtomText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold> Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
