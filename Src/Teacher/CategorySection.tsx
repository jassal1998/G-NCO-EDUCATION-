import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const categories = [
  {
    title: 'School Details',
    icon: 'school',
    screen: 'SchoolDetails',
  },
  {
    title: 'Fees',
    icon: 'cash',
    screen: 'FeesDetailsScreen',
  },
  {
    title: 'Attendance',
    icon: 'calendar-check',
    screen: 'AttendanceScreen',
  },
  {
    title: 'Homework',
    icon: 'book-open-page-variant',
    screen: 'HomeworkScreen',
  },
  {
    title: 'Complaints',
    icon: 'message-alert',
    screen: 'ComplaintScreen',
  },
  {
    title: 'Timetable',
    icon: 'clock-outline',
    screen: 'TimetableScreen',
  },
  {
    title: 'Results',
    icon: 'trophy-outline',
    screen: 'ResultScreen',
  },
  {
    title: 'Notices',
    icon: 'bell-outline',
    screen: 'NoticeScreen',
  },
];

const CategorySection = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#2563EB"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>

        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome Parent 👋
          </Text>

          <Text style={styles.headerTitle}>
            School Services
          </Text>
        </View>

        {/* Categories */}

        <Text style={styles.heading}>
          Categories
        </Text>

        <View style={styles.grid}>
          {categories.map((item, index) => (
         <TouchableOpacity
  key={index}
  activeOpacity={0.8}
  style={styles.card}
  onPress={() => {
    if (item.title === 'School Details') {
      navigation.navigate('SchoolDetails');
    } else if (item.title === 'Fees') {
      navigation.navigate('FeesScreen');
    } else if (item.title === 'Attendance') {
      navigation.navigate('ReportCardScreen');
    } else if (item.title === 'Homework') {
      navigation.navigate('HomeworkScreenTeacher');
    } else if (item.title === 'Complaints') {
      navigation.navigate('ComplaintScreen');
    } else if (item.title === 'Timetable') {
      navigation.navigate('TimetableScreen');
    } else if (item.title === 'Results') {
      navigation.navigate('ResultUploadScreen');
    } else if (item.title === 'Notices') {
      navigation.navigate('NoticeScreen');
    }
  }}>
  
  <Text style={styles.cardTitle}>
    {item.title}
  </Text>

</TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },

header: {
  backgroundColor: '#2563EB',
  paddingHorizontal: 20,
  paddingBottom: 25,
  paddingTop: "16%", // 25 ton ghatt kar ditta
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
},

  welcomeText: {
    color: '#DCE7FF',
    fontSize: 15,
    fontWeight: '500',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,

    elevation: 5,
  },

  cardTitle: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
});