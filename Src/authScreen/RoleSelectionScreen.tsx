import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const RoleSelectionScreen = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F5F8FF"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          School Management
        </Text>

        <Text style={styles.subtitle}>
          Select Login Type
        </Text>

        <TouchableOpacity
          style={styles.teacherButton}
          onPress={() =>
            navigation.navigate('LoginScreen', {
              role: 'Teacher',
            })
          }>
          <Text style={styles.buttonText}>
            Teacher Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.parentButton}
          onPress={() =>
            navigation.navigate('LoginScreen', {
              role: 'Parent',
            })
          }>
          <Text style={styles.buttonText}>
            Parent Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RoleSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
    marginBottom: 15,
  },

  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 50,
  },

  teacherButton: {
    height: 60,
    backgroundColor: '#2563EB',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  parentButton: {
    height: 60,
    backgroundColor: '#10B981',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});