import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

const homeworkData = [
  {
    id: '1',
    subject: 'Mathematics',
    title: 'Complete Chapter 5 Exercise',
    dueDate: '03 Jun 2026',
    status: 'Pending',
  },
  {
    id: '2',
    subject: 'English',
    title: 'Essay Writing',
    dueDate: '02 Jun 2026',
    status: 'Completed',
  },
  {
    id: '3',
    subject: 'Science',
    title: 'Learn Human Digestive System',
    dueDate: '01 Jun 2026',
    status: 'Pending',
  },
  {
    id: '4',
    subject: 'Computer',
    title: 'MS Word Practical',
    dueDate: '31 May 2026',
    status: 'Completed',
  },
];

const HomeworkScreen = () => {
  const completedCount = homeworkData.filter(
    item => item.status === 'Completed',
  ).length;

  const pendingCount = homeworkData.filter(
    item => item.status === 'Pending',
  ).length;

  const totalCount = homeworkData.length;

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <View style={{flex: 1}}>
        <Text style={styles.subject}>
          {item.subject}
        </Text>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.date}>
          Due Date: {item.dueDate}
        </Text>
      </View>

      <View
        style={[
          styles.statusBox,
          {
            backgroundColor:
              item.status === 'Completed'
                ? '#22C55E'
                : '#F59E0B',
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

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Homework
        </Text>

        <Text style={styles.headerSubTitle}>
          Student Homework Records
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.summaryContainer}>

          <View style={styles.summaryCard}>
            <Text style={styles.count}>
              {totalCount}
            </Text>
            <Text style={styles.label}>
              Total
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.count}>
              {pendingCount}
            </Text>
            <Text style={styles.label}>
              Pending
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.count}>
              {completedCount}
            </Text>
            <Text style={styles.label}>
              Completed
            </Text>
          </View>

        </View>

        <Text style={styles.historyTitle}>
          Homework History
        </Text>

        <FlatList
          data={homeworkData}
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

export default HomeworkScreen;

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
    color: '#fff',
  },

  headerSubTitle: {
    fontSize: 15,
    color: '#E5E7EB',
    marginTop: 5,
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
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,
  },

  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  label: {
    marginTop: 5,
    color: '#6B7280',
  },

  historyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#111827',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  subject: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  title: {
    marginTop: 4,
    color: '#4B5563',
    fontSize: 14,
  },

  date: {
    marginTop: 5,
    color: '#6B7280',
    fontSize: 13,
  },

  statusBox: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
  },

  statusText: {
    color: '#fff',
    fontWeight: '700',
  },
});