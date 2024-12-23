import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to User Vault</Text>
      <Text style={styles.subtitle}>Securely store and manage your data</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('HomeScreen')}
        color="#6200ee"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: '#6200ee',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
});
