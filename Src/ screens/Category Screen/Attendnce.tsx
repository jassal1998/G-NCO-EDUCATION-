import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const attendanceData = [
  {
    id: '1',
    date: '02 Jun 2026',
    status: 'Present',
  },
  {
    id: '2',
    date: '01 Jun 2026',
    status: 'Absent',
  },
  {
    id: '3',
    date: '31 May 2026',
    status: 'Present',
  },
  {
    id: '4',
    date: '30 May 2026',
    status: 'Present',
  },
  {
    id: '5',
    date: '29 May 2026',
    status: 'Absent',
  },
];

const AttendanceScreen = () => {
  const presentCount = attendanceData.filter(
    item => item.status === 'Present',
  ).length;

  const absentCount = attendanceData.filter(
    item => item.status === 'Absent',
  ).length;

  const percentage = (
    (presentCount / attendanceData.length) *
    100
  ).toFixed(0);

  const renderItem = ({item}: any) => (
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
            backgroundColor:
              item.status === 'Present'
                ? '#22C55E'
                : '#EF4444',
          },
        ]}>
        <Text style={styles.statusText}>
          {item.status}
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
          Attendance
        </Text>

        <Text style={styles.headerSubTitle}>
          Student Attendance History
        </Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>

        {/* Summary Cards */}

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.count}>
              {presentCount}
            </Text>

            <Text style={styles.label}>
              Present
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.count}>
              {absentCount}
            </Text>

            <Text style={styles.label}>
              Absent
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.count}>
              {percentage}%
            </Text>

            <Text style={styles.label}>
              Attendance
            </Text>
          </View>
        </View>

        <Text style={styles.historyTitle}>
          Attendance History
        </Text>

        <FlatList
          data={attendanceData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
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

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  headerSubTitle: {
    fontSize: 15,
    color: '#E5E7EB',
    marginTop: 6,
  },

  contentContainer: {
    flex: 1,
    marginTop: -50,
    paddingHorizontal: 20,
  },

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  summaryCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 5,
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
});