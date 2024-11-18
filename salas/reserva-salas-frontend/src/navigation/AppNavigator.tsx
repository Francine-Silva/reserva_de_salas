import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ReservationsListScreen from '../screens/ReservationsListScreen';
import RegisterScreen from '../screens/RegisterScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: { userName: string };
  Reservation: { reservationId?: string };
  ReservationsList: undefined;
  Register: undefined; 
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login', headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home', headerShown: false }} 
        />
        <Stack.Screen 
          name="Reservation" 
          component={ReservationScreen} 
          options={{ title: 'Nova Reserva' }} 
        />
        <Stack.Screen 
          name="ReservationsList" 
          component={ReservationsListScreen} 
          options={{ title: 'Lista de Reservas' }} 
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Cadastre-se' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
