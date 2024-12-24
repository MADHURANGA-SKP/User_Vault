import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Logo from '../components/Logo';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Logo/>
      <Text style={styles.title}>Welcome to User Vault</Text>
      <Text style={styles.subtitle}>Securely store and manage your data</Text>
      <View style={styles.btnwrap}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => navigation.navigate('HomeScreen')}
          >
          <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2B2C4E',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  Button: {
    backgroundColor: "#2B2C4E",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    alignItems: "center",
  },
});
