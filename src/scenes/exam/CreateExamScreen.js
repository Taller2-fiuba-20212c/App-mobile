import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { NormalButton, NormalInput } from './../../components'
import { ListItem } from 'react-native-elements'

export default CreateExamScreen = ({navigation, route}) => {
  const [exam, setExam] = useState({
    name: '',
    description: '',
    examQuestions: [],
    examResolutions: [],
    state: 'CREATED',
    minimumGrade: 0,
    creatorId: route.params.creatorId,
  })
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create exam'
    });
  }, []);

  const handleChange = (value, name) => {
    setExam({ ...exam, [name]: value });
  };

  useEffect(() => {
    setDisabled(
      exam.name == '' 
      || 
      exam.description == '' 
      || 
      exam.examQuestions.length == 0
    )
  }, [exam])

  useEffect(() => {
    if (route.params?.exam) {
      setExam(route.params.exam);
    }
  }, [route.params]);

  const createQuestion = () => {
    navigation.navigate('CreateQuestionScreen', {
      exam: exam
    })
  }

  const handleCreateExam = () => {
    console.log(exam)
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
            <NormalInput 
              onChangeText={(value) => handleChange(value, "name")} 
              label='Title'
              placeholder='Title'
            />
            <NormalInput 
              onChangeText={(value) => handleChange(value, "description")} 
              label='Description'
              placeholder='Description'
            />
            {
              exam.examQuestions.length > 0 &&
              <View style={{ }}>
                <Text style={{
                  paddingLeft: 10, 
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Questions</Text>
                <View>
                  {
                    exam.examQuestions.map((u,i) => (
                      <ListItem key={i}>
                        <ListItem.Content>
                          <ListItem.Title>{i+1}. {u.question.question}</ListItem.Title>
                          <ListItem.Subtitle>Value: {u.maxGrade}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                    ))
                  }
                </View>
              </View>
            }
            <NormalButton title="Add question" onPress={() => createQuestion()} />
          </View>
          <View style={{ paddingVertical: 20 }}>
            <NormalButton 
              disabled={disabled}
              onPress={() => handleCreateExam()}
              title="Create exam"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}