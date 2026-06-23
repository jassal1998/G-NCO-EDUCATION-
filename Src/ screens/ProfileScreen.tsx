import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMySchool} from '../Redux/api/schoolApiMethods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
  const dispatch = useDispatch<any>();
const navigation = useNavigation<any>()
  const {school, loading} = useSelector(
    (state: any) => state.school,
  );

  const profile = school?.data?.profileData;



  const handleLogout = async () => {
  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('token');

            navigation.reset({
              index: 0,
              routes: [
                {name: 'LoginScreen'},
              ],
            });
          } catch (error) {
            console.log(
              'Logout Error =>',
              error,
            );
          }
        },
      },
    ],
  );
};
  useEffect(() => {
    dispatch(fetchMySchool());
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#1565C0"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Student Profile
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                profile?.logo ||
                'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            }}
            style={styles.profileImage}
          />
        </View>

        {/* Name Card */}
        <View style={styles.card}>
          <Text style={styles.name}>
            {profile?.studentName || 'N/A'}
          </Text>

          <Text style={styles.grade}>
            {profile?.grade || 'N/A'}
          </Text>

          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {profile?.status || 'ACTIVE'}
            </Text>
          </View>
        </View>

        {/* Personal Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Personal Information
          </Text>

          <Text style={styles.info}>
            Admission No:{' '}
            {profile?.admissionNo || 'N/A'}
          </Text>

          <Text style={styles.info}>
            Roll No: {profile?.rollNo || 'N/A'}
          </Text>

          <Text style={styles.info}>
            Gender: {profile?.gender || 'N/A'}
          </Text>

          <Text style={styles.info}>
            Blood Group:{' '}
            {profile?.bloodGroup || 'N/A'}
          </Text>

          <Text style={styles.info}>
            Date Of Birth:{' '}
            {profile?.dateOfBirth || 'N/A'}
          </Text>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Contact Information
          </Text>

          <Text style={styles.info}>
            Mobile:{' '}
            {profile?.mobile || 'Not Available'}
          </Text>

          <Text style={styles.info}>
            Email:{' '}
            {profile?.email || 'Not Available'}
          </Text>

          <Text style={styles.info}>
            Address:{' '}
            {profile?.address &&
            !profile.address.includes('null')
              ? profile.address
              : 'Not Available'}
          </Text>
        </View>

        {/* Academic Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Academic Information
          </Text>

          <Text style={styles.info}>
            Class: {profile?.grade || 'N/A'}
          </Text>

          <Text style={styles.info}>
            Admission No:{' '}
            {profile?.admissionNo || 'N/A'}
          </Text>

          <Text style={styles.info}>
            Student Status:{' '}
            {profile?.status || 'N/A'}
          </Text>
        </View>
        <TouchableOpacity
  style={styles.logoutButton}
  onPress={handleLogout}>
  <Text style={styles.logoutText}>
    Logout
  </Text>
</TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FC',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

 header: {
  height: 130,
  backgroundColor: '#1565C0',
  borderBottomLeftRadius: 35,
  borderBottomRightRadius: 35,
  justifyContent: 'flex-end',
  paddingHorizontal: 20,
  paddingBottom: 40,
},

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 55,
    zIndex: 999,
  },

  profileImage: {
    width: 115,
    height: 115,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: '#fff',
    backgroundColor: '#fff',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 15,
    elevation: 5,
  },

  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
  },

  grade: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },

  statusBadge: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: '#2E7D32',
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 15,
  },

  info: {
    fontSize: 16,
    color: '#444',
    marginVertical: 6,
    lineHeight: 24,
  },
  logoutButton: {
  backgroundColor: '#E53935',
  height: 55,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 25,
  marginBottom: 30,
},

logoutText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '700',
},
});