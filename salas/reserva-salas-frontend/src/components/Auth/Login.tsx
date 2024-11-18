import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Animated, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn, isSignedIn } = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleLogin = async () => {
    try {
      const response = await api.post('/usuario_sessions', { usuario: { email, password } });
  
      console.log('Resposta da API:', response.data); 
  
      
      if (response.status === 200 && response.data?.usuario?.nome) {
        const { nome } = response.data.usuario; 
  
        signIn(nome); 
        navigation.navigate('Home', { userName: nome }); 
      } else {
        Alert.alert('Erro de Login', 'Email ou senha incorretos. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro de Login', 'Erro na comunicação com o servidor. Tente novamente.');
      console.error('Erro ao autenticar:', error);
    }
  };
  

  const handleRegisterNavigation = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    if (isSignedIn) {
      navigation.navigate('Home', { userName: email });
    }
  }, [isSignedIn, navigation, email]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.systemName, { opacity: fadeAnim }]}>
        Reserva de Salas
      </Animated.Text>
      <Image 
        source={require('../../../assets/logo.png')} 
        style={styles.logo} 
      />
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleRegisterNavigation} style={styles.registerLink}>
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
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
  logo: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    marginBottom: 10,
  },
  systemName: {
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
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
  registerLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#333',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default Login;
