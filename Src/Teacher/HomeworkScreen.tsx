import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const HomeworkScreenTeacher = () => {
  const [subject, setSubject] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [homework, setHomework] = useState('');

  const subjects = [
    {label: 'English', value: 'English'},
    {label: 'Mathematics', value: 'Mathematics'},
    {label: 'Science', value: 'Science'},
    {label: 'Computer', value: 'Computer'},
    {label: 'Punjabi', value: 'Punjabi'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Social Studies', value: 'Social Studies'},
  ];

  const handleSubmit = () => {
    if (
      !subject ||
      !studentName ||
      !rollNumber ||
      !className ||
      !homework
    ) {
      Alert.alert('Please fill all required fields');
      return;
    }

    Alert.alert('Success', 'Homework Uploaded Successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Homework Upload</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 15}}>

        {/* Subject */}
        <Text style={styles.label}>Select Subject</Text>

        <Dropdown
          style={styles.dropdown}
          data={subjects}
          labelField="label"
          valueField="value"
          placeholder="Choose Subject"
          value={subject}
          onChange={item => setSubject(item.value)}
        />

        {/* Student Name */}
        <Text style={styles.label}>Student Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Student Name"
          value={studentName}
          onChangeText={setStudentName}
        />

        {/* Roll Number */}
        <Text style={styles.label}>Roll Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Roll Number"
          keyboardType="numeric"
          value={rollNumber}
          onChangeText={setRollNumber}
        />

        {/* Class */}
        <Text style={styles.label}>Class</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Class"
          value={className}
          onChangeText={setClassName}
        />

        {/* Section */}
        <Text style={styles.label}>Section</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Section"
          value={section}
          onChangeText={setSection}
        />

        {/* Homework */}
        <Text style={styles.label}>Homework Details</Text>

        <TextInput
          style={styles.homeworkInput}
          placeholder="Enter Homework Details"
          multiline
          value={homework}
          onChangeText={setHomework}
        />

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>
            Upload Homework
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeworkScreenTeacher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#2563EB',
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,

    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,

    elevation: 8,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
  },

  dropdown: {
    height: 55,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },

  homeworkInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 15,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },

  submitButton: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },

  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});