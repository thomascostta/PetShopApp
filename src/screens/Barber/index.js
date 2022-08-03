import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';

import FavoriteFullIcon from '../../assets/favorite_full.svg';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import {
  SwipeDot,
  UserInfo,
  Scroller,
  PageBody,
  Container,
  UserAvatar,
  BackButton,
  SwiperItem,
  LoadingIcon,
  ServiceItem,
  ServiceName,
  ServiceInfo,
  ServiceArea,
  SwiperImage,
  UserInfoArea,
  ServicePrice,
  UserInfoName,
  UserFavButton,
  ServicesTitle,
  SwipeDotActive,
  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
  ServiceChooseButton,
  ServiceChooseBtnText,
} from './styles';

import Api from '../../api';
import {petPictures} from '../../data/petPictures';
import api from '../../api';

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
  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);

      let json = await Api.getBarber(userInfo.id);

      if (json.error === '') {
        setUserInfo(json.data);
        setFavorited(json.data.favorited);
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

  const handleFavoriteClick = () => {
    setFavorited(!favorited);
    api.setFavorite(userInfo.id);
  };

  const handleServiceChoose = (index) => {
    setSelectedService(index);
    setShowModal(true);
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
            <UserFavButton onPress={handleFavoriteClick}>
              {favorited ? (
                <FavoriteFullIcon width="24" height="24" fill="#ff0000" />
              ) : (
                <FavoriteIcon width="24" height="24" fill="#ff0000" />
              )}
            </UserFavButton>
          </UserInfoArea>

          {loading && <LoadingIcon size="large" color="#000000" />}
          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de serviços</ServicesTitle>
              {userInfo.services.map((item, index) => (
                <ServiceItem key={index}>
                  <ServiceInfo>
                    <ServiceName>{item.name}</ServiceName>
                    <ServicePrice>R$ {item.price}</ServicePrice>
                  </ServiceInfo>
                  <ServiceChooseButton
                    onPress={() => handleServiceChoose(index)}>
                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                  </ServiceChooseButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}

          {/* Waiting for backend regularization */}
          {/* {userInfo && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{height: 110}}
                showsPagination={false}
                showsButtons
                prevButton={
                  <NavPrevIcon width="35" height="35" fill="#000000" />
                }
                nextButton={
                  <NavNextIcon width="35" height="35" fill="#000000" />
                }>
                {userInfo.testimonials.map((item, index) => (
                  <TestimonialItem key={index}>
                    <TestimonialInfo>
                      <TestimonialName>{item.name}</TestimonialName>
                      <Stars stars={item.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{item.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}  */}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <BackIcon width="44" height="44" fill="#ffffff" />
      </BackButton>

      <BarberModal
        show={showModal}
        setShow={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </Container>
  );
};
