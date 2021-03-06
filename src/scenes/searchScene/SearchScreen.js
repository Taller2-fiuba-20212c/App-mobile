import React, {useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { SearchBar, Icon, BottomSheet, Divider, Slider, ListItem } from 'react-native-elements'
import { CheckBoxList, LongCardCourse } from '../../components'
import { BASE_COLOR, SUBCRIPTIONS_TYPES, CATEGORIES_TYPES, USER_INFO } from '../../consts';
import SearchStyles from './SearchStyles'
import { getRecommendations, getData } from './../../model'

export default SearchScreen = ({navigation}) => {
  const [isUser, setIsUser] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [applyEnable, setApplyEnable] = useState(false);
  const [byCountry, setByCountry] = useState(null);
  const [byCategories, setByCategories] = useState(null);

  const initialFilters = {
    subType: SUBCRIPTIONS_TYPES[3],
    catTypes: [],
  }
  const [filters, setFilters] = useState(initialFilters);

  const [subTypeSelected, setSubTypeSelected] = useState(SUBCRIPTIONS_TYPES[3]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const compareArrays = (array1, array2) => {
    const array2Sorted = array2.slice().sort();
    return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
      return value === array2Sorted[index];
    });
  };

  const updateApply = (filters, subType, catTypes) => {
    (filters.subType == subType && compareArrays(filters.catTypes, catTypes)) 
    ? setApplyEnable(false) 
    : setApplyEnable(true)
  };
  
  useEffect(() => {
    updateApply(filters, subTypeSelected, categoriesSelected);
  }, [subTypeSelected, categoriesSelected]);

  const apply = () => { 
    setFilters({
      subType: subTypeSelected,
      catTypes: categoriesSelected
    });
    setApplyEnable(false);
    setIsVisible(false);
  };

  useEffect(() => {
    if (searchText) {
      handleSearchCourses()
    }
  }, [filters])

  const cancel = () => {
    setSubTypeSelected(filters.subType);
    setCategoriesSelected(filters.catTypes);
    setIsVisible(false);
  };

  const open = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFilters(initialFilters)
      setSubTypeSelected(SUBCRIPTIONS_TYPES[3])
      setCategoriesSelected([])
      setByCountry(null)
      setByCategories(null)
      setSearchText('')

      getData(USER_INFO)
      .then(user => {
        if (user) {
          setIsUser(true)
          getRecommendations(user.uid, user.country, '')
          .then(c => {
            setByCountry(c)
          })
          .catch(err => console.log(err.response));
  
          getRecommendations(user.uid, '', user.categories.map(c => c.description))
          .then(c => {
            setByCategories(c)
          })
          .catch(err => console.log(err.response));
        }
      })
    });

    return unsubscribe;
  }, [navigation])

  const handleSearchCourses = () => {
    navigation.navigate('SearchResultsScreen', {
      filters: {
        ...filters,
        text: searchText,
      }
    })
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
            inputStyle={{
              color: 'black'
            }}
            autoCapitalize='none'
            returnKeyType='search'
            onSubmitEditing={handleSearchCourses}
            showLoading={true}
            round={true}
            lightTheme={true}
            placeholder="search"
            onChangeText={(v) => setSearchText(v)}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {
          isUser &&
          <View>
            <View>
              <View style={{
                paddingVertical: 10,
                paddingHorizontal: 20
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 28,
                }}>Courses near to you</Text>
              </View>
            {
              byCountry ? 
              (byCountry.length == 0 ?
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'center',
                paddingBottom: 20
              }}>
                <Text style={{
                  color: 'gray',
                  fontWeight: 'bold'
                }}>Sorry, there's no courses near to you</Text>
              </View>
              :
              byCountry.slice(0,5).map((l, i) => (
                <ListItem 
                  key={i} 
                  containerStyle={{ 
                    padding: 0,
                    paddingVertical: 5
                  }}
                >
                  <ListItem.Content>
                    <LongCardCourse navigation={navigation} course={l}/>
                  </ListItem.Content>
                </ListItem>
              )))
              :
              <ActivityIndicator size="large" color={BASE_COLOR} />
            }
            </View>
            <View>
              <View style={{
                paddingVertical: 10,
                paddingHorizontal: 20
              }}>
                <Text style={{
                  fontWeight: 'bold',
                  fontSize: 28,
                }}>Courses with your preferences</Text>
              </View>
              {
                byCategories ?
                (byCategories.length == 0 ?
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'center',
                  paddingBottom: 20
                }}>
                  <Text style={{
                    color: 'gray',
                    fontWeight: 'bold'
                  }}>Sorry, there's no courses for you</Text>
                </View>
                :
                byCategories.slice(0,5).map((l, i) => (
                  <ListItem 
                    key={i} 
                    containerStyle={{ 
                      padding: 0,
                      paddingVertical: 5
                    }}
                  >
                    <ListItem.Content>
                      <LongCardCourse navigation={navigation} course={l}/>
                    </ListItem.Content>
                  </ListItem>
                )))
                :
                <ActivityIndicator size="large" color={BASE_COLOR} />
              }
            </View>
          </View>
        }
      </ScrollView>
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
                  allowTouchTrack={true}
                  step={1}
                  thumbStyle={{ height: 20, width: 20, backgroundColor: 'black' }}
                  value={SUBCRIPTIONS_TYPES.indexOf(filters.subType)}
                  maximumValue={SUBCRIPTIONS_TYPES.length - 1}
                  onValueChange={(value) => setSubTypeSelected(SUBCRIPTIONS_TYPES[value])}
                />
                <Text>Subcription level: {subTypeSelected}</Text>
              </View>
              <Text style={SearchStyles.subTitle}>Categories</Text>
              <CheckBoxList 
                checks={categoriesSelected}
                onChangeChecks={(checks) => setCategoriesSelected(checks)}
                list={CATEGORIES_TYPES} 
              />
            </ScrollView>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}