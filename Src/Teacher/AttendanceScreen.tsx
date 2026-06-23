import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchStudentsAttendance, submitAttendance } from '../Redux/api/teacherApiMethods';
import { useNavigation } from '@react-navigation/native';


const AttendanceScreenTeacher = () => {
  const dispatch = useDispatch<any>();
const navigation = useNavigation<any>()
  const {attendance, loading} = useSelector(
    (state: any) => state.teacher,
  );

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchStudentsAttendance());
  }, []);

useEffect(() => {
  if (attendance?.length > 0) {
    const formattedData = attendance.map(
      (item: any) => ({
        id: item.studentId.toString(),
        studentId: item.studentId,
        enrollId: item.enrollId, // IMPORTANT
        name: `${item.firstName} ${item.lastName}`,
        className: item.className,
        sectionName: item.sectionName,
        rollNo: item.rollNo,
        checked: true,
      }),
    );

    setStudents(formattedData);

    console.log(
      '✅ FORMATTED STUDENTS =>',
      formattedData,
    );
  }
}, [attendance]);




  const toggleStudent = (id: string) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id
          ? {
              ...student,
              checked: !student.checked,
            }
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

const saveAttendance = async () => {
  try {
    const payload = students.map(
      (student: any) => ({
        studentEnrollId: student.enrollId,
        status: student.checked
          ? 'PRESENT'
          : 'ABSENT',
      }),
    );

    console.log(
      '📤 ATTENDANCE PAYLOAD =>',
      JSON.stringify(payload, null, 2),
    );

    await dispatch(
      submitAttendance(payload),
    ).unwrap();

    console.log(
      '✅ ATTENDANCE SUBMITTED SUCCESSFULLY',
    );

    Alert.alert(
      'Success',
      'Attendance Submitted Successfully',
    );
  } catch (error) {
    console.log(
      '❌ SUBMIT ERROR =>',
      error,
    );

    Alert.alert(
      'Error',
      'Failed To Submit Attendance',
    );
  }
};

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  const renderStudent = ({item}: any) => (
    <View style={styles.studentCard}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.checked &&
            styles.checkedBox,
        ]}
        onPress={() =>
          toggleStudent(item.id)
        }>
        {item.checked && (
          <Text style={styles.checkMark}>
            ✓
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.studentInfo}>
        <Text style={styles.studentName}>
          {item.name}
        </Text>

        <Text style={styles.details}>
          Class: {item.className}
        </Text>

        <Text style={styles.details}>
          Section: {item.sectionName}
        </Text>

        <Text style={styles.details}>
          Roll No: {item.rollNo}
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
          {item.checked
            ? 'Present'
            : 'Absent'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#2563EB"
        barStyle="light-content"
      />

      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>
          Student Attendance
        </Text>
      

      </View>
<View style={styles.topButtonContainer}>
  <TouchableOpacity
    style={styles.viewAttendanceBtn}
    onPress={() =>
      navigation.navigate('UpdateAttendance')
    }
    >
    <Text style={styles.viewAttendanceText}>
      View Attendance
    </Text>
  </TouchableOpacity>
</View>
      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={renderStudent}
        contentContainerStyle={{
          padding: 15,
        }}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.presentButton,
          ]}
      onPress={saveAttendance}>
          <Text style={styles.buttonText}>
            Present All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.absentButton,
          ]}
       onPress={saveAttendance}>
          <Text style={styles.buttonText}>
            Absent All
          </Text>
        </TouchableOpacity>
{/* 
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveAttendance}>
          <Text style={styles.buttonText}>
            Save Attendance
          </Text>
        </TouchableOpacity> */}
        <View style={styles.bottomContainer}>



</View>
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

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#2563EB',
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  studentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 3,
    alignItems: 'center',
  },

  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#2563EB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkedBox: {
    backgroundColor: '#2563EB',
  },

  checkMark: {
    color: '#fff',
    fontWeight: 'bold',
  },

  studentInfo: {
    marginLeft: 15,
    flex: 1,
  },

  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  details: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  statusText: {
    marginTop: 5,
    fontWeight: '700',
  },

  bottomContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },

  actionButton: {
    height: 50,
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
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  viewButton: {
  backgroundColor: '#7C3AED',
  height: 55,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
},
// viewAttendanceBtn: {
//   position: 'absolute',
//   right: 15,
//   top: 50,
//   backgroundColor: '#FFFFFF',
//   paddingHorizontal: 12,
//   paddingVertical: 6,
//   borderRadius: 20,
//   zIndex: 999,
// },


topButtonContainer: {
  alignItems: 'flex-end',
  paddingHorizontal: 15,
  marginTop: 15,
},

viewAttendanceBtn: {
  backgroundColor: '#2563EB',
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 10,
},

viewAttendanceText: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '700',
},
});