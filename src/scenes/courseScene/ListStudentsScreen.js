import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { SearchBar, Icon, ListItem, Avatar } from 'react-native-elements'
import { BASE_COLOR, WIDTH_SCREEN } from '../../consts';
import { getUser, getStudents, getAvatarTitle } from './../../model'

export default ListStudentsScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState(null);

  const searchStudents = async (sid) => {
    try {
      let s = []
      for (let id of sid) {
        const sInfo = await getUser(id)
        s.push(sInfo)
      }

      return s
    } catch (e) {
      throw e
    }
  }

  const filter = (value) => {
    setSearchText(value)
    setResults(students.filter(e => 
      e.name.includes(value) 
      || 
      e.lastname.includes(value)
      ||
      (e.name + ' ' + e.lastname).includes(value)
      ||
      e.email.includes(value)
    ))
  }

  useEffect(() => {
    getStudents(route.params.cid)
    .then(r => {
      searchStudents(r.students)
      .then(s => {
        setStudents(s)
        setResults(s)
        setLoading(false)
      })
    })
    .catch(e => {
      console.log(e.response)
      setLoading(false)
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View style={{
          width: WIDTH_SCREEN * 0.8
        }}>
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
            showLoading={true}
            round={true}
            lightTheme={true}
            placeholder="Search collaborators"
            onChangeText={(v) => filter(v)}
            value={searchText}
          />
        </View>
      )
    });
  });

  return(
    <View>
      {
        loading ? 
        <ActivityIndicator size="large" color={BASE_COLOR} />
        :
        <View>
        {
          results && 
          (
            results.length == 0 ?
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'center',
              paddingTop: 20
            }}>
              <Text style={{
                color: 'gray',
                fontWeight: 'bold'
              }}>No students in this course</Text>
            </View>
            :
            results.map((l, i) => (
              <ListItem 
                key={i} 
                bottomDivider 
                noIcon={true}
                onPress={() => navigation.navigate('UserScreen', {
                  userInfo: l
                })}
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
              </ListItem>
            ))
          )
        }
        </View>
      }
    </View>
  )
}