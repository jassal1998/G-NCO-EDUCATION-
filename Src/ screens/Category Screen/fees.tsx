import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const FeesDetailsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#4A90E2"
        barStyle="light-content"
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.headerCard}>
          <Text style={styles.studentName}>Risham Singh</Text>
          <Text style={styles.classText}>Class: 10th A</Text>
          <Text style={styles.rollText}>Roll No: 25</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.label}>Total Fees</Text>
            <Text style={styles.amount}>₹50,000</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.label}>Paid</Text>
            <Text style={[styles.amount, {color: 'green'}]}>
              ₹35,000
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.label}>Pending</Text>
            <Text style={[styles.amount, {color: 'red'}]}>
              ₹15,000
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Fee History</Text>

        <View style={styles.feeCard}>
          <View style={styles.row}>
            <Text style={styles.month}>January 2026</Text>
            <Text style={styles.statusPaid}>Paid</Text>
          </View>

          <Text style={styles.date}>
            Paid On: 05 Jan 2026
          </Text>

          <Text style={styles.feeAmount}>₹5,000</Text>
        </View>

        <View style={styles.feeCard}>
          <View style={styles.row}>
            <Text style={styles.month}>February 2026</Text>
            <Text style={styles.statusPaid}>Paid</Text>
          </View>

          <Text style={styles.date}>
            Paid On: 07 Feb 2026
          </Text>

          <Text style={styles.feeAmount}>₹5,000</Text>
        </View>

        <View style={styles.feeCard}>
          <View style={styles.row}>
            <Text style={styles.month}>March 2026</Text>
            <Text style={styles.statusPending}>Pending</Text>
          </View>

          <Text style={styles.date}>
            Due Date: 10 Mar 2026
          </Text>

          <Text style={styles.feeAmount}>₹5,000</Text>
        </View>

        <View style={styles.feeCard}>
          <View style={styles.row}>
            <Text style={styles.month}>April 2026</Text>
            <Text style={styles.statusPending}>Pending</Text>
          </View>

          <Text style={styles.date}>
            Due Date: 10 Apr 2026
          </Text>

          <Text style={styles.feeAmount}>₹5,000</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FeesDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },

  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  headerCard: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingBottom: 35,
    paddingTop: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  studentName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  classText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 12,
  },

  rollText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },

  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: -35,
  },

  summaryCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 5,
  },

  label: {
    fontSize: 14,
    color: '#666',
  },

  amount: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 15,
  },

  feeCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 18,
    padding: 18,
    elevation: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  month: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },

  statusPaid: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold',
  },

  statusPending: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },

  date: {
    marginTop: 12,
    fontSize: 15,
    color: '#666',
  },

  feeAmount: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
});