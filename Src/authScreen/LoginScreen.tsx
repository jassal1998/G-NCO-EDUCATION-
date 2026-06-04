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
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    navigation.replace('TeacherTabs');
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
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
          />

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}>
            <Text style={styles.loginText}>
              Login
            </Text>
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
});