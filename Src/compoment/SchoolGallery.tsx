import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
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
    image:
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754',
  },
];

const SchoolGallery = () => {
const flatListRef = useRef<FlatList<any> | null>(null);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === images.length - 1
          ? 0
          : currentIndex + 1;

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000); // 3 sec

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={images}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Image
            source={{uri: item.image}}
            style={styles.image}
          />
        )}
      />

      {/* Dots */}
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index &&
                styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SchoolGallery;

const styles = StyleSheet.create({
  image: {
    width: width - 20,
    height: 220,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 20,
    backgroundColor: '#1565C0',
  },
});