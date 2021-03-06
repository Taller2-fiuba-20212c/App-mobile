import React, { useState } from 'react';
import { Overlay, CheckBox, Button } from 'react-native-elements';
import { Text, View, TouchableNativeFeedback } from 'react-native'
import { BASE_COLOR } from '../../consts'

export default MultiSelect = ({options, value, placeholder, onChange}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(value)
  const initialCheckedBoxes = value ? 
    options.map((u) => value.includes(u)) :
    Array(options.length).fill(false);
  const [checkedBoxes, setCheckedBoxes] = useState(initialCheckedBoxes);

  const updateCheckedBoxes = (n) => {
    var newCheckedBoxes = checkedBoxes.slice()
    newCheckedBoxes[n] = !newCheckedBoxes[n]
    setCheckedBoxes(newCheckedBoxes);
  }

  const select = () => {
    setSelected(options.filter((o,i) => checkedBoxes[i]))
    onChange(options.filter((o,i) => checkedBoxes[i]))
    setVisible(false)
  }

  return (
    <>
      <TouchableNativeFeedback onPress={() => setVisible(true)}>
        <View 
          style={{ borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}
        >
          {
            selected.length != 0 ?
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
              {
                selected.slice().map((s, i) => (
                  <View key={i} style={{
                    backgroundColor: BASE_COLOR,
                    borderRadius: 20,
                    marginHorizontal: 5,
                    marginVertical: 2
                  }}>
                    <Text style={{color: 'white', margin: 10}}>{s}</Text>
                  </View>
                ))
              }
            </View>
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
