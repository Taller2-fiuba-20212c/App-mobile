import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import { NORMAL_ERROR_TITLE } from './../../consts'
import { NormalButton, NormalInput, Alert } from './../../components'

export default CreateQuestionScreen = ({route, navigation}) => {
  const exam = route.params.exam;
  const [question, setQuestion] = useState({
    question: '',
    maxGrade: '',
  })
  const [disabled, setDisabled] = useState(true)
  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })

  const handleChange = (value, name) => {
    setQuestion({ ...question, [name]: value });
  };

  useEffect(() => {
    setDisabled(
      question.question == '' || question.maxGrade == ''
    )
  }, [question])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create question'
    });
  }, []);

  const handleCreateQuestion = () => {
    let totalPuntuation = 0;
    for (let q of exam.examQuestions) {
      totalPuntuation += q.maxGrade
    }
    if (totalPuntuation + parseInt(question.maxGrade) > 100) {
      setAlertInfo({
        title: NORMAL_ERROR_TITLE,
        msg: 'Maximun grade exceeded, suggestion: ' + (100 - totalPuntuation)
      })
      setVisible(true)
      return
    }

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
        <NormalInput 
          onChangeText={(value) => handleChange(value, "maxGrade")} 
          maxLength={3}
          keyboardType='numeric'
          label='Maximun Grade'
          placeholder='Maximun Grade'
        />

      </View>
      <View style={{ paddingVertical: 20 }}>
        <NormalButton disabled={disabled} title="Create exam" onPress={() => handleCreateQuestion()}/>
      </View>
      <Alert 
        isVisible={visible}
        alertInfo={alertInfo}
        onBackdropPress={() => setVisible(false)}
        onButtonPress={() => setVisible(false)}
      />
    </View>
  )
}