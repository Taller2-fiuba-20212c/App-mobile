import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import ExtraInfoStyles from './ExtraInfoStyles'
import { BASE_COLOR, CATEGORIES_TYPES, USER_INFO } from './../../../consts'
import { getPlace, modifyUser, storeData, addCategory } from './../../../model'
import { NormalButton, Dropdown } from './../../../components'

const categories = CATEGORIES_TYPES.map((c) => {
  return {
    item: c,
    id: c.toUpperCase()
  }
})

export default ExtraInfoScreen = ({ navigation, route }) => {
  const [place, setPlace] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([])
  const [disabled, setDisabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const xorBy = (l1, l2) => {
    return l1.filter(x => !l2.includes(x)).concat(l2.filter(x => !l1.includes(x)));
  }

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item]))
  }

  useEffect(() => {
    setDisabled(
      selectedTeams.length == 0 || !place
    )
  }, [selectedTeams, place])

  useEffect(() => {
    getPlace().then((p) => setPlace(p));
  }, []);

  const saveNewInfo = async () => {
    const user = route.params.userInfo;
    try {
      let r = await modifyUser(user.uid, {
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        country: place[0].country,
      })

      for (let c of selectedTeams) {
        await addCategory(user.uid, c.item)
      }

      await storeData(USER_INFO, JSON.stringify({
        ...r,
        categories: selectedTeams.map(c => c.item)
      }))

      return
    } catch (e) {
      console.error(e)
      throw e;
    }
  }

  const handleStart = () => {
    setSaving(true);
    saveNewInfo().then(r => {
      setSaving(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'PrincipalScreen'}]
      })
    }).catch(err => {
      console.log(err.response)
      setSaving(false)
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
              selectedValues={selectedTeams}
              options={categories}
              onMultiSelect={onMultiChange()}
              onTapClose={onMultiChange()}
              isMulti={true}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 20 }}>
            {
              saving ?
              <ActivityIndicator size="large" color={BASE_COLOR} />
              :
              <NormalButton 
                disabled={disabled}
                title="Start"
                onPress={() => handleStart()}
              />
            }
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
