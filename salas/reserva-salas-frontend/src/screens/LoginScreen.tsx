import React from 'react';
import { View, StyleSheet } from 'react-native';
import Login from '../components/Auth/Login';

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
});

export default LoginScreen;
