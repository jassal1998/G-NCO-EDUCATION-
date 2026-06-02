import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const SchoolDetails = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b',
        }}
        style={styles.schoolImage}
      />

      <View style={styles.card}>
        <Text style={styles.schoolName}>
     School
        </Text>

        <Text style={styles.description}>
          A leading educational institution committed to
          excellence in academics, sports, and personality
          development.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.heading}>School Information</Text>

        <Text style={styles.info}>📍 Address: Model Town, Punjab</Text>
        <Text style={styles.info}>👨‍🏫 Principal: Mr. Sharma</Text>
        <Text style={styles.info}>🎓 Students: 2500+</Text>
        <Text style={styles.info}>👩‍🏫 Teachers: 120+</Text>
        <Text style={styles.info}>🏆 Rating: 4.8/5</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.heading}>Facilities</Text>

        <Text style={styles.info}>📚 Digital Library</Text>
        <Text style={styles.info}>🖥 Computer Labs</Text>
        <Text style={styles.info}>⚽ Sports Ground</Text>
        <Text style={styles.info}>🚌 Transport Facility</Text>
        <Text style={styles.info}>🔬 Science Labs</Text>
      </View>
    </ScrollView>
  );
};

export default SchoolDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
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
});