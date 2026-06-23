import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import { fetchMonthlyAttendance } from '../../Redux/api/schoolApiMethods';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const AttendanceScreen = () => {
  const dispatch = useDispatch<any>();
const navigation = useNavigation<any>();
  const [selectedDate, setSelectedDate] =
    useState('');

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] =
    useState(currentDate.getMonth() + 1);

  const [currentYear, setCurrentYear] =
    useState(currentDate.getFullYear());

  const {
    monthlyAttendance,
    loading,
    error,
  } = useSelector(
    (state: any) => state.school,
  );

  useEffect(() => {
    console.log(
      '🚀 INITIAL ATTENDANCE API CALL',
    );

    dispatch(
      fetchMonthlyAttendance({
        month: currentMonth,
        year: currentYear,
      }),
    );
  }, []);

  useEffect(() => {
    console.log(
      '📅 REDUX ATTENDANCE DATA =>',
      JSON.stringify(
        monthlyAttendance,
        null,
        2,
      ),
    );
  }, [monthlyAttendance]);
  console.log(
  '📅 MONTHLY ATTENDANCE =>',
  monthlyAttendance,
);

console.log(
  '📅 TYPE =>',
  typeof monthlyAttendance,
);

console.log(
  '📅 IS ARRAY =>',
  Array.isArray(monthlyAttendance),
);

const attendanceData =
  monthlyAttendance?.attendance || [];

const presentCount =
  monthlyAttendance?.totalPresent || 0;

const absentCount =
  monthlyAttendance?.totalAbsent || 0;

const holidayCount =
  monthlyAttendance?.totalHoliday || 0;

const totalDays =
  presentCount +
  absentCount +
  holidayCount;

const percentage =
  totalDays > 0
    ? (
        (presentCount / totalDays) *
        100
      ).toFixed(0)
    : '0';

const markedDates = useMemo(() => {
  const marks: any = {};

  attendanceData.forEach((item: any) => {
    let color = '#FFFFFF';

    switch (item.status) {
      case 'PRESENT':
        color = '#22C55E';
        break;

      case 'ABSENT':
        color = '#EF4444';
        break;

      case 'HOLIDAY':
        color = '#BDBDBD';
        break;

      case 'NOT_MARKED':
        color = '#FFFFFF';
        break;

      default:
        color = '#FFFFFF';
    }

    marks[item.date] = {
      selected: true,
      selectedColor: color,
      selectedTextColor:
        item.status === 'NOT_MARKED'
          ? '#111827'
          : '#FFFFFF',
    };
  });

  return marks;
}, [attendanceData]);

 const renderItem = ({item}: any) => {
  let bgColor = '#E5E7EB';
  let textColor = '#111827';

  if (item.status === 'PRESENT') {
    bgColor = '#22C55E';
    textColor = '#FFFFFF';
  } else if (item.status === 'ABSENT') {
    bgColor = '#EF4444';
    textColor = '#FFFFFF';
  } else if (item.status === 'HOLIDAY') {
    bgColor = '#9CA3AF';
    textColor = '#FFFFFF';
  }

  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.date}>
          {item.date}
        </Text>

        <Text style={styles.dayText}>
          Attendance Record
        </Text>
      </View>

      <View
        style={[
          styles.statusBox,
          {
            backgroundColor: bgColor,
          },
        ]}>
        <Text
          style={[
            styles.statusText,
            {
              color: textColor,
            },
          ]}>
          {item.status}
        </Text>
      </View>
    </View>
  );
};


  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent:
            'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text
          style={{
            marginTop: 10,
          }}>
          Loading Attendance...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#2563EB"
        barStyle="light-content"
      />
<View style={styles.header}>
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}>
    <Icon
      name="arrow-back"
      size={26}
      color="#FFFFFF"
    />
  </TouchableOpacity>

  <Text style={styles.headerTitle}>
    Attendance
  </Text>

  <Text style={styles.headerSubTitle}>
    Student Attendance History
  </Text>
</View>

     <ScrollView
  style={styles.contentContainer}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingBottom: 120,
  }}>
        <View
          style={
            styles.summaryContainer
          }>
          <View
            style={
              styles.summaryCard
            }>
            <Text
              style={styles.count}>
              {presentCount}
            </Text>

            <Text
              style={styles.label}>
              Present
            </Text>
          </View>

          <View
            style={
              styles.summaryCard
            }>
            <Text
              style={styles.count}>
              {absentCount}
            </Text>

            <Text
              style={styles.label}>
              Absent
            </Text>
          </View>

          <View
            style={
              styles.summaryCard
            }>
            <Text
              style={styles.count}>
              {percentage}%
            </Text>

            <Text
              style={styles.label}>
              Attendance
            </Text>
          </View>
        </View>

        <View
          style={styles.monthBox}>
          <Text
            style={
              styles.monthText
            }>
            Month: {currentMonth}
          </Text>

          <Text
            style={
              styles.monthText
            }>
            Year: {currentYear}
          </Text>
        </View>

        <Calendar
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            marginBottom: 20,
          }}
          current={`${currentYear}-${String(
            currentMonth,
          ).padStart(
            2,
            '0',
          )}-01`}
          markedDates={
            markedDates
          }
          onDayPress={day => {
            console.log(
              '📆 SELECTED DATE =>',
              day.dateString,
            );

            setSelectedDate(
              day.dateString,
            );
          }}
          onMonthChange={month => {
            console.log(
              '📡 ATTENDANCE API CALL =>',
              month.month,
              month.year,
            );

            setCurrentMonth(
              month.month,
            );

            setCurrentYear(
              month.year,
            );

            dispatch(
              fetchMonthlyAttendance(
                {
                  month:
                    month.month,
                  year:
                    month.year,
                },
              ),
            );
          }}
        />

       
</ScrollView>
    </SafeAreaView>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FE',
  },

header: {
  backgroundColor: '#4A90E2',
  paddingTop: 50,
  paddingBottom: 90,
  paddingHorizontal: 20,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
},

headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
},

headerTitle: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginLeft:  40,
   
},

headerSubTitle: {
  fontSize: 15,
  color: '#E5E7EB',
  marginTop: 6,
  marginLeft: 40,
},

  contentContainer: {
    flex: 1,
    marginTop: -50,
    paddingHorizontal: 20,
  },

summaryContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 20,
},

summaryCard: {
  width: '48%',
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  paddingVertical: 18,
  alignItems: 'center',
  marginBottom: 10,
  elevation: 4,
},

  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  label: {
    marginTop: 6,
    fontSize: 13,
    color: '#6B7280',
  },

  historyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  date: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  dayText: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 13,
  },

  statusBox: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  statusText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  monthBox: {
  backgroundColor: '#FFFFFF',
  borderRadius: 18,
  paddingVertical: 15,
  paddingHorizontal: 20,
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 4,
},

monthText: {
  fontSize: 16,
  fontWeight: '700',
  color: '#2563EB',
},
backButton: {
  position: 'absolute',
  top: 50,
  left: 20,
  zIndex: 10,
  padding: 5,
},
});