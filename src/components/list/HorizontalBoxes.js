import React, {useState} from 'react'
import { View } from 'react-native'
import { CheckBox, Icon } from 'react-native-elements'
import { capitalize } from './../../model'
import { BASE_COLOR, ROLES_REGISTER } from './../../consts'

export default HorizontalBoxes = ({onChange, value}) => {
  const [selected, setSelected] = useState(value);

  const handlePress = (newSelected) => {
    setSelected(newSelected);
    onChange(newSelected);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
    <CheckBox
      title={capitalize(ROLES_REGISTER[0])}
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
      checked={selected == ROLES_REGISTER[0]}
      onPress={() => handlePress(ROLES_REGISTER[0])}
    />
    <CheckBox
      containerStyle ={{
        backgroundColor: 'transparent', 
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0
      }}
      title={capitalize(ROLES_REGISTER[1])}
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
      checked={selected == ROLES_REGISTER[1]}
      onPress={() => handlePress(ROLES_REGISTER[1])}
    />
    <CheckBox
      containerStyle ={{
        backgroundColor: 'transparent', 
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0
      }}
      title={capitalize(ROLES_REGISTER[2])}
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
      checked={selected == ROLES_REGISTER[2]}
      onPress={() => handlePress(ROLES_REGISTER[2])}
    />
    </View>
  )
}
