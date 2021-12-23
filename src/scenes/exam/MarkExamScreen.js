import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput } from './../../components'
import { addExam, getData } from './../../model'
import { BASE_COLOR, USER_INFO } from './../../consts'

const exam = {
  creatorId: "iIfY6cLrGpgFoDev2YmDknXizHG3",
  description: "En este examen demostraras cuanto has aprendido sobre el tema visto en clase.",
  examQuestions: [
    {
      creationDate: "2021-12-22T14:56:07.003Z",
      lastModificationDate: "2021-12-22T14:56:07.003Z",
      maxGrade: 50,
      question: {
        question: "¿Cuantos años tienes?",
      },
      questionType: "TEXT",
    },
    {
      creationDate: "2021-12-22T14:56:45.054Z",
      lastModificationDate: "2021-12-22T14:56:45.054Z",
      maxGrade: 50,
      question: {
        question: "¿Como te llamas?",
      },
      questionType: "TEXT",
    },
  ],
  // examResolutions: [
  //   {
  //     answers: List[Answer] = []
  //     grade: Optional[int]
  //     #APPROVED, DISAPPROVED 
  //     state: Optional[str] = None
  //     creatorId: str
  //     creationDate: datetime
  //     lastModificationDate: datetime
  //   }
  // ],
  minimumGrade: 40,
  name: "Titulo de prueba",
  state: "PUBLISHED",
}

export default MarkExamScreen = ({navigation, route}) => {
  const [sending, setSending] = useState(false);
  // const exam = route.params.exam;
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
      // title: route.title
      title: exam.name
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
    // put addResolution
    console.log(examR)
    setSending(false);
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