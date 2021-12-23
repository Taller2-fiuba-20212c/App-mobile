import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SearchBar, Icon, ListItem, Avatar } from 'react-native-elements'
import { BASE_COLOR } from '../../consts';
import AddCollaboratorsStyles from './AddCollaboratorsStyles'
import { searchUsers, getAvatarTitle } from './../../model'
import { useGlobalAuthContext } from '../../model/ContextFactory';

export default AddCollaboratorsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const appAuthContext = useGlobalAuthContext();

  const handleSearchCourses = () => {
    setSearching(true);
    searchUsers({
      name: searchText,
      role: 'COLABORATOR'
    })
    .then(response => {
      if(response.length == 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
        setResult(response.filter(u => u.uid !== appAuthContext.user.uid))
      }
      setSearching(false);
    })
    .catch(e => {
        console.log(e);
        Alert.alert("Error searching", "There was an error searching for users");
        setSearching(false);
    })
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
                  title={getAvatarTitle(l.name, l.lastname)}
                  containerStyle={{ 
                    backgroundColor: BASE_COLOR 
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: 'bold' }}>{l.name} {l.lastname}</ListItem.Title>
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