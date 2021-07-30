import React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';

function LandingScreen() {
  const { logOut } = useAuth();

  return (
    <View style={styles.centeredView}>
      <TouchableOpacity onPress={logOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default LandingScreen;
