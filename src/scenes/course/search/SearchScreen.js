import React, {useLayoutEffect, useState} from 'react';
import { View, Text, Pressable } from 'react-native'
import { CheckBox, SearchBar, Icon, BottomSheet, Divider } from 'react-native-elements'
import { BASE_COLOR } from '../../../consts';
import SearchStyles from './SearchStyles'

export default SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View style={SearchStyles.header}>
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
          onPress={() => setIsVisible(true)}
          color={BASE_COLOR}
          containerStyle={SearchStyles.optionsIcon}
        />
      ),
    });
  });

  return(
    <View>
      <BottomSheet 
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        modalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
          onRequestClose: () => {
            setIsVisible(false);
          },
        }}
      >
        <Pressable onPress={() => setIsVisible(false)}>
          <View 
            style={SearchStyles.transparentSpace}
          >
        </View>
          </Pressable>
        <View style={SearchStyles.filterBackground}>
          <View style={SearchStyles.filter}>
            <View style={SearchStyles.headerFilter}>
              <Text onPress={() => setIsVisible(false)} style={SearchStyles.text}>Cancel</Text>
              <Text style={SearchStyles.filtersText}>Filters</Text>
              <Text style={SearchStyles.text}>Apply</Text>
            </View>
            <Divider orientation="horizontal"/>
            <Text style={SearchStyles.subTitle}>Subcriptions</Text>
            <CheckBox
              title='Click Here'
              checked={false}
            />
            <Text style={SearchStyles.subTitle}>Categories</Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}