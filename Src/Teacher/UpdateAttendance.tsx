import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAttendanceList} from '../Redux/api/teacherApiMethods';

const UpdateAttendance = () => {
  const dispatch = useDispatch<any>();

  const {
    attendanceList,
    loading,
  } = useSelector(
    (state: any) => state.teacher,
  );

  useEffect(() => {
    dispatch(fetchAttendanceList());
  }, []);

  console.log(
    '📚 ATTENDANCE LIST =>',
    attendanceList,
  );
  const [selectedStudents, setSelectedStudents] =
  useState<number[]>([]);

const toggleStudent = (id: number) => {
  setSelectedStudents(prev =>
    prev.includes(id)
      ? prev.filter(item => item !== id)
      : [...prev, id],
  );
};

const renderItem = ({item}: any) => {
  const isSelected =
    selectedStudents.includes(item.id);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        
        {/* Checkbox Sirf ABSENT Lai */}
        {item.status === 'ABSENT' && (
          <TouchableOpacity
            style={[
              styles.checkbox,
              isSelected &&
                styles.checkedBox,
            ]}
            onPress={() =>
              toggleStudent(item.id)
            }>
            {isSelected && (
              <Text style={styles.checkMark}>
                ✓
              </Text>
            )}
          </TouchableOpacity>
        )}

        <View style={{flex: 1}}>
          <Text style={styles.name}>
            Student Enroll ID:
            {' '}
            {item.studentEnrollId}
          </Text>

          <Text style={styles.details}>
            Attendance Date:
            {' '}
            {item.attendanceDate}
          </Text>

          <Text style={styles.details}>
            Teacher ID:
            {' '}
            {item.teacherId}
          </Text>

          <Text style={styles.details}>
            School ID:
            {' '}
            {item.schoolId}
          </Text>

          <Text
            style={[
              styles.status,
              {
                color:
                  item.status ===
                  'PRESENT'
                    ? '#16A34A'
                    : '#DC2626',
              },
            ]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Attendance List
        </Text>
      </View>

      <FlatList
        data={attendanceList}
        keyExtractor={(item, index) =>
          index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 15,
        }}
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 30,
            }}>
            No Attendance Found
          </Text>
        )}
      />

      <View style={styles.bottomContainer}>
      <TouchableOpacity
  style={styles.updateButton}
  onPress={() => {
    const absentStudents =
      attendanceList.filter((item: { id: number; }) =>
        selectedStudents.includes(
          item.id,
        ),
      );

    console.log(
      '✅ ABSENT STUDENTS SELECTED =>',
      absentStudents,
    );

    // API Call Here
  }}>
  <Text style={styles.buttonText}>
    Update Attendance
  </Text>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateAttendance;

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
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  details: {
    marginTop: 4,
    color: '#6B7280',
  },

  status: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
  },

  bottomContainer: {
    padding: 15,
    backgroundColor: '#FFF',
  },

  updateButton: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
  flexDirection: 'row',
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
  marginRight: 15,
},

checkedBox: {
  backgroundColor: '#2563EB',
},

checkMark: {
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
},
});