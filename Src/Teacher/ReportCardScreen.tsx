import React, {useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';

const ReportCardScreen = () => {
  const subjects = [
    {
      id: '1',
      subject: 'English',
      maxMarks: 100,
      obtainedMarks: 85,
    },
    {
      id: '2',
      subject: 'Mathematics',
      maxMarks: 100,
      obtainedMarks: 92,
    },
    {
      id: '3',
      subject: 'Science',
      maxMarks: 100,
      obtainedMarks: 78,
    },
    {
      id: '4',
      subject: 'Punjabi',
      maxMarks: 100,
      obtainedMarks: 88,
    },
    {
      id: '5',
      subject: 'Computer',
      maxMarks: 100,
      obtainedMarks: 95,
    },
  ];

  const totalMarks = useMemo(() => {
    return subjects.reduce(
      (sum, item) => sum + item.maxMarks,
      0,
    );
  }, []);

  const obtainedTotal = useMemo(() => {
    return subjects.reduce(
      (sum, item) => sum + item.obtainedMarks,
      0,
    );
  }, []);

  const percentage = (
    (obtainedTotal / totalMarks) *
    100
  ).toFixed(2);

  const grade = () => {
    const per = Number(percentage);

    if (per >= 90) return 'A+';
    if (per >= 80) return 'A';
    if (per >= 70) return 'B+';
    if (per >= 60) return 'B';
    if (per >= 50) return 'C';
    if (per >= 40) return 'D';

    return 'Fail';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#2563EB"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Student Report Card
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}>

        <View style={styles.studentCard}>
          <Text style={styles.studentText}>
            Student Name : Rahul Sharma
          </Text>

          <Text style={styles.studentText}>
            Class : 10
          </Text>

          <Text style={styles.studentText}>
            Section : A
          </Text>

          <Text style={styles.studentText}>
            Exam : Final Exam
          </Text>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.heading}>
            Subject
          </Text>

          <Text style={styles.heading}>
            Max
          </Text>

          <Text style={styles.heading}>
            Marks
          </Text>
        </View>

        <FlatList
          scrollEnabled={false}
          data={subjects}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={styles.subject}>
                {item.subject}
              </Text>

              <Text style={styles.mark}>
                {item.maxMarks}
              </Text>

              <Text style={styles.mark}>
                {item.obtainedMarks}
              </Text>
            </View>
          )}
        />

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>
            Final Summary
          </Text>

          <Text style={styles.summaryText}>
            Total Marks : {obtainedTotal}/
            {totalMarks}
          </Text>

          <Text style={styles.summaryText}>
            Percentage : {percentage}%
          </Text>

          <Text style={styles.summaryText}>
            Grade : {grade()}
          </Text>

          <Text style={styles.summaryText}>
            Status :{' '}
            {grade() === 'Fail'
              ? 'Fail'
              : 'Pass'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            Alert.alert(
              'PDF',
              'Generate PDF Here',
            )
          }>
          <Text style={styles.buttonText}>
            Download PDF
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
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
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },

  content: {
    padding: 15,
    paddingBottom: 40,
  },

  studentCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  studentText: {
    fontSize: 15,
    marginBottom: 5,
    color: '#333',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  heading: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  subject: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },

  mark: {
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },

  summaryCard: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 15,
    padding: 15,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 10,
  },

  summaryText: {
    fontSize: 15,
    marginBottom: 6,
  },

  button: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});