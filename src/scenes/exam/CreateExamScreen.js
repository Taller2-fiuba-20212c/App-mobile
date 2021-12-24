import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput, MultiSelect, Alert } from './../../components'
import { addExam } from './../../model'
import { ListItem } from 'react-native-elements'
import { BASE_COLOR, NORMAL_ERROR_TITLE, MAX_GRADE } from './../../consts'

export default CreateExamScreen = ({navigation, route}) => {
  const [exam, setExam] = useState({
    name: '',
    description: '',
    examQuestions: [],
    examResolutions: [],
    state: 'PUBLISHED',
    minimumGrade: null,
    // creatorId: route.params.creatorId,
    creatorId: '1',
  })
  const [disabled, setDisabled] = useState(true)
  const [unitSelected, setUnitSelected] = useState(null)
  // const [units, setUnits] = useState(route.params.unitsNames)
  const [units, setUnits] = useState(['unit1', 'unit2', 'unit3'])
  // const [courseId, setCourseId] = useState(route.params.courseId)
  const [courseId, setCourseId] = useState('c2')
  const [creating, setCreating] = useState(false);

  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })

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
      ||
      exam.minimumGrade == null
      ||
      unitSelected == null
    )
  }, [exam, unitSelected])

  useEffect(() => {
    if (route.params?.exam) {
      setExam(route.params.exam);
    }

    if (route.params?.unitsNames) {
      setUnits(route.params?.unitsNames);
    }

    if (route.params?.courseId) {
      setCourseId(route.params?.courseId);
    }
  }, [route.params]);

  const createQuestion = () => {
    navigation.navigate('CreateQuestionScreen', {
      exam: exam
    })
  }

  const handleCreateExam = () => {
    if (exam.minimumGrade > MAX_GRADE) {
      setAlertInfo({
        title: NORMAL_ERROR_TITLE,
        msg: "Minimun grade shouldn't surpass the maximun exam grade: " + MAX_GRADE
      })

      setVisible(true)
      return
    }

    // setCreating(true);
    const now = new Date(Date.now());
    console.log(exam)
    navigation.navigate('CompleteExamScreen', {
      exam: exam,
      title: exam.name
    })
    // addExam(courseId, unitSelected, {
    //   ...exam,
    //   creationDate: now.toISOString(),
    //   lastModificationDate: now.toISOString()
    // })
    // .then(r => {
    //   setCreating(false)
    //   navigation.navigate('CourseScreen', {
    //     course: r
    //   })
    // })
    // .catch(err => {
    //   console.error(err.response)
    //   setCreating(false)
    // })
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
            <NormalInput 
              onChangeText={(value) => handleChange(value, "minimumGrade")} 
              maxLength={3}
              keyboardType='numeric'
              label='Minimun Grade'
              placeholder='0 - 100'
            />
            <Text style={{
              paddingLeft: 10, 
              color: 'gray', 
              fontWeight: 'bold',
              fontSize: 16
            }}>Unit</Text>
            <View style={{ paddingHorizontal: 10 }}>
              <MultiSelect 
                options={units} 
                value={unitSelected} 
                placeholder='Select unit' 
                onChange={(unit) => setUnitSelected(unit)}
              />
            </View>
            {
              exam.examQuestions.length > 0 &&
              <View style>
                <Text style={{
                  paddingTop: 20,
                  paddingLeft: 10, 
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Questions</Text>
                <View>
                  {
                    exam.examQuestions.map((u,i) => (
                      <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                          <ListItem.Title>{i+1}. {u.question.question}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    ))
                  }
                </View>
              </View>
            }
            <View style={{ paddingTop: 20 }}>
              <NormalButton title="Add question" onPress={() => createQuestion()} />
            </View>
          </View>
          <View style={{ paddingVertical: 20 }}>
            {
              creating ?
              <ActivityIndicator size="large" color={BASE_COLOR} />
              :
              <NormalButton 
                disabled={disabled}
                onPress={() => handleCreateExam()}
                title="Create exam"
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