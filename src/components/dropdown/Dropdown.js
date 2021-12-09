import React, { useState, useEffect } from 'react';
import { BASE_COLOR, CATEGORIES_TYPES } from './../../consts'
import SelectBox from 'react-native-multi-selectbox'

export default Dropdown = (props) => {
  return (
    <SelectBox
      {...props}
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
      arrowIconColor={BASE_COLOR}
      searchIconColor={BASE_COLOR}
      toggleIconColor={BASE_COLOR}
    />
  )
}