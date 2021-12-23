import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SearchBar, Icon, ListItem } from 'react-native-elements'
import { BASE_COLOR } from '../../consts';
import AddCollaboratorsStyles from './AddCollaboratorsStyles'
import { searchUsers, getAvatarTitle } from './../../model'

export default AddCollaboratorsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearchCourses = () => {
    setSearching(true);
    searchUsers({
      name: searchText,
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
              <ListItem key={i} bottomDivider onPress={() => console.log('seleccionar' + {i})}>
                <Avatar
                  rounded
                  title={getAvatarTitle(creator.name, creator.lastname)}
                  containerStyle={{ 
                    backgroundColor: BASE_COLOR 
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: 'bold' }}>{user.name} {user.lastname}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron color="gray" />
              </ListItem>
            ))
          }
        </ScrollView>
      }
    </View>
  )
}