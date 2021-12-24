import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { NORMAL_ERROR_TITLE, MAX_GRADE } from './../../consts'
import { NormalButton, NormalInput, Alert } from './../../components'

export default CreateQuestionScreen = ({route, navigation}) => {
  const exam = route.params.exam;
  const [question, setQuestion] = useState({
    question: '',
    maxGrade: '',
  })
  const [disabled, setDisabled] = useState(true)

  const handleChange = (value, name) => {
    setQuestion({ ...question, [name]: value });
  };

  useEffect(() => {
    setDisabled(
      question.question == ''
    )
  }, [question])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create question'
    });
  }, []);

  const handleCreateQuestion = () => {
    const now = new Date(Date.now())

    const examModified = {
      ...exam,
      examQuestions: exam.examQuestions.slice().concat([{
        questionType: 'TEXT',
        question: {
          question: question.question
        },
        maxGrade: parseInt(question.maxGrade),
        creationDate: now.toISOString(),
        lastModificationDate: now.toISOString()
      }])
    }

    navigation.navigate('CreateExamScreen', {
      exam: examModified
    })
  }

  return (
    <View style={{ 
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 20
    }}>
      <View style={{ paddingTop: 20 }}>
        <NormalInput 
          onChangeText={(value) => handleChange(value, "question")} 
          multiline={true}
          numberOfLines={3}
          label='Question'
          placeholder='Question'
        />
      </View>
      <View style={{ paddingVertical: 20 }}>
        <NormalButton disabled={disabled} title="Add question" onPress={() => handleCreateQuestion()}/>
      </View>
    </View>
  )
}