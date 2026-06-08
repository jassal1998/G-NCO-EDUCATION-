import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  NativeModules,
  ActivityIndicator,
} from 'react-native';

const {FilePicker} = NativeModules;

const ResultUploadScreen = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
    try {
      const files = await FilePicker.pickExcel();

      console.log('📄 FILES:', files);

      if (files && files.length > 0) {
        setSelectedFile(files[0]);
      }
    } catch (error) {
      console.log('❌ FILE ERROR:', error);
      Alert.alert('Error', 'Failed to select file');
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      Alert.alert(
        'Error',
        'Please select Excel file first',
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('file', {
        uri: selectedFile.uri,
        name: selectedFile.name || 'students.xlsx',
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      } as any);

      console.log('📤 UPLOADING:', selectedFile);

      const response = await fetch(
        'YOUR_API_URL_HERE',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const result = await response.json();

      console.log('✅ RESPONSE:', result);

      Alert.alert(
        'Success',
        'Excel uploaded successfully',
      );
    } catch (error) {
      console.log('❌ UPLOAD ERROR:', error);

      Alert.alert(
        'Error',
        'Failed to upload file',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Result Upload
        </Text>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePickFile}>
          <Text style={styles.uploadText}>
            Upload Excel File
          </Text>
        </TouchableOpacity>

        {selectedFile && (
          <View style={styles.fileCard}>
            <Text style={styles.fileTitle}>
              Selected File
            </Text>

            <Text style={styles.fileName}>
              {selectedFile.name}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ResultUploadScreen;

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
  },

  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  uploadButton: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  fileCard: {
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
  },

  fileTitle: {
    fontWeight: '700',
    marginBottom: 5,
  },

  fileName: {
    color: '#2563EB',
  },

  submitButton: {
    backgroundColor: 'green',
    height: 55,
    borderRadius: 12,
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