import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';

import {
  UserInfo,
  Scroller,
  SwipeDot,
  PageBody,
  Container,
  UserAvatar,
  BackButton,
  SwiperItem,
  ServiceArea,
  SwiperImage,
  UserInfoArea,
  UserInfoName,
  UserFavButton,
  SwipeDotActive,
  TestimonialArea,
} from './styles';

import Api from '../../api';
import {petPictures} from '../../data/petPictures';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [userInfo, setUserInfo] = useState({
    id: route.params.id,
    avatar: route.params.avatar,
    name: route.params.name,
    stars: route.params.stars,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await Api.getBarber(userInfo.id);

      if (json.error === '') {
        setUserInfo(json.data);
      } else {
        alert('Erro: ' + json.error);
      }

      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Scroller>
        <Swiper
          style={{height: 240}}
          dot={<SwipeDot />}
          activeDot={<SwipeDotActive />}
          paginationStyle={{
            top: 15,
            right: 15,
            bottom: null,
            left: null,
          }}
          autoplay={true}>
          {petPictures.map((item, index) => (
            <SwiperItem key={index}>
              <SwiperImage source={item.image} resizeMode="cover" />
            </SwiperItem>
          ))}
        </Swiper>
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{uri: userInfo.avatar}} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber={true} />
            </UserInfo>
            <UserFavButton>
              <FavoriteIcon width="24" height="24" fill="#ff0000" />
            </UserFavButton>
          </UserInfoArea>
          <ServiceArea>

          </ServiceArea>
          <TestimonialArea>
            
          </TestimonialArea>
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#ffffff" />
      </BackButton>
    </Container>
  );
};
