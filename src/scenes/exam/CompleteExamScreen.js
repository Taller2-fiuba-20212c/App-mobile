import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput } from './../../components'
import { addExamResolution, getData } from './../../model'
import { BASE_COLOR, USER_INFO } from './../../consts'

export default CompleteExamScreen = ({navigation, route}) => {
  const [sending, setSending] = useState(false);
  const exam = route.params.exam;
  const [examResolution, setExamResolution] = useState({
    answers: Array(exam.examQuestions.length).fill(''),
    creatorId: '',
  })

  const handleChange = (value, name) => {
    setExamResolution({ ...examResolution, [name]: value });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: route.params.title,
    })

    getData(USER_INFO).then((data) => {
      handleChange(data.uid, 'creatorId')
    })
  }, [])

  const handleSendExam = () => {
    const now = new Date(Date.now());
    setSending(true);
    const examR = {
      answers: exam.examQuestions.map((u, i) => {
        return {
          question: u,
          value: {
            answer: examResolution.answers[i]
          },
          creationDate: now.toISOString(),
          lastModificationDate: now.toISOString()
        }
      }),
      creatorId: examResolution.creatorId,
      creationDate: now.toISOString(),
      lastModificationDate: now.toISOString()
    }
    addExamResolution(
      route.params.cid, 
      route.params.unitName,
      {
        examResolution: examR
      }
    )
    .then(r => {
      console.log(r);
      setSending(false);
    })
    .catch(err => {
      console.error(err.response)
      setSending(false);
    })
  }

  const changeAnswer = (value, i) => {
    let newAnswers = examResolution.answers.slice();
    newAnswers[i] = value
    handleChange(newAnswers, 'answers')
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
            }}>{exam.description}</Text>
            <View style={{ 
              flex:1, 
              paddingTop: 20,
              flexDirection: 'row', 
            }}>
              <Text style={{
                paddingLeft: 10, 
                color: 'gray', 
                fontWeight: 'bold',
                fontSize: 16
              }}>Minimun Grade: </Text>
              <Text style={{
                paddingLeft: 10, 
                color: 'black', 
                fontWeight: 'bold',
                fontSize: 16
              }}>{exam.minimumGrade}</Text>
            </View>
            {
              <View style>
                <Text style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 10, 
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Questions</Text>
                <View>
                  {
                    exam.examQuestions.map((u,i) => (
                      <NormalInput 
                        key={i}
                        label={
                          <View style={{
                            flex:1, 
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap'
                          }}>
                            <Text style={{
                              color: 'gray', 
                              fontWeight: 'bold',
                              fontSize: 16
                            }}>{(i + 1) + '. ' + u.question.question}</Text>
                            <Text style={{
                              color: 'gray', 
                              fontWeight: 'bold',
                              fontSize: 16
                            }}>Points: {u.maxGrade}</Text>
                          </View>
                        }
                        placeholder='Answer'
                        onChangeText={(value) => changeAnswer(value, i)} 
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
                disabled={false}
                onPress={() => handleSendExam()}
                title="Send exam"
              />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}