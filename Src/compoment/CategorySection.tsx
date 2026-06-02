import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const categories = [
  {id: '1', title: 'School', icon: '🏫'},
  {id: '2', title: 'Homework', icon: '📚'},
  {id: '3', title: 'Parents', icon: '👨‍🏫'},
  {id: '4', title: 'Fees Details', icon: '💰'},
  {id: '5', title: 'Attendance', icon: '📅'},
  {id: '6', title: 'Results', icon: '📝'},
];

const CategorySection = () => {
  const navigation = useNavigation<any>();

  const handleNavigation = (title: string) => {
    switch (title) {
     
       case 'School':
        navigation.navigate('SchoolDetails');
        break;

       case 'Fees Details':
        navigation.navigate('FeesDetailsScreen');
        break;

      default:
        break;
    }
  };

  return (
    <FlatList
      data={categories}
      numColumns={2}
      scrollEnabled={false}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleNavigation(item.title)}>
          <Text style={styles.icon}>{item.icon}</Text>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },

  card: {
  width: '47%',
  margin: 6,
  backgroundColor: '#FFFFFF',
  borderRadius: 15,
  paddingVertical: 25,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 4,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

  icon: {
    fontSize: 35,
  },

  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});