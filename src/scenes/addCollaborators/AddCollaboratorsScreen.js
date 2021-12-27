import React, { useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SearchBar, Icon, ListItem, Avatar } from 'react-native-elements'
import { BASE_COLOR } from '../../consts';
import { Alert } from './../../components'
import AddCollaboratorsStyles from './AddCollaboratorsStyles'
import { searchUsers, getAvatarTitle, addCollaborators } from './../../model'
import { useGlobalAuthContext } from '../../model/ContextFactory';

export default AddCollaboratorsScreen = ({navigation, route}) => {
  const cid = route.params.cid
  const [searchText, setSearchText] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searching, setSearching] = useState(false);
  const appAuthContext = useGlobalAuthContext();

  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })

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
        const results = response.filter(u => u.uid !== appAuthContext.user.uid)
        setResult(results)
        setSelected(Array(results.length).fill(false))
      }
      setSearching(false);
    })
    .catch(e => {
      console.log(e);
      // Alert.alert("Error searching", "There was an error searching for users");
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
            placeholder="Search collaborators"
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
          onPress={() => handleAddCollaborators()}
        />
      ),
    });
  });

  const handleAddCollaborators = () => {
    if (selected.every(x => x == false)){
      setAlertInfo({
        title: 'Sorry',
        msg: 'Select at least a collaborator'
      })

      setVisible(true)
      return
    }
    
    const collaborators = result.filter((u, i) => selected[i]).map(c => c.uid)

    addCollaborators(cid, collaborators)
    .then(r => {
      navigation.navigate('CouseScreen', {
        course: r
      })
    })
    .catch(e => console.log(e.response))
  }

  const handleSelect = (i) => {
    const newSelected = selected.slice();
    newSelected[i] = !selected[i]
    setSelected(newSelected)
  }

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
                bottomDivider 
                noIcon={true}
                onPress={() => handleSelect(i)}
              >
                <Avatar
                  rounded
                  title={getAvatarTitle(l.name, l.lastname)}
                  source={l.image ? { uri: l.image } : null}
                  containerStyle={{ 
                    backgroundColor: l.image ? 'white' : BASE_COLOR  
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: 'bold' }}>{l.name} {l.lastname}</ListItem.Title>
                  <ListItem.Subtitle>{l.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.CheckBox 
                  checked={selected[i]} 
                  checkedColor={BASE_COLOR} 
                  onPress={() => handleSelect(i)}
                />
              </ListItem>
            ))
          }
          <Alert 
            isVisible={visible}
            alertInfo={alertInfo}
            onBackdropPress={() => setVisible(false)}
            onButtonPress={() => setVisible(false)}
          />
        </ScrollView>
      }
    </View>
  )
}