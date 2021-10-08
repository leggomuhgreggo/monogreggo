// @generated: @expo/next-adapter@3.1.2
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Provider as BumbagNativeProvider } from 'bumbag-native';

export default function App() {
  return (
    <BumbagNativeProvider>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
      </View>
    </BumbagNativeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
