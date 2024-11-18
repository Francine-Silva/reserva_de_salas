import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import api from '../../services/api';

type Room = {
  id: string;
  nome: string;
};

type RoomSelectorProps = {
  onSelectRoom: (room: Room) => void;
};

const RoomSelector: React.FC<RoomSelectorProps> = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get('/salas');
        
       
        const validRooms = response.data.filter((room: Room) => typeof room.nome === 'string');
        
        setRooms(validRooms);
      } catch (error) {
        console.error('Erro ao carregar salas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text>Selecione uma Sala:</Text>
      {rooms.map((room) => (
        <Button key={room.id} title={room.nome} onPress={() => onSelectRoom(room)} />
      ))}
    </View>
  );
};

export default RoomSelector;
