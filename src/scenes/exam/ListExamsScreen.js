import React, {useState, useEffect, useLayoutEffect} from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { getUser } from './../../model'
import { WIDTH_SCREEN, BASE_COLOR } from './../../consts'
import { SearchBar, Icon, ListItem } from 'react-native-elements'

export default ListExamsScreen = ({navigation, route}) => {
  let initialState = []
  for (let e of route.params.exams) {
    for (let er of e.exam.examResolutions) {
      if (!er.grade) {
        initialState.push({
          name: e.exam.name,
          unitName: e.unitName,
          description: e.exam.description,
          examResolution: er,
          creatorId: er.creatorId,
          minGrade: e.exam.minimumGrade
        })
      }
    }
  }
  const [exams, setExams] = useState(initialState);
  const [creators, setCreators] = useState(new Map());
  const [searchText, setSearchText] = useState('')

  const findCreators = async (creatorsId) => {
    try {
      let creatorsInfo = new Map()
      for (let c of creatorsId) {
        if (creatorsInfo.get(c) === undefined) {
          const creatorInfo = await getUser(c)
          creatorsInfo.set(c, creatorInfo)
        }
      }
      
      return creatorsInfo
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

  useEffect(() => {
    let creatorsId = []
    for (let e of route.params.exams) {
      for (let er of e.exam.examResolutions) {
        creatorsId.push(er.creatorId)
      }
    }

    findCreators(creatorsId)
    .then(r => setCreators(r))
    .catch(e => console.log(e.response))
  }, [])

  const handleFilter = (name) => {
    setSearchText(name)
    if (name == '') {
      setExams(initialState)
      return
    }

    setExams(initialState.filter(e => 
      e.name.includes(name) 
      || 
      creators.get(e.creatorId).name.includes(name)
      ||
      creators.get(e.creatorId).lastname.includes(name)
      ||
      (creators.get(e.creatorId).name + ' ' + creators.get(e.creatorId).lastname).includes(name)
    ))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <SearchBar
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 0, //no effect
            shadowColor: 'white', //no effect
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            width: WIDTH_SCREEN*0.8,
            paddingRight: 40,
            paddingLeft: 0,
          }}
          inputContainerStyle={{
            height:40
          }}
          inputStyle={{
            color: 'black'
          }}
          returnKeyType='search'
          showLoading={true}
          round={true}
          lightTheme={true}
          placeholder="search resolved exam"
          onChangeText={(v) => handleFilter(v)}
          value={searchText}
        />
      ),
    });
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    {
      creators.size == 0 && exams.length != 0 ?
      <ActivityIndicator size="large" color={BASE_COLOR} />
      :
      exams.length == 0 ?
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center',
        paddingTop: 20
      }}>
        <Text style={{
          color: 'gray',
          fontWeight: 'bold'
        }}>No exams to mark</Text>
      </View>
      :
      exams.map((e, i) => (
        <ListItem 
          key={`${i}`} 
          bottomDivider 
          noIcon={true}
          onPress={() => navigation.navigate('MarkExamScreen', {
            examResolution: e.examResolution,
            title: e.name,
            description: e.description,
            owner: creators.get(e.creatorId),
            cid: route.params.cid,
            unitName: e.unitName
          })}
        >
          <Icon 
            name='form'
            size={35}
            type='antdesign'
            color={BASE_COLOR}
            containerStyle={{ paddingLeft: 20 }}
          />
          <ListItem.Content>
            <ListItem.Title style={{ fontWeight: 'bold' }}>{e.name}</ListItem.Title>
            <ListItem.Subtitle>
              {creators.get(e.creatorId)?.name} {creators.get(e.creatorId)?.lastname}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))
    }
    </ScrollView>
  )
}