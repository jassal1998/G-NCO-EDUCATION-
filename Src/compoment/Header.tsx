import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMySchool} from '../Redux/api/schoolApiMethods';
const Header = () => {

   const dispatch = useDispatch<any>();
    const {school, loading} = useSelector(
       (state: any) => state.school,
     );
     console.log("Aaadda",school)
      useEffect(() => {
         dispatch(fetchMySchool());
       }, []);
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>   {school?.data?.profileData?.school?.schoolName}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1E88E5',
  },
  container: {
    height: 60,
    backgroundColor: '#1E88E5',
    justifyContent: 'center',
    alignItems: "flex-start", // right side
    paddingHorizontal: 15,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});