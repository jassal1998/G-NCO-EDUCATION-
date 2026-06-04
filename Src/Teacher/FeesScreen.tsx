import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const FeeUploadScreen = () => {
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [totalFee, setTotalFee] = useState('');
  const [paidFee, setPaidFee] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleUpload = () => {
    const payload = {
      student_name: studentName,
      class_name: className,
      total_fee: totalFee,
      paid_fee: paidFee,
      due_date: dueDate,
    };

    console.log(payload);

    Alert.alert(
      'Success',
      'Fee details uploaded successfully',
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Upload Student Fee
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Student Name"
          value={studentName}
          onChangeText={setStudentName}
          style={styles.input}
        />

        <TextInput
          placeholder="Class"
          value={className}
          onChangeText={setClassName}
          style={styles.input}
        />

        <TextInput
          placeholder="Total Fee"
          value={totalFee}
          onChangeText={setTotalFee}
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          placeholder="Paid Fee"
          value={paidFee}
          onChangeText={setPaidFee}
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          placeholder="Due Date (DD/MM/YYYY)"
          value={dueDate}
          onChangeText={setDueDate}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpload}>
          <Text style={styles.buttonText}>
            Upload Fee
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FeeUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },

header: {
  backgroundColor: '#2563EB',
  paddingTop: 60,
  paddingBottom: 25,
  paddingHorizontal: 20,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 8,
},
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },

  form: {
    padding: 20,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    elevation: 2,
  },

  button: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});