import React, {useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native'
import { SearchBar, Icon, BottomSheet, Divider, Slider } from 'react-native-elements'
import { CheckBoxList } from './../../../components'
import { BASE_COLOR } from '../../../consts';
import SearchStyles from './SearchStyles'

const subType = ['Bronze', 'Silver', 'Gold', 'Diamond'];
const catType = ['Programming', 'Business', 'Design', 'Music', 'Photography & Video', 'Health & Fitness'];

export default SearchScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [applyEnable, setApplyEnable] = useState(false);

  const initialFilters = {
    subType: subType[0],
    catTypes: [],
  }
  const [filters, setFilters] = useState(initialFilters);

  const initialValuesSelected = {
    subType: subType[0],
    catTypes: [],
  }
  const [valuesSelected, setValuesSelected] = useState(initialValuesSelected);

  const compareArrays = (array1, array2) => {
    const array2Sorted = array2.slice().sort();
    return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
      return value === array2Sorted[index];
    });
  };

  const updateApply = (state1, state2) => {
    (state1.subType == state2.subType && compareArrays(state1.catTypes, state2.catTypes)) 
    ? setApplyEnable(false) 
    : setApplyEnable(true)
  };
  
  useEffect(() => {
    updateApply(filters, valuesSelected);
  }, [valuesSelected]);
  
  const handleChangeValue = (value, name) => {
    setValuesSelected(s => ({ ...s, [name]: value}));
  };

  const apply = () => { 
    setFilters(valuesSelected);
    setIsVisible(false);
  };

  const cancel = () => {
    setIsVisible(false);
  };

  const open = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    setApplyEnable(false);
    setValuesSelected(filters)
  }, [isVisible]);

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
                disabled={!applyEnable}
                onPress={() => apply()}
                style={{
                  ...SearchStyles.apply, 
                  color: applyEnable ? 'black' : 'gray'
                }}
              >Apply</Text>
            </View>
            <Divider orientation="horizontal"/>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={SearchStyles.subTitle}>Subcriptions</Text>
              <View style={SearchStyles.SliderContainer}>
                <Slider
                  step={1}
                  thumbStyle={{ height: 20, width: 20, backgroundColor: 'black' }}
                  value={subType.indexOf(valuesSelected.subType)}
                  maximumValue={subType.length - 1}
                  onValueChange={(value) => handleChangeValue(subType[value], 'subType')}
                />
                <Text>Subcription level: {valuesSelected.subType}</Text>
              </View>
              <Text style={SearchStyles.subTitle}>Categories</Text>
              <CheckBoxList 
                checks={valuesSelected.catTypes}
                onChangeChecks={(checks) => handleChangeValue(checks, 'catTypes')}
                list={catType} 
              />
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}