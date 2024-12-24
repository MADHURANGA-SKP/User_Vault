import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // For profile picture selection
import { useUser } from "../context/AppContext";

export default function EditUserScreen({ navigation }) {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState(user);
  const [newFamilyDetail, setNewFamilyDetail] = useState("");
  const [newEducationDetail, setNewEducationDetail] = useState("");

  // Profile picture picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["image"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profilePicture: result.assets[0].uri });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      updateUser(formData);
      navigation.navigate("HomeScreen");
    }
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim() || !/^[a-zA-Z\s]+$/.test(formData.name)) {
      Alert.alert("Validation Error", "Name must only contain letters.");
      return false;
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 1 || formData.age > 120) {
      Alert.alert("Validation Error", "Age must be a number between 1 and 120.");
      return false;
    }
    if (!formData.address || formData.address.length < 10) {
      Alert.alert("Validation Error", "Address must be at least 10 characters.");
      return false;
    }
    return true;
  };

  // Handle family detail addition
  const handleAddFamilyDetail = () => {
    if (newFamilyDetail.trim()) {
      setFormData((prev) => ({
        ...prev,
        familyDetails: [...prev.familyDetails, newFamilyDetail.trim()],
      }));
      setNewFamilyDetail("");
    }
  };

  // Handle education detail addition
  const handleAddEducationDetail = () => {
    if (newEducationDetail.trim()) {
      setFormData((prev) => ({
        ...prev,
        educationDetails: [...prev.educationDetails, newEducationDetail.trim()],
      }));
      setNewEducationDetail("");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.BackButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Home</Text>
      </View>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        placeholder="Enter your name"
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      {/* Age */}
      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={formData.age}
        placeholder="Enter your age"
        onChangeText={(text) => setFormData({ ...formData, age: text })}
      />

      {/* Address */}
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={formData.address}
        placeholder="Enter your address"
        multiline={true}
        onChangeText={(text) => setFormData({ ...formData, address: text })}
      />

      {/* Profile Picture */}
      <Text style={styles.label}>Profile Picture:</Text>
      {formData.profilePicture ? (
        <Image source={{ uri: formData.profilePicture }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No profile picture selected.</Text>
      )}
      <Button title="Select Profile Picture" onPress={pickImage} />

      {/* Family Details */}
      <Text style={styles.label}>Family Details:</Text>
      <FlatList
        data={formData.familyDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={newFamilyDetail}
          placeholder="Add Family Detail"
          onChangeText={setNewFamilyDetail}
        />
        <Button title="Add" onPress={handleAddFamilyDetail} />
      </View>

      {/* Education Details */}
      <Text style={styles.label}>Education Details:</Text>
      <FlatList
        data={formData.educationDetails}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.listItem}>- {item}</Text>}
      />
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={newEducationDetail}
          placeholder="Add Education Detail"
          onChangeText={setNewEducationDetail}
        />
        <Button title="Add" onPress={handleAddEducationDetail} />
      </View>

      {/* Update Button */}
      <Button title="Update" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
    alignSelf: "center",
  },
  placeholder: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItem: {
    fontSize: 14,
    marginVertical: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10, 
  },
  BackButton: {
    backgroundColor: '#9A82F6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
});
