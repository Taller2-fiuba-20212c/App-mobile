import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ExtraInfoStyles from './ExtraInfoStyles'
import { BASE_COLOR, CATEGORIES_TYPES } from './../../../consts'
import SelectBox from 'react-native-multi-selectbox'
import * as Location from 'expo-location';

const e = [
  {
    item: CATEGORIES_TYPES[0],
    id: CATEGORIES_TYPES[0]
  },
  {
    item: CATEGORIES_TYPES[1],
    id: CATEGORIES_TYPES[1]
  },
  {
    item: CATEGORIES_TYPES[2],
    id: CATEGORIES_TYPES[2]
  },
  {
    item: CATEGORIES_TYPES[3],
    id: CATEGORIES_TYPES[3]
  },
]

export default ExtraInfoScreen = () => {
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

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (place) {
    text = JSON.stringify(place);
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
        <View style={{ paddingHorizontal: 20 }}> 
          <View>
            <Text style={RegisterStyles.title}>Details</Text>
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
          <View style={{ paddingHorizontal: 10 }}>
            <SelectBox
              label="Select multiple"
              options={e}
              labelStyle={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
              multiOptionContainerStyle={{
                backgroundColor: BASE_COLOR
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
        </View>
        :
          <View style={ExtraInfoStyles.loading}>
            <ActivityIndicator size="large" color={BASE_COLOR} />
          </View>
      }
    </View>
  );
}
