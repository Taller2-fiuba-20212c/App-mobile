import React, {useState} from 'react'
import { View } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
import { capitalize } from './../../model'
import { BASE_COLOR } from './../../consts'

export default HorizontalBoxes = ({onChange, value, options}) => {
  const [selected, setSelected] = useState(value);

  const handlePress = (newSelected) => {
    setSelected(newSelected);
    onChange(newSelected);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {
        options.map((option, i) => (
          <CheckBox
            key={i}
            title={capitalize(option)}
            containerStyle ={{
              backgroundColor: 'transparent', 
              borderWidth: 0,
              flex: 1,
              paddingHorizontal: 0
            }}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color={BASE_COLOR}
                size={25}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={25}
              />
            }
            checked={selected == option}
            onPress={() => handlePress(option)}
          />
        ))
      }
    </View>
  )
}
