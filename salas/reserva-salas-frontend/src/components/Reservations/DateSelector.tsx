import React from 'react';
import { View, Text, Button } from 'react-native';

type DateSelectorProps = {
  onSelectDate: (date: Date) => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({ onSelectDate }) => {
  return (
    <View>
      <Text>Selecione uma Data:</Text>    
      <Button title="Selecionar Data" onPress={() => onSelectDate(new Date())} />
    </View>
  );
};

export default DateSelector;
