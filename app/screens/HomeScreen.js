import React from "react";
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity } from "react-native";
import { useUser } from "../context/AppContext";

export default function HomeScreen({ navigation }) {
  const { user } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileSection}>
        {user.profilePicture ? (
          <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.userName}>{user.name || "Name not set"}</Text>
        <Text style={styles.userDetails}>Age: {user.age || "N/A"}</Text>
        <Text style={styles.userDetails}>Address: {user.address || "N/A"}</Text>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Family Details:</Text>
        {user.familyDetails.length > 0 ? (
          user.familyDetails.map((detail, index) => (
            <Text key={index} style={styles.detailText}>
              - {detail}
            </Text>
          ))
        ) : (
          <Text style={styles.detailText}>No family details available.</Text>
        )}

        <Text style={styles.sectionTitle}>Education Details:</Text>
        {user.educationDetails.length > 0 ? (
          user.educationDetails.map((detail, index) => (
            <Text key={index} style={styles.detailText}>
              - {detail}
            </Text>
          ))
        ) : (
          <Text style={styles.detailText}>No education details available.</Text>
        )}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationSection}>
        <View style={styles.btnwrap}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('EditUserScreen')}
          >
          <Text style={styles.buttonText}>Create User Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnwrap}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('UserDetailScreen')}
          >
          <Text style={styles.buttonText}>View User Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  placeholderText: {
    color: "#2B2C4E",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B2C4E",
  },
  userDetails: {
    fontSize: 16,
    color: "#555",
  },
  detailsSection: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2B2C4E",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  navigationSection: {
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  Button: {
    marginTop: 10,
    backgroundColor: "#2B2C4E",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
  },
});
