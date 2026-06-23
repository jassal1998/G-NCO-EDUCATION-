// src/screens/SplashScreen.tsx

import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      setTimeout(() => {
        if (!token) {
          navigation.replace('RoleSelectionScreen');
          return;
        }

        const decoded: any = jwtDecode(token);

        if (decoded.role === 'ROLE_STUDENT') {
          navigation.replace('MainTabs');
        } else if (decoded.role === 'ROLE_TEACHER') {
          navigation.replace('TeacherTabs');
        } else {
          navigation.replace('LoginScreen');
        }
      }, 2500); // 2.5 sec splash
    } catch (error) {
      navigation.replace('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      {/* School Logo */}
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2436/2436636.png',
        }}
        style={styles.logo}
      />

      {/* App Name */}
      <Text style={styles.title}>
        School Management
      </Text>

      <Text style={styles.subtitle}>
        Learn • Grow • Succeed
      </Text>

      {/* Loading */}
      <ActivityIndicator
        size="large"
        color="#2563EB"
        style={{marginTop: 30}}
      />

      <Text style={styles.loadingText}>
        Loading...
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },

  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: '#6B7280',
  },
});