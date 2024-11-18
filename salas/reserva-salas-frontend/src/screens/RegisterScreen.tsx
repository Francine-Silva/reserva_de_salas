import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { registerUser } from '../services/userService'; 

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const [nome, setNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    try {
      await registerUser({ nome, email, password });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login'); 
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro de Cadastro', error.message);
      } else {
        Alert.alert('Erro de Cadastro', 'Ocorreu um erro desconhecido.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#8fd3f4',
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RegisterScreen;