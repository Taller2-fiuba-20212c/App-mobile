import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ExtraInfoStyles from './ExtraInfoStyles'
import { BASE_COLOR, CATEGORIES_TYPES } from './../../../consts'
import SelectBox from 'react-native-multi-selectbox'
import { NormalButton } from './../../../components'
import * as Location from 'expo-location';

const categories = CATEGORIES_TYPES.map((c) => {
  return {
    item: c,
    id: c.toUpperCase()
  }
})

export default ExtraInfoScreen = ({ navigation }) => {
  const [place, setPlace] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const place = await Location.reverseGeocodeAsync({
        latitude : location.coords.latitude,
        longitude : location.coords.longitude
      });

      setPlace(place);
    })();
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

  const xorBy = (l1, l2) => {
    return l1.filter(x => !l2.includes(x)).concat(l2.filter(x => !l1.includes(x)));
  }

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item]))
  }

  return (
    <View 
      style={ExtraInfoStyles.container}
    >
      {
        place ?
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
            <SelectBox
              label="Preferred categories"
              options={categories}
              labelStyle={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
              multiOptionContainerStyle={{
                backgroundColor: BASE_COLOR,
              }}
              multiOptionsLabelStyle={{
                fontSize: 17,
              }}
              inputFilterStyle={{
                fontSize: 16,
              }}
              multiListEmptyLabelStyle={{
                fontSize: 18,
                fontWeight: 'bold',
              }}
              selectedValues={selectedTeams}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              arrowIconColor={BASE_COLOR}
              searchIconColor={BASE_COLOR}
              toggleIconColor={BASE_COLOR}
              isMulti
            />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <NormalButton 
              title="Start"
              onPress={() => handleStart()}
            />
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
