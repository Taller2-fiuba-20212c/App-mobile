import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput, Alert } from './../../components'
import { addExamResolution } from './../../model'
import { BASE_COLOR, USER_INFO } from './../../consts'

export default MarkExamScreen = ({navigation, route}) => {
  const [sending, setSending] = useState(false);
  const [examResolution, setExamResolution] = useState(route.params.examResolution)

  const [disabled, setDisabled] = useState(true);

  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: route.params.title
    })
  }, [])

  useEffect(() => {
    setDisabled(
      examResolution.answers.some(e => e.grade == 0 ? false : !e.grade)
    )
  }, [examResolution])

  const putMark = (value, i) => {
    const answers = examResolution.answers.slice();
    let state = 'OK';
    if (value == 0) {
      state = 'WRONG'
    }
    answers[i] = {
      ...answers[i],
      grade: parseInt(value),
      state: state
    }
    setExamResolution({
      ...examResolution,
      answers: answers,
    })
  }

  const handleSendCorrection = () => {
    let totalGrade = 0;
    examResolution.answers.forEach(element => {
      totalGrade += element.grade
    })
    if (totalGrade > 100) {
      setAlertInfo({
        title: 'Sorry!',
        msg: 'Maximun total grade is 100'
      })

      setVisible(true)
      return
    }
    const now = new Date(Date.now());
    setSending(true);
    addExamResolution(route.params.cid, route.params.unitName, {
      examResolution: {
        ...examResolution,
        grade: totalGrade,
        state: totalGrade >= route.params.minimumGrade ? 'APPROVED' : 'DISAPPROVED',
        lastModificationDate: now.toISOString()
      }
    })
    .then(r => {
      setSending(false)
      navigation.navigate('CourseScreen', {
        course: r
      })
    })
    .catch(err => {
      console.log(err.response)
      setSending(false)
    })
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView 
        keyboardShouldPersistTaps='always' 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ 
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <View style={{ paddingTop: 20 }}>
            <Text style={{
              fontSize: 16,
              paddingBottom: 20
            }}>{route.params.description}</Text>
            <View style={{ 
              flex:1, 
              flexDirection: 'row',
              paddingBottom: 20
            }}>
              <Text style={{
                // paddingLeft: 10, 
                color: 'gray', 
                fontWeight: 'bold',
                fontSize: 16
              }}>Minimun Grade: </Text>
              <Text style={{
                paddingLeft: 10, 
                color: 'black', 
                fontWeight: 'bold',
                fontSize: 16
              }}>{route.params.minimumGrade}</Text>
            </View>
            {
              <View>
                <Text style={{
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Questions</Text>
                <View style={{ paddingLeft: 10 }}>
                  {
                    examResolution.answers.map((u,i) => (
                      <View key={i} style={{ paddingBottom: 20 }}>
                        <View style={{
                          flex:1, 
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap'
                        }}>
                          <Text style={{
                            color: 'gray', 
                            fontWeight: 'bold',
                            fontSize: 16,
                            flex:10
                          }}>{(i + 1) + '. ' + u.question.question.question}</Text>
                          <NormalInput 
                            containerStyle={{
                              width: 85,
                              height: 50,
                              flex: 3
                            }} 
                            placeholder="0 - 100"
                            keyboardType='numeric'
                            maxLength={3}
                            onChangeText={(value) => putMark(value, i)} 
                          />
                        </View>
                        <View style={{ borderBottomWidth: 1, borderColor: 'gray', padding: 10 }}>
                          <Text style={{
                            fontSize: 16
                          }}>{u.value.answer == '' ? ' ' : u.value.answer}</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
              </View>
            }
          </View>
          <View style={{ paddingVertical: 20 }}>
            {
              sending ?
              <ActivityIndicator size="large" color={BASE_COLOR} />
              :
              <NormalButton 
                disabled={disabled}
                onPress={() => handleSendCorrection()}
                title="Send correction"
              />
            }
          </View>
        </View>
        <Alert 
          isVisible={visible}
          alertInfo={alertInfo}
          onBackdropPress={() => setVisible(false)}
          onButtonPress={() => setVisible(false)}
        />
      </ScrollView>
    </View>
  )
}