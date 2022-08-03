import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import ExpandIcon from '../assets/expand.svg';

const Modal = styled.Modal``;

const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalBody = styled.View`
  background-color: #83d6e3;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 300px;
  padding: 10px 20px 40px 20px;
`;

const CloseButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
`;

const ModalItem = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserAvatar = styled.Image`
  width: 56px;
  height: 45px;
  border-radius: 20px;
  margin-right: 15px;
`;

const UserName = styled.Text`
  color: #000000;
  font-size: 18px;
  font-weight: bold;
`;

export default ({show, setShow, user, service}) => {
  const navigation = useNavigation();

  const handleCloseButton = () => {
    setShow(false);
  };

  return (
    <Modal transparent={true} visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000000" />
          </CloseButton>

          <ModalItem>
            <UserInfo>
              <UserAvatar source={{uri: user.avatar}} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
};
