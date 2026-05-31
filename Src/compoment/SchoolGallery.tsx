import React from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const images = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80',
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0',
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
  },
];

const SchoolGallery = () => {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={images}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
       <Image
  source={{uri: item.image}}
  style={styles.image}
  onError={e => console.log('Image Error:', e.nativeEvent)}
/>
      )}
    />
  );
};

export default SchoolGallery;

const styles = StyleSheet.create({
  image: {
    width: width - 40,
    height: 220,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 10,
  },
});