import React, {useState} from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements';
import {BASE_COLOR} from './../../consts'

export default CheckBoxList = (props) => {
  const list = props.list;
  const initialCheckedBoxes = props.checks ? 
    list.map((u) => props.checks.includes(u)) :
    Array(list.length).fill(false);
  const [checkedBoxes, setCheckedBoxes] = useState(initialCheckedBoxes);

  const updateCheckedBoxes = (n) => {
    var newCheckedBoxes = checkedBoxes.slice()
    newCheckedBoxes[n] = !newCheckedBoxes[n]
    setCheckedBoxes(newCheckedBoxes);
    props.onChangeChecks(
      list.filter((u, i) => newCheckedBoxes[i])
    )
  }

  return (
    <View>
      {
        list.map((u, i) => (
          <CheckBox
            checkedColor={BASE_COLOR}
            key={i}
            title={u}
            checked={checkedBoxes[i]}
            onPress={() => updateCheckedBoxes(i)}
          />
        ))
      }
    </View>
  )
}