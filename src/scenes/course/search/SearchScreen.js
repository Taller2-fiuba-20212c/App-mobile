import React, {useLayoutEffect, useState} from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native'
import { SearchBar, Icon, BottomSheet, Divider } from 'react-native-elements'
import { CheckBoxList } from './../../../components'
import { BASE_COLOR } from '../../../consts';
import SearchStyles from './SearchStyles'

const subType = ['Subs 1', 'Subs 2', 'Subs 3', 'Subs 4'];
const catType = ['categorie 1', 'categorie 2', 'categorie 3', 'categorie 4', 'categorie 5', 'categorie 6'];

export default SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [applyColor, setApplyColor] = useState('gray');

  const initialFilters = {
    subsTypes: [],
    catTypes: [],
  }
  const [filters, setFilters] = useState(initialFilters);

  const initialCheckedBoxes = {
    subsTypes: [],
    catTypes: [],
  }
  const [checkedBoxes, setCheckedBoxes] = useState(initialCheckedBoxes);
  
  const handleChangeChecks = (checks, name) => {
    const newCheckedBoxes = { ...checkedBoxes, [name]: checks};
    setCheckedBoxes(newCheckedBoxes);
    (newCheckedBoxes.subsTypes.length == 0 && newCheckedBoxes.catTypes.length == 0) 
      ? setApplyColor('gray') 
      : setApplyColor('black');

    console.log(newCheckedBoxes)
  };

  const apply = () => { 
    setCheckedBoxes(initialCheckedBoxes)
    setFilters(checkedBoxes) 
    setIsVisible(false)
    console.log(checkedBoxes)
  }

  const cancel = () => {
    setCheckedBoxes(initialCheckedBoxes)
    setIsVisible(false)
  }

  const open = () => {
    setApplyColor('gray')
    setIsVisible(true)
  }

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
          onPress={() => open()}
          color={BASE_COLOR}
          containerStyle={SearchStyles.optionsIcon}
        />
      ),
    });
  });

  return(
    <View>
      <BottomSheet 
        onBackButtonPress={() => cancel()}
        modalProps={{
          visible: isVisible, 
          animationType: 'slide',
          statusBarTranslucent: true,
          hardwareAccelerated: true,
          onRequestClose: () => {
            cancel();
          },
        }}
      >
        <Pressable onPress={() => cancel()}>
          <View style={SearchStyles.transparentSpace}>
        </View>
          </Pressable>
        <View style={SearchStyles.filterBackground}>
          <View style={SearchStyles.filter}>
            <View style={SearchStyles.headerFilter}>
              <Text 
                onPress={() => cancel()} 
                style={SearchStyles.text}
              >Cancel</Text>
              <Text style={SearchStyles.filtersText}>Filters</Text>
              <Text 
                disabled={applyColor == 'gray'}
                onPress={() => apply()}
                style={{
                  ...SearchStyles.apply, 'color': applyColor
                }}
              >Apply</Text>
            </View>
            <Divider orientation="horizontal"/>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={SearchStyles.subTitle}>Subcriptions</Text>
              <CheckBoxList 
                onChangeChecks={(checks) => handleChangeChecks(checks, 'subsTypes')}
                list={subType} 
              />
              <Text style={SearchStyles.subTitle}>Categories</Text>
              <CheckBoxList 
                onChangeChecks={(checks) => handleChangeChecks(checks, 'catTypes')}
                list={catType} 
              />
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}