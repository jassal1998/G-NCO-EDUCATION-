import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchMySchool } from '../../Redux/api/schoolApiMethods';


const SchoolDetails = () => {
  const dispatch = useDispatch<any>();

  const {school, loading, error} = useSelector(
    (state: any) => state.school,
  );
const schoolData = school?.data?.profileData?.school;
  useEffect(() => {
    const loadSchool = async () => {
      try {
        console.log('🚀 SCHOOL API CALLING...');

        const response = await dispatch(
          fetchMySchool(),
        ).unwrap();

        console.log(
          '✅ SCHOOL DATA SUCCESS:',
          JSON.stringify(response, null, 2),
        );
      } catch (err: any) {
        console.log('❌ SCHOOL API ERROR:', err);
      }
    };

    loadSchool();
  }, []);

  useEffect(() => {
    console.log(
      '📦 REDUX SCHOOL DATA:',
      JSON.stringify(school, null, 2),
    );
  }, [school]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri:
            school?.image ||
            'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
        }}
        style={styles.schoolImage}
      />

    <View style={styles.card}>
  <Text style={styles.schoolName}>
    {schoolData?.schoolName || 'School Name'}
  </Text>

  <Text style={styles.description}>
    School Code: {schoolData?.schoolCode || 'N/A'}
  </Text>
</View>

<View style={styles.infoCard}>
  <Text style={styles.heading}>
    School Information
  </Text>

  <Text style={styles.info}>
    🏫 School Name: {schoolData?.schoolName || 'N/A'}
  </Text>

  <Text style={styles.info}>
    🆔 School Code: {schoolData?.schoolCode || 'N/A'}
  </Text>

  <Text style={styles.info}>
    👨‍🏫 Principal: {schoolData?.principalName || 'N/A'}
  </Text>

  <Text style={styles.info}>
    📧 Email: {schoolData?.email || 'N/A'}
  </Text>

  <Text style={styles.info}>
    📞 Phone: {schoolData?.phone || 'N/A'}
  </Text>

  <Text style={styles.info}>
    📍 Address: {schoolData?.address || 'N/A'}
  </Text>

  <Text style={styles.info}>
    🏙️ City: {schoolData?.city || 'N/A'}
  </Text>

  <Text style={styles.info}>
    🌍 State: {schoolData?.state || 'N/A'}
  </Text>

  <Text style={styles.info}>
    🌎 Country: {schoolData?.country || 'N/A'}
  </Text>

  <Text style={styles.info}>
    🌐 Website: {schoolData?.website || 'N/A'}
  </Text>

  <Text style={styles.info}>
    📌 Status: {schoolData?.status || 'N/A'}
  </Text>
</View>
      {error ? (
        <Text style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </ScrollView>
  );
};

export default SchoolDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  schoolImage: {
    width: '100%',
    height: 250,
  },

  card: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 18,
    borderRadius: 15,
    elevation: 4,
  },

  schoolName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },

  description: {
    fontSize: 15,
    color: '#666',
    marginTop: 10,
    lineHeight: 22,
  },

  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 18,
    borderRadius: 15,
    elevation: 4,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 10,
  },

  info: {
    fontSize: 15,
    color: '#444',
    marginVertical: 5,
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
});