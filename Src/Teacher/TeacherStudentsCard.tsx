import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const students = [
  {
    id: '1',
    name: 'Rahul Sharma',
    class: '10-A',
  },
  {
    id: '2',
    name: 'Priya Singh',
    class: '10-A',
  },
  {
    id: '3',
    name: 'Aman Kumar',
    class: '10-B',
  },
  {
    id: '4',
    name: 'Neha Verma',
    class: '10-B',
  },
  {
    id: '5',
    name: 'Arjun Patel',
    class: '10-C',
  },
];

const TeacherStudentsCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
const navigation = useNavigation<any>();
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Students</Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => handleStudentPress(item)}
    style={styles.card}>

    <Text style={styles.name}>{item.name}</Text>

    <Text style={styles.classText}>
      Class: {item.class}
    </Text>

    <View style={styles.actionRow}>
      <TouchableOpacity
        style={styles.dateBtn}
        onPress={() => setShowPicker(true)}>
        <Text style={styles.dateText}>
          📅 {formatDate(selectedDate)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.presentBtn}
        onPress={() => {
          console.log('Present', item.id);
        }}>
        <Text style={styles.btnText}>Present</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.absentBtn}
        onPress={() => {
          console.log('Absent', item.id);
        }}>
        <Text style={styles.btnText}>Absent</Text>
      </TouchableOpacity>
    </View>

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