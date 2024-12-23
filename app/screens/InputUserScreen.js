import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // For profile picture selection
import { useUser } from "../context/AppContext";

export default function InputUserScreen({ navigation }) {
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    profilePicture: null,
    familyDetails: "", // Store as string, to be split later
    educationDetails: "", // Store as string, to be split later
  });

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
      updateUser({
        name: formData.name,
        age: formData.age,
        address: formData.address,
        profilePicture: formData.profilePicture,
        familyDetails: formData.familyDetails
          .split(",")
          .map(familyMember => ({
            name: familyMember.trim(),
            relation: "Example Relation",
          })),
        educationDetails: formData.educationDetails
          .split(",")
          .map(education => ({
            institution: education.trim(),
            degree: "Example Degree",
          })),
      });
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

      {/* Name */}
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
      <TextInput
        style={styles.input}
        value={formData.familyDetails}
        placeholder="Enter family details (comma separated)"
        onChangeText={(text) => setFormData({ ...formData, familyDetails: text })}
      />

      {/* Education Details */}
      <Text style={styles.label}>Education Details:</Text>
      <TextInput
        style={styles.input}
        value={formData.educationDetails}
        placeholder="Enter education details (comma separated)"
        onChangeText={(text) => setFormData({ ...formData, educationDetails: text })}
      />

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
      </View>

      {/* Render Family Details */}
      {formData.familyDetails ? (
        formData.familyDetails.split(",").map((family, index) => (
          <View key={index}>
            <Text>{family.trim()} - Example Relation</Text>
          </View>
        ))
      ) : (
        <Text>No family details provided.</Text>
      )}

      {/* Render Education Details */}
      {formData.educationDetails ? (
        formData.educationDetails.split(",").map((education, index) => (
          <View key={index}>
            <Text>{education.trim()} - Example Degree</Text>
          </View>
        ))
      ) : (
        <Text>No education details provided.</Text>
      )}
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
  buttonContainer: {
    marginTop: 20,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
