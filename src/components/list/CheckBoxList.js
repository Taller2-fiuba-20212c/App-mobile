import React, {useState} from 'react'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements';

export default CheckBoxList = (props) => {
  const list = props.list;
  const initialCheckedBoxes = Array(list.length).fill(false);
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