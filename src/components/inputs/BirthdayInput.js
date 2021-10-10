import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as constants from  './../../Constants'

export default BirthdayInput = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [dateSelected, setDateSelected] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let newDateSelected = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    setDateSelected(newDateSelected);
    props.onChangeText(newDateSelected)
  };

  const showDatepicker = () => {
    setShow(true)
  };

  return (
    <>
      <TouchableOpacity onPress={showDatepicker}>
        <Input
          placeholder='Birthday'
          value={dateSelected}
          disabled={true}
          leftIcon={
            <Icon
              name='cake'
              size={24}
              color={constants.BASE_COLOR}
            />
          }
        />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  )
}