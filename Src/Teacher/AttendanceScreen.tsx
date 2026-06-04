import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';

const AttendanceScreenTeacher = () => {
  const [students, setStudents] = useState([
    {id: '1', name: 'Rahul Sharma', checked: true},
    {id: '2', name: 'Priya Singh', checked: true},
    {id: '3', name: 'Aman Verma', checked: true},
    {id: '4', name: 'Neha Gupta', checked: true},
    {id: '5', name: 'Rohit Kumar', checked: true},
    {id: '6', name: 'Simran Kaur', checked: true},
    {id: '7', name: 'Arjun Singh', checked: true},
    {id: '8', name: 'Pooja Verma', checked: true},
  ]);

  const toggleStudent = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? {...student, checked: !student.checked}
          : student,
      ),
    );
  };

  const markAllPresent = () => {
    setStudents(prev =>
      prev.map(student => ({
        ...student,
        checked: true,
      })),
    );
  };

  const markAllAbsent = () => {
    setStudents(prev =>
      prev.map(student => ({
        ...student,
        checked: false,
      })),
    );
  };

  const saveAttendance = () => {
    const presentStudents = students.filter(
      item => item.checked,
    );

    const absentStudents = students.filter(
      item => !item.checked,
    );

    Alert.alert(
      'Attendance Saved',
      `Present: ${presentStudents.length}\nAbsent: ${absentStudents.length}`,
    );

    console.log('Present Students:', presentStudents);
    console.log('Absent Students:', absentStudents);
  };

  const renderStudent = ({item}: any) => (
    <View style={styles.studentCard}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.checked && styles.checkedBox,
        ]}
        onPress={() => toggleStudent(item.id)}>
        {item.checked && (
          <Text style={styles.checkMark}>✓</Text>
        )}
      </TouchableOpacity>

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>
          {item.name}
        </Text>

        <Text
          style={[
            styles.statusText,
            {
              color: item.checked
                ? '#16A34A'
                : '#DC2626',
            },
          ]}>
          {item.checked ? 'Present' : 'Absent'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#2563EB"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Student Attendance
        </Text>
      </View>

      {/* Student List */}
      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={renderStudent}
        contentContainerStyle={{
          padding: 15,
        }}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.presentButton,
          ]}
          onPress={markAllPresent}>
          <Text style={styles.buttonText}>
            Present All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.absentButton,
          ]}
          onPress={markAllAbsent}>
          <Text style={styles.buttonText}>
            Absent All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveAttendance}>
          <Text style={styles.buttonText}>
            Save Attendance
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AttendanceScreenTeacher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },

  header: {
    backgroundColor: '#2563EB',
    paddingTop: 55,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 15,
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkedBox: {
    backgroundColor: '#2563EB',
  },

  checkMark: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  studentInfo: {
    flex: 1,
    marginLeft: 15,
  },

  studentName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  statusText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },

  bottomContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 10,
  },

  actionButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  presentButton: {
    backgroundColor: '#22C55E',
  },

  absentButton: {
    backgroundColor: '#EF4444',
  },

  saveButton: {
    backgroundColor: '#2563EB',
    height: 58,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },
});