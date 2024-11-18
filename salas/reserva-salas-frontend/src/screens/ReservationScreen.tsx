import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Calendar } from 'react-native-calendars';

import TimeSelector from '../components/Reservations/TimeSelector';
import RoomSelector from '../components/Reservations/RoomSelector';
import ReservationSummary from '../components/Reservations/ReservationSummary';
import { createReservation } from '../services/reservationService'; 

type Room = {
  id: string;
  nome: string;
};

const ReservationScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Reservation'>>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); 
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleConfirm = async () => {
    if (selectedDate && selectedTime && selectedRoom) {
      const reservaData = {
        reserva: {
          sala_id: selectedRoom.id,
          data: selectedDate.toISOString().split('T')[0], 
          hora: selectedTime
        }
      };
  
      try {
        const result = await createReservation(reservaData.reserva);
        console.log("Reserva confirmada com sucesso:", result);
      } catch (error: any) { 
        console.error("Erro ao criar a reserva:", error.message);
      }
    } else {
      console.warn("Selecione a data, o horário e a sala antes de confirmar.");
    }

    navigation.navigate('ReservationsList');
  };

  const onDayPress = (day: { dateString: string }) => {
   
    const [year, month, dayOfMonth] = day.dateString.split('-');
    const selectedDate = new Date(Number(year), Number(month) - 1, Number(dayOfMonth));
  
   
    setSelectedDate(selectedDate);
  };
  
  
  
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Faça sua Reserva</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escolha a Data</Text>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
           
            [selectedDate ? selectedDate.toISOString().split('T')[0] : '']: {
              selected: true,
              marked: true,
              selectedColor: '#4CAF50'
            },
          }}
          theme={{
            selectedDayBackgroundColor: '#4CAF50',
            todayTextColor: '#4CAF50',
            arrowColor: '#4CAF50',
            monthTextColor: '#4CAF50',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
          }}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escolha o Horário</Text>
        <TimeSelector onSelectTime={(time: string) => setSelectedTime(time)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Escolha a Sala</Text>
        <RoomSelector onSelectRoom={(room: Room) => setSelectedRoom(room)} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resumo da Reserva</Text>
        <ReservationSummary 
          date={selectedDate} 
          time={selectedTime} 
          room={selectedRoom}
          onConfirm={handleConfirm}  
        />
      </View>

      <Button 
        title="Confirmar Reserva" 
        onPress={handleConfirm}
        color="#2E7D32" 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#8fd3f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#004d40',
  },
  section: {
    marginBottom: 15,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#004d40',
  },
});

export default ReservationScreen;
