import React, {useLayoutEffect, useState} from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native'
import { SearchBar, Icon, BottomSheet, Divider } from 'react-native-elements'
import { CheckBoxList } from './../../../components'
import { BASE_COLOR } from '../../../consts';
import SearchStyles from './SearchStyles'

const subType = ['Subs 1', 'Subs 2', 'Subs 3', 'Subs 4'];
const catType = ['categorie 1', 'categorie 2', 'categorie 3', 'categorie 4', 'categorie 5'];

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
        onBackButtonPress={() => setIsVisible(false)}
        modalProps={{
          visible: isVisible, 
          animationType: 'slide',
          statusBarTranslucent: true,
          hardwareAccelerated: true,
          onRequestClose: () => {
            setIsVisible(false);
          },
        }}
      >
        <Pressable onPress={() => setIsVisible(false)}>
          <View style={SearchStyles.transparentSpace}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={SearchStyles.subTitle}>Subcriptions</Text>
              <CheckBoxList list={subType} />
              <Text style={SearchStyles.subTitle}>Categories</Text>
              <CheckBoxList list={catType} />
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}