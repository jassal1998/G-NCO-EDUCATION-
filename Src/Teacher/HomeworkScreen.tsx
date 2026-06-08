import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  StatusBar,
  TextInput,
  Image,
  PermissionsAndroid,
  Platform,
  NativeModules,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const {FilePicker} = NativeModules;

type FileItem = {
  id: string;
  name: string;
  uri: string;
  type: 'image' | 'file';
  size?: number;
};

const HomeworkScreenTeacher = () => {
  const [subject, setSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [student, setStudent] = useState('');
  const [homework, setHomework] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<FileItem[]>([]);

  const subjects = [
    {label: 'English', value: 'English'},
    {label: 'Mathematics', value: 'Mathematics'},
    {label: 'Science', value: 'Science'},
    {label: 'Computer', value: 'Computer'},
    {label: 'Punjabi', value: 'Punjabi'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'French', value: 'French'},
    {label: 'Social Studies', value: 'Social Studies'},
  ];

  const classes = [
    {label: 'Class 1', value: '1'},
    {label: 'Class 2', value: '2'},
    {label: 'Class 3', value: '3'},
    {label: 'Class 4', value: '4'},
    {label: 'Class 5', value: '5'},
    {label: 'Class 6', value: '6'},
    {label: 'Class 7', value: '7'},
    {label: 'Class 8', value: '8'},
    {label: 'Class 9', value: '9'},
    {label: 'Class 10', value: '10'},
  ];

  const sections = [
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
  ];

  const students = [
    {
      label: 'Rahul Sharma',
      value: 'Rahul Sharma',
      class: '10',
      section: 'A',
      subjects: ['English', 'Mathematics', 'Punjabi'],
    },
    {
      label: 'Priya Singh',
      value: 'Priya Singh',
      class: '10',
      section: 'A',
      subjects: ['English', 'Science', 'Hindi'],
    },
    {
      label: 'Aman Kumar',
      value: 'Aman Kumar',
      class: '9',
      section: 'B',
      subjects: ['French', 'English'],
    },
    {
      label: 'Simran Kaur',
      value: 'Simran Kaur',
      class: '8',
      section: 'A',
      subjects: ['Punjabi', 'Hindi'],
    },
    {
      label: 'Gurpreet Singh',
      value: 'Gurpreet Singh',
      class: '7',
      section: 'C',
      subjects: ['Computer', 'Mathematics'],
    },
  ];

  const optionalSubjects = ['French'];

  const filteredStudents = students.filter(item => {
    const subjectMatch = optionalSubjects.includes(subject)
      ? item.subjects.includes(subject)
      : true;
    const classMatch = selectedClass ? item.class === selectedClass : true;
    const sectionMatch = section ? item.section === section : true;
    return subjectMatch && classMatch && sectionMatch;
  });

  // ─── Camera Permission ────────────────────────────────────────
  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };

  // ─── Camera ───────────────────────────────────────────────────
  const handleOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera permission is required.');
      return;
    }
    launchCamera({mediaType: 'photo', quality: 0.8}, response => {
      if (response.didCancel || response.errorCode) return;
      const asset = response.assets?.[0];
      if (!asset?.uri) return;
      setAttachedFiles(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name: asset.fileName || `photo_${Date.now()}.jpg`,
          uri: asset.uri as string,
          type: 'image',
          size: asset.fileSize,
        },
      ]);
    });
  };

  // ─── Gallery ──────────────────────────────────────────────────
  const handleOpenGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.8, selectionLimit: 5},
      response => {
        if (response.didCancel || response.errorCode) return;
        const newFiles: FileItem[] = (response.assets || [])
          .filter(asset => asset.uri)
          .map(asset => ({
            id: Date.now().toString() + Math.random(),
            name: asset.fileName || `image_${Date.now()}.jpg`,
            uri: asset.uri as string,
            type: 'image',
            size: asset.fileSize,
          }));
        setAttachedFiles(prev => [...prev, ...newFiles]);
      },
    );
  };

  // ─── PDF Picker — Kotlin Native Bridge ───────────────────────
  const handlePickPdf = async () => {
    if (!FilePicker) {
      Alert.alert('Error', 'FilePicker module not found. Check native setup.');
      return;
    }
    try {
      const files: {uri: string; name: string}[] =
        await FilePicker.pickPdf();

      if (!files || files.length === 0) return;

      const newFiles: FileItem[] = files.map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name || 'document.pdf',
        uri: file.uri,
        type: 'file',
      }));

      setAttachedFiles(prev => [...prev, ...newFiles]);
    } catch (err: any) {
      if (err?.code === 'CANCEL') return;
      Alert.alert('Error', 'Could not pick PDF. Try again.');
    }
  };

  // ─── Attach Options ───────────────────────────────────────────
  const handleAttachPress = () => {
    Alert.alert('Add Attachment', 'Choose an option', [
      {text: '📷  Camera', onPress: handleOpenCamera},
      {text: '🖼️  Gallery', onPress: handleOpenGallery},
      {text: '📄  PDF / File', onPress: handlePickPdf},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  // ─── Remove File ──────────────────────────────────────────────
  const handleRemoveFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  };

  // ─── Format Size ──────────────────────────────────────────────
  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  // ─── Submit ───────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!subject || !student || !homework) {
      Alert.alert(
        'Error',
        'Please select Subject, Student and enter Homework',
      );
      return;
    }
    Alert.alert(
      'Success',
      `Homework Uploaded Successfully\n\nStudent: ${student}\nSubject: ${subject}\nClass: ${selectedClass || 'All'}\nSection: ${section || 'All'}\nHomework: ${homework}\nAttachments: ${attachedFiles.length}`,
    );
    setSubject('');
    setSelectedClass('');
    setSection('');
    setStudent('');
    setHomework('');
    setAttachedFiles([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Homework Upload</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* Subject */}
        <Text style={styles.label}>Select Subject *</Text>
        <Dropdown
          style={styles.dropdown}
          data={subjects}
          labelField="label"
          valueField="value"
          placeholder="Choose Subject"
          value={subject}
          onChange={item => {
            setSubject(item.value);
            setStudent('');
          }}
        />

        {/* Class */}
        <Text style={styles.label}>Select Class (Optional)</Text>
        <Dropdown
          style={styles.dropdown}
          data={classes}
          labelField="label"
          valueField="value"
          placeholder="Choose Class"
          value={selectedClass}
          onChange={item => {
            setSelectedClass(item.value);
            setStudent('');
          }}
        />

        {/* Section */}
        <Text style={styles.label}>Select Section (Optional)</Text>
        <Dropdown
          style={styles.dropdown}
          data={sections}
          labelField="label"
          valueField="value"
          placeholder="Choose Section"
          value={section}
          onChange={item => {
            setSection(item.value);
            setStudent('');
          }}
        />

        {/* Student */}
        <Text style={styles.label}>Select Student *</Text>
        <Dropdown
          style={styles.dropdown}
          data={filteredStudents}
          labelField="label"
          valueField="value"
          placeholder="Choose Student"
          value={student}
          onChange={item => setStudent(item.value)}
        />

        {/* Homework */}
        <Text style={styles.label}>Homework Details *</Text>
        <TextInput
          style={styles.homeworkInput}
          placeholder="Enter Homework Details"
          multiline
          value={homework}
          onChangeText={setHomework}
        />

        {/* Attach Button */}
        <Text style={styles.label}>Attachments (Optional)</Text>
        <TouchableOpacity
          style={styles.attachButton}
          onPress={handleAttachPress}>
          <Text style={styles.attachIcon}>📎</Text>
          <Text style={styles.attachText}>Add Photo / PDF / File</Text>
        </TouchableOpacity>

        {/* Files List */}
        {attachedFiles.length > 0 && (
          <View style={styles.filesContainer}>
            {attachedFiles.map(file => (
              <View key={file.id} style={styles.fileCard}>

                {file.type === 'image' ? (
                  <Image
                    source={{uri: file.uri}}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.iconBox}>
                    <Text style={styles.iconText}>📄</Text>
                  </View>
                )}

                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {file.name}
                  </Text>
                  <Text style={styles.fileType}>
                    {file.type === 'image' ? 'Image' : 'PDF Document'}
                    {file.size ? ` • ${formatSize(file.size)}` : ''}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => handleRemoveFile(file.id)}>
                  <Text style={styles.removeBtnText}>✕</Text>
                </TouchableOpacity>

              </View>
            ))}
          </View>
        )}

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>Upload Homework</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeworkScreenTeacher;

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
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  content: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 15,
    marginBottom: 8,
  },
  dropdown: {
    height: 55,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  homeworkInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    minHeight: 120,
    padding: 15,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2563EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#EFF6FF',
    gap: 10,
  },
  attachIcon: {
    fontSize: 22,
  },
  attachText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
  },
  filesContainer: {
    marginTop: 12,
    gap: 10,
  },
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 26,
  },
  fileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  fileType: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeBtnText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});