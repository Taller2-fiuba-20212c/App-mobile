import React, { useState, useEffect } from 'react';
import { BASE_COLOR, CATEGORIES_TYPES } from './../../consts'
import SelectBox from 'react-native-multi-selectbox'
import DropdownStyles from './DropdownStyles'

const categories = CATEGORIES_TYPES.map((c) => {
  return {
    item: c,
    id: c.toUpperCase()
  }
})

export default Dropdown = (props) => {
  const [selectedTeams, setSelectedTeams] = useState([])

  const xorBy = (l1, l2) => {
    return l1.filter(x => !l2.includes(x)).concat(l2.filter(x => !l1.includes(x)));
  }

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item]))
  }

  useEffect(() => {
    props.onChange(selectedTeams)
  }, [selectedTeams])

  return (
    <SelectBox
      label={props.label}
      options={categories}
      hideInputFilter={true}
      labelStyle={{
        fontSize: 16,
        fontWeight: 'bold',
      }}
      multiOptionContainerStyle={{
        backgroundColor: BASE_COLOR,
      }}
      multiOptionsLabelStyle={{
        fontSize: 16,
      }}
      inputFilterStyle={{
        fontSize: 16,
      }}
      multiListEmptyLabelStyle={{
        fontSize: 18,
        fontWeight: 'bold',
      }}
      selectedValues={selectedTeams}
      onMultiSelect={onMultiChange()}
      onTapClose={onMultiChange()}
      arrowIconColor={BASE_COLOR}
      searchIconColor={BASE_COLOR}
      toggleIconColor={BASE_COLOR}
      isMulti
    />
  )
}