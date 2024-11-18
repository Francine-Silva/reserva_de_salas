import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { signOut } = useContext(AuthContext);
  const userName = route.params?.userName || 'Usuário';

  const handleLogout = () => {
    signOut();
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {userName || 'Usuário'}!</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Reservation', { reservationId: undefined })}
      >
        <Text style={styles.buttonText}>Ir para Reserva</Text>
      </TouchableOpacity>
      
  
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8fd3f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#E53935', 
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default HomeScreen;
