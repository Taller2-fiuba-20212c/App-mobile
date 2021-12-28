import React, { useState } from 'react';
import { Overlay, CheckBox, Button } from 'react-native-elements';
import { Text, View, TouchableNativeFeedback } from 'react-native'
import { BASE_COLOR } from '../../consts'

export default Select = ({options, value, placeholder, onChange}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value)
  const initialCheckedBoxes = value ? 
    options.map((u) => u == value) :
    Array(options.length).fill(false);
  const [checkedBoxes, setCheckedBoxes] = useState(initialCheckedBoxes);

  const updateCheckedBoxes = (n) => {
    var newCheckedBoxes = checkedBoxes.map((u,i) => i == n)
    setCheckedBoxes(newCheckedBoxes);
  }

  const select = () => {
    setSelected(options[checkedBoxes.indexOf(true)])
    onChange(options[checkedBoxes.indexOf(true)])
    setVisible(false)
  }

  return (
    <>
      <TouchableNativeFeedback onPress={() => setVisible(true)}>
        <View 
          style={{ borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
        >
          {
            selected ?
            <Text style={{ color: 'black', fontSize: 17 }}>{selected}</Text>
            :
            <Text style={{ color: 'lightgray', fontSize: 17 }}>{placeholder}</Text>
          }
        </View>
      </TouchableNativeFeedback>
      <Overlay 
        statusBarTranslucent={true} 
        isVisible={visible} 
        onBackdropPress={() => setVisible(false)}
        overlayStyle={{
          borderRadius: 20
        }}
      >
        {
          options.map((u, i) => (
            <CheckBox
              checkedColor={BASE_COLOR}
              key={i}
              title={u}
              checked={checkedBoxes[i]}
              onPress={() => updateCheckedBoxes(i)}
            />
          ))
        }
        <Button 
          title='Select' 
          buttonStyle={{ backgroundColor: BASE_COLOR, borderRadius: 20 }} 
          onPress={() => select()}
        />
      </Overlay>
    </>
  )
}
