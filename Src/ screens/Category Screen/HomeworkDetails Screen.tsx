import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NativeModules} from 'react-native';
import {
  launchImageLibrary,
} from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { submitHomework } from '../../Redux/api/schoolApiMethods';
import Toast from 'react-native-toast-message';
const HomeworkDetails = ({
  route,
}: any) => {


  const {FilePicker} = NativeModules;
  const {homework} = route.params;
  console.log("sdsad",homework)
  const [selectedPdf, setSelectedPdf] =
  useState<any>(null);
const dispatch = useDispatch<any>();
const [selectedImage, setSelectedImage] =
  useState<any>(null);
console.log('📚 HOMEWORK =>', homework);
console.log('📚 isPhysical =>', homework?.isPhysical);
console.log('📚 TYPE =>', typeof homework?.isPhysical);



const pickImage = async () => {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    quality: 1,
  });

  if (
    !result.didCancel &&
    result.assets?.length
  ) {
    setSelectedImage(result.assets[0]);
    setSelectedPdf(null);
  }
};
 const handleUpload = () => {
  Alert.alert(
    'Upload Homework',
    'Choose file type',
    [
      {
        text: 'PDF',
        onPress: pickPdf,
      },
      {
        text: 'Image',
        onPress: pickImage,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ],
  );
};

const pickPdf = async () => {
  try {
    const file = await FilePicker.pickPdf();

    setSelectedPdf(file);
    setSelectedImage(null);
  } catch (error) {
    console.log(error);
  }
};

const submitHomeworkHandler = async () => {
  const file = selectedImage || selectedPdf;

  if (!file) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please select a file first',
      position:"bottom"
    });
    return;
  }

  const payload = {
    homeworkId: homework.id.toString(),
    description: 'Completed all questions',
    file,
  };

  console.log(
    '📤 SUBMIT HOMEWORK PAYLOAD =>',
    JSON.stringify(payload, null, 2),
  );

  try {
    const result = await dispatch(
      submitHomework(payload),
    ).unwrap();

    console.log(
      '✅ SUBMIT SUCCESS =>',
      result,
    );

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2:
        result?.message ||
        'Homework submitted successfully',
        position:"bottom"
    });

    // Optional: clear selected file
    setSelectedImage(null);
    setSelectedPdf(null);

  } catch (error: any) {
    console.log(
      '❌ SUBMIT ERROR =>',
      error,
    );

    Toast.show({
      type: 'error',
      text1: 'Submission Failed',
      text2:
        typeof error === 'string'
          ? error
          : error?.message ||
            'Failed to submit homework',
            position:"bottom"
    });
  }
};
  

  return (
    <SafeAreaView
      style={styles.container}>
      <StatusBar
        backgroundColor="#1565C0"
        barStyle="light-content"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Homework Details
        </Text>
      </View>

      <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.label}>
            Subject
          </Text>

          <Text style={styles.value}>
            {homework.subjectName}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Title
          </Text>

          <Text style={styles.value}>
            {homework.title}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Description
          </Text>

          <Text style={styles.value}>
            {homework.description}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Due Date
          </Text>

          <Text style={styles.value}>
            {homework.dueDate}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Status
          </Text>

          <Text style={styles.value}>
            {homework.homeWorkStatus}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Class
          </Text>

          <Text style={styles.value}>
            {homework.className}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            Section
          </Text>

          <Text style={styles.value}>
            {homework.sectionName}
          </Text>
        </View>

       {(
  homework.isPhysical === false ||
  homework.isPhysical === 'false'
) && (
  <TouchableOpacity
    style={styles.uploadButton}
    onPress={handleUpload}>
    <Text style={styles.uploadText}>
      Upload Homework
    </Text>
  </TouchableOpacity>

)}
{selectedPdf && (
  <View style={styles.fileCard}>
    <Text style={styles.fileTitle}>
      📄 Selected PDF
    </Text>

    <Text style={styles.fileName}>
      {selectedPdf?.name}
    </Text>
  </View>
)}

{selectedImage && (
  <View style={styles.fileCard}>
    <Text style={styles.fileTitle}>
      🖼 Selected Image
    </Text>

    <Text style={styles.fileName}>
      {selectedImage?.fileName ||
        'Image Selected'}
    </Text>
  </View>
)}
{(selectedPdf || selectedImage) && (
  <TouchableOpacity
    style={styles.submitButton}
       onPress={submitHomeworkHandler}>
    <Text style={styles.submitText}>
      Submit Homework
    </Text>
  </TouchableOpacity>
)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeworkDetails;

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
      paddingBottom: 30,
      paddingHorizontal: 20,
    },

    headerTitle: {
      color: '#fff',
      fontSize: 28,
      fontWeight: 'bold',
    },

    card: {
      backgroundColor:
        '#fff',
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      elevation: 3,
    },

    label: {
      fontSize: 13,
      color: '#6B7280',
      marginBottom: 5,
    },

    value: {
      fontSize: 17,
      color: '#111827',
      fontWeight: '600',
    },

    uploadButton: {
      backgroundColor:
        '#1565C0',
      height: 55,
      borderRadius: 15,
      justifyContent:
        'center',
      alignItems: 'center',
      marginTop: 20,
    },

    uploadText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    scrollContent: {
  padding: 20,
  paddingBottom: 120,
  flexGrow: 1,
},
fileCard: {
  backgroundColor: '#fff',
  borderRadius: 15,
  padding: 15,
  marginTop: 15,
  elevation: 3,
},

fileTitle: {
  fontSize: 14,
  fontWeight: '700',
  color: '#1565C0',
  marginBottom: 5,
},

fileName: {
  fontSize: 15,
  color: '#111827',
},
submitButton: {
  backgroundColor: '#22C55E',
  height: 55,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
},

submitText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '700',
},
  });