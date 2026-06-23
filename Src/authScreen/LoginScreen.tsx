import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import { loginUser } from '../Redux/store/slice/authslice';
import { jwtDecode } from 'jwt-decode';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({navigation}: any) => {
   const dispatch = useDispatch<any>();
const [email, setEmail] = useState('9999999998');
const [password, setPassword] = useState('7d61c1');
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] =
  useState(false);
const handleLogin = async () => {
  console.log('HANDLE LOGIN START');

  try {
   
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter email and password',
        position: "bottom"
      });
      return;
    }
     setLoading(true);

    console.log('BEFORE DISPATCH');

    const result = await dispatch(
      loginUser({
        username: email.trim(),
        password: password.trim(),
      }),
    );

    console.log('AFTER DISPATCH');
    console.log('RESULT =>', JSON.stringify(result, null, 2));

    if (loginUser.fulfilled.match(result)) {
      console.log('LOGIN SUCCESS');

      const accessToken = result.payload?.user?.data?.accessToken;
      const refreshToken = result.payload?.user?.data?.refreshToken;

      if (!accessToken) {
        throw new Error('Access Token not found in response');
      }

      await AsyncStorage.setItem('token', accessToken);

      if (refreshToken) {
        await AsyncStorage.setItem('refreshToken', refreshToken);
      }

      const decoded: any = jwtDecode(accessToken);

      console.log('DECODED =>', decoded);

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome Back',
        position:"bottom"
      });

      if (decoded?.role === 'ROLE_STUDENT') {
        navigation.replace('MainTabs');
      } else if (decoded?.role === 'ROLE_TEACHER') {
        navigation.replace('TeacherTabs');
      }
    } else {
      console.log('LOGIN FAILED =>', result);

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: result.payload || 'Invalid credentials',
        position:"bottom"
      });
    }
  } catch (error: any) {
    
    console.log('LOGIN ERROR =>', error);

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error?.message || 'Something went wrong',
      position:"bottom"
    });
  }
finally {
  setLoading(false);
}
  
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F8FF"
      />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* School Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
              }}
              style={styles.schoolImage}
              resizeMode="cover"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            School Management
          </Text>

          <Text style={styles.subtitle}>
            Welcome Back! Login to continue
          </Text>

          {/* Email */}
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

          {/* Password */}
         <View style={styles.passwordContainer}>
  <TextInput
    placeholder="Password"
    placeholderTextColor="#888"
    value={password}
    onChangeText={setPassword}
    style={styles.passwordInput}
    secureTextEntry={!showPassword}
  />

  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
    style={styles.eyeButton}>
    <Icon
      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
      size={24}
      color="#666"
    />
  </TouchableOpacity>
</View>

          {/* Login Button */}
         <TouchableOpacity
  style={styles.loginButton}
  onPress={handleLogin}
  disabled={loading}>
  
  {loading ? (
    <ActivityIndicator
      size="small"
      color="#fff"
    />
  ) : (
    <Text style={styles.loginText}>
      Login
    </Text>
  )}

</TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },

  scrollContainer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  imageContainer: {
    marginTop: 70,
    alignItems: 'center',
  },

  schoolImage: {
    width: '100%',
    height: 220,
    borderRadius: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginTop: 25,
  },

  subtitle: {
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  input: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 4,
  },

  loginButton: {
    height: 60,
    backgroundColor: '#2563EB',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#2563EB',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    elevation: 6,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  forgotText: {
    textAlign: 'center',
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 25,
  },
  passwordContainer: {
  height: 60,
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  paddingHorizontal: 20,
  marginBottom: 20,
  flexDirection: 'row',
  alignItems: 'center',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 5,
  elevation: 4,
},

passwordInput: {
  flex: 1,
  fontSize: 16,
},

eyeButton: {
  padding: 5,
},
});


