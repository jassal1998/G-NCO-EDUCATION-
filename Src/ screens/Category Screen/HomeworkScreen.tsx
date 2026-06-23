import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchStudentHomework} from '../../Redux/api/schoolApiMethods';
import { useNavigation } from '@react-navigation/native';

const HomeworkScreen = () => {
  const dispatch = useDispatch<any>();
const navigation = useNavigation<any>();
  const {homeworks, loading, error} =
    useSelector(
      (state: any) => state.school,
    );

  useEffect(() => {
    console.log(
      '🚀 HOMEWORK API CALL',
    );

    dispatch(
      fetchStudentHomework(),
    );
  }, []);

  useEffect(() => {
    console.log(
      '📚 HOMEWORK REDUX DATA =>',
      JSON.stringify(
        homeworks,
        null,
        2,
      ),
    );
  }, [homeworks]);

  const homeworkData = Array.isArray(
    homeworks,
  )
    ? homeworks
    : [];

  const completedCount =
    homeworkData.filter(
      (item: any) =>
        item.status ===
        'COMPLETED',
    ).length;

  const pendingCount =
    homeworkData.filter(
      (item: any) =>
        item.status ===
        'PENDING',
    ).length;

  const totalCount =
    homeworkData.length;

  const renderItem = ({
    item,
  }: any) => (
    <View style={styles.card}>
      <View style={{flex: 1}}>
        <Text style={styles.subject}>
          {item.subject ||
            item.subjectName}
        </Text>

        <Text style={styles.title}>
          {item.title ||
            item.homeworkTitle}
        </Text>

        <Text style={styles.date}>
          Due Date:{' '}
          {item.dueDate ||
            item.submissionDate}
        </Text>
      </View>

<View
  style={[
    styles.statusBox,
    {
      backgroundColor: '#1565C0',
    },
  ]}>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        'HomeworkDetails',
        {
          homework: item,
        },
      )
    }>
    <Text style={styles.statusText}>
      View All
    </Text>
  </TouchableOpacity>
</View>
    </View>
  );

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
          Loading Homework...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#1565C0"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text
          style={styles.headerTitle}>
          Homework
        </Text>

        <Text
          style={
            styles.headerSubTitle
          }>
          Student Homework
          Records
        </Text>
      </View>

      <View
        style={
          styles.contentContainer
        }>
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
              {totalCount}
            </Text>
            <Text
              style={styles.label}>
              Total
            </Text>
          </View>

          <View
            style={
              styles.summaryCard
            }>
            <Text
              style={styles.count}>
              {pendingCount}
            </Text>
            <Text
              style={styles.label}>
              Pending
            </Text>
          </View>

          <View
            style={
              styles.summaryCard
            }>
            <Text
              style={styles.count}>
              {completedCount}
            </Text>
            <Text
              style={styles.label}>
              Completed
            </Text>
          </View>
        </View>

        <Text
          style={
            styles.historyTitle
          }>
          Homework History
        </Text>

        {error ? (
          <Text
            style={{
              color: 'red',
              marginBottom: 10,
            }}>
            {error}
          </Text>
        ) : null}

        <FlatList
          data={homeworkData}
          keyExtractor={(
            item,
            index,
          ) =>
            index.toString()
          }
          renderItem={
            renderItem
          }
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeworkScreen;

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        '#F4F7FE',
    },

    header: {
      backgroundColor:
        '#1565C0',
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
      justifyContent:
        'space-between',
      marginBottom: 25,
    },

    summaryCard: {
      width: '31%',
      backgroundColor:
        '#fff',
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
      backgroundColor:
        '#fff',
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