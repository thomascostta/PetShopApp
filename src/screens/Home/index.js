import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
} from './styles';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [coords, setCoords] = useState(null);

  const handleLocationFinder = () => {
    setCoords(null);
  };

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu Veterinário favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <SearchIcon width="26" heigth="26" fill="#ffffff" />
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#ffffff"
            value={locationText}
            onChangeText={(text) => setLocationText(text)}
          />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="26" heigth="26" fill="#ffffff" />
          </LocationFinder>
        </LocationArea>
      </Scroller>
    </Container>
  );
};
