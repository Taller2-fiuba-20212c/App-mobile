import React, {useLayoutEffect, useState, useEffect} from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import { SearchBar, Icon, BottomSheet, Divider, Slider, ListItem } from 'react-native-elements'
import { CheckBoxList, LongCardCourse } from '../../components'
import { BASE_COLOR, SUBCRIPTIONS_TYPES, CATEGORIES_TYPES } from '../../consts';
import AddCollaboratorsStyles from './AddCollaboratorsStyles'
import { searchUsers } from './../../model'

export default AddCollaboratorsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearchCourses = () => {
    setSearching(true);
    searchUsers({
      name: searchText,
      lastname: searchText,
      role: 'COLABORATOR'
    })
    .then(r => {
      if(r.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setResult(r);
      }
      setSearching(false);
    })
    .catch(err => console.log(err.response));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View style={AddCollaboratorsStyles.header}>
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
          name='add'
          size={24}
          type='ionicon'
          color={BASE_COLOR}
          containerStyle={SearchStyles.optionsIcon}
        />
      ),
    });
  });

  return(
    <View>
      {
        searching ? 
        <ActivityIndicator size="large" color={BASE_COLOR} />
        : 
        noResults ?
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'center',
        }}>
          <Text style={{
            color: 'gray',
            fontWeight: 'bold'
          }}>No results found</Text>
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            result && result.map((l, i) => (
              <ListItem 
                key={i} 
                containerStyle={{ 
                  padding: 0,
                  paddingVertical: 5
                }}
              >
                <ListItem.Content>
                  <LongCardCourse navigation={navigation} course={l} />
                </ListItem.Content>
              </ListItem>
            ))
          }
        </ScrollView>
      }
    </View>
  )
}