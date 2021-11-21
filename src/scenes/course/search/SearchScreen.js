import React, {useLayoutEffect, useState} from 'react';
import { View, Text } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'
import { WIDTH_SCREEN, BASE_COLOR } from '../../../consts';

export default SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View style={{width: WIDTH_SCREEN * 0.8}}>
          <SearchBar
            containerStyle={{
              backgroundColor: 'white',
              borderWidth: 0, //no effect
              shadowColor: 'white', //no effect
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent'
            }}
            inputContainerStyle={{
              height:40
            }}
            showLoading={true}
            round={true}
            lightTheme={true}
            placeholder="search"
            onChangeText={setSearchText}
            value={searchText}
          />
        </View>
      ),
      headerRight: () => (
        <Icon 
          name='options'
          size={24}
          type='ionicon'
          color={BASE_COLOR}
          containerStyle={{
            paddingRight: 20
          }}
        />
      ),
    });
  });

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
      
    </View>
  )
}