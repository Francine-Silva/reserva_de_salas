import React from 'react';
import { View, Text, Button } from 'react-native';
import { format } from 'date-fns';

type Room = {
  id: string;
  nome: string;
};

type ReservationSummaryProps = {
  date: Date | null;
  room: Room | null; 
  time: string | null;
  onConfirm: () => void;
};

const ReservationSummary: React.FC<ReservationSummaryProps> = ({ date, room, time, onConfirm }) => {
  
  const displayDate = date ? date.toLocaleDateString('pt-BR') : 'Nenhuma Data Selecionada';

  return (
    <View>
      <Text>Data: {displayDate}</Text>
      <Text>Sala: {room ? room.nome : 'Nenhuma Sala Selecionada'}</Text>
      <Text>Horário: {time || 'Nenhum Horário Selecionado'}</Text>
      <Button title="Confirmar Reserva" onPress={onConfirm} />
    </View>
  );
};


export default ReservationSummary;
