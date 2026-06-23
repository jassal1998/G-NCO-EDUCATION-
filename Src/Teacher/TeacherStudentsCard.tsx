import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchStudentsAttendance } from '../Redux/api/teacherApiMethods';


const TeacherStudentsCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

 const {attendance, loading} = useSelector(
  (state: any) => state.teacher,
);
console.log("sax",attendance)
  useEffect(() => {
    dispatch(fetchStudentsAttendance());
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  const handleStudentPress = (student: any) => {
    navigation.navigate('CategoryTeacher', {
      student,
    });
  };

  const onDateChange = (event: any, date?: Date) => {
    setShowPicker(false);

    if (date) {
      setSelectedDate(date);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Students</Text>

      <FlatList
        data={attendance}
        keyExtractor={(item: any, index) =>
          item?.id?.toString() || index.toString()
        }
        showsVerticalScrollIndicator={false}
renderItem={({item}: any) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() =>
      navigation.navigate('CategoryTeacher', {
        studentId: item.studentId,
        student: item,
      })
    }
    style={styles.card}>
    
    <Text style={styles.name}>
      {item.firstName} {item.lastName}
    </Text>

    <Text style={styles.classText}>
      Class: {item.className}
    </Text>

    <Text style={styles.classText}>
      Section: {item.sectionName}
    </Text>

    <Text style={styles.classText}>
      Roll No: {item.rollNo}
    </Text>

  </TouchableOpacity>
)}
      />

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="calendar"
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
};

export default TeacherStudentsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 15,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    elevation: 4,
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  classText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 5,
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  dateBtn: {
    backgroundColor: '#EEF4FF',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
  },

  dateText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },

  presentBtn: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
  },

  absentBtn: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  btnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});