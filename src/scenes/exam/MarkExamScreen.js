import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput, Alert } from './../../components'
import { addExam, getData } from './../../model'
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
      // title: route.title
      title: examResolution.name
    })

    // getData(USER_INFO).then((data) => {
    //   handleChange(data.uid, 'creatorId')
    // })
  }, [])

  useEffect(() => {
    setDisabled(
      examResolution.answers.some(e => !e.grade)
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
      console.log(totalGrade)
      setAlertInfo({
        title: 'Sorry',
        msg: 'Maximun total grade is 100'
      })

      setVisible(true)
      return
    }
    const now = new Date(Date.now());
    setSending(true);
    // put addCorrection
    console.log(examResolution)
    setSending(false);
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
            }}>{examResolution.description}</Text>
            {
              <View style>
                <Text style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Questions</Text>
                <View>
                  {
                    examResolution.answers.map((u,i) => (
                      <NormalInput 
                        key={i}
                        label={
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
                              fontSize: 16
                            }}>{(i + 1) + '. ' + u.question.question.question}</Text>
                            <NormalInput 
                              containerStyle={{
                                width: 85,
                                height: 50
                              }} 
                              placeholder="0 - 100"
                              keyboardType='numeric'
                              maxLength={3}
                              onChangeText={(value) => putMark(value, i)} 
                            />
                          </View>
                        }
                        placeholder='Answer'
                        disabledInputStyle={{
                          color: 'black',
                        }}
                        value={u.value.answer == '' ? ' ' : u.value.answer}
                        disabled={true}
                      />
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