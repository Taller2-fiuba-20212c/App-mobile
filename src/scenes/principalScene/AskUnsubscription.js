import React, {useState} from 'react'
import { Text, ActivityIndicator } from 'react-native'
import { Overlay, Button } from 'react-native-elements'
import { Alert } from './../../components'
import { WIDTH_SCREEN, ERROR_COLOR, USER_INFO } from './../../consts'
import { getData, storeData, unsubscribe } from './../../model'

export default AskUnsubscription = (props) => {
  const [loading, setLoading] = useState(false)

  const [errorVisible, setErrorVisible] = useState(false)

  const modifyDataSaved = async (r) => {
    const userInfoSaved = await getData(USER_INFO)
    const aux = Object.assign({}, userInfoSaved);
    const newUserInfo = Object.assign(aux, r);
    await storeData(USER_INFO, JSON.stringify(newUserInfo));
    return
  }

  const handleUnsubscription = () => {
    setLoading(true);
    unsubscribe(props.uid)
    .then(r => {
      modifyDataSaved(r)
      .then(n => {
        setLoading(false)
        props.onBackdropPress()
      })
    }) 
    .catch(e => {
      setLoading(false)
      setErrorVisible(true)
      props.onBackdropPress()
    })
  }

  return (
    <>
    <Overlay 
      animationType='fade'
      statusBarTranslucent={true}
      isVisible={props.isVisible} 
      onBackdropPress={() => props.onBackdropPress()}
      overlayStyle={{
        width: WIDTH_SCREEN * 0.8,
        borderRadius: 20,
      }}
    >
      <Text style={{
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      }}>Are you sure?</Text>
      <Text style={{
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 17,
      }}>You can't go back</Text>
      {
        loading ?
        <ActivityIndicator size="large" color={ERROR_COLOR} />
        :
        <Button
          title="Ok"
          buttonStyle={{
            backgroundColor: ERROR_COLOR,
            borderRadius: 20,
          }}
          onPress={() => handleUnsubscription()}
        />
      }
    </Overlay>
    <Alert 
      isVisible={errorVisible}
      alertInfo={{
        title: 'Something went wrong!',
        msg: ''
      }}
      onBackdropPress={() => setErrorVisible(false)}
      onButtonPress={() => setErrorVisible(false)}
    />
    </>
  )
}