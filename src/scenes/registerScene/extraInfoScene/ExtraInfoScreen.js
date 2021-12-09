import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ExtraInfoStyles from './ExtraInfoStyles'
import { BASE_COLOR } from './../../../consts'
import { getPlace } from './../../../model'
import { NormalButton, Dropdown } from './../../../components'

export default ExtraInfoScreen = ({ navigation }) => {
  const [place, setPlace] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([])

  useEffect(() => {
    getPlace().then((p) => setPlace(p));
  }, []);

  const handleStart = () => {
    // Post to add information /users
    console.log({
      country: place[0].country,
      categories: selectedTeams.map((i) => {
        return i.item
      })
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'PrincipalScreen'}]
    })
  }

  return (
    <View 
      style={ExtraInfoStyles.container}
    >
      {
        place ?
        <View style={{ flex: 1, justifyContent: 'space-between'}}>
        <View style={ExtraInfoStyles.aboutYou}> 
          <View>
            <Text style={ExtraInfoStyles.title}>About you</Text>
          </View>
          <View>
            <NormalInput 
              label={'Country'}
              value={place[0].country}
              disabled={true}
              placeholder='Country'
              iconName='location-pin'
            />
          </View>
          <View style={ ExtraInfoStyles.dropdown }>
            <Dropdown 
              label="Preferred categories" 
              onChange={(value) => setSelectedTeams(value)} 
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 20 }}>
            <NormalButton 
              title="Start"
              onPress={() => handleStart()}
            />
          </View>
        </View>
        </View>
        :
        <View style={ExtraInfoStyles.loading}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
      }
    </View>
  );
}
