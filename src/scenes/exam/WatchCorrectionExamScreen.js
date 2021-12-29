import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native'

export default WatchCorrectionExamScreen = ({navigation, route}) => {
  const examResolution = route.params.examResolution
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: route.params.title,
      description: route.params.description,
      headerRight: () => (
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: examResolution.state == 'APPROVED'?
          'green' : 'red'
        }}
        >{examResolution.grade}/100</Text>
      )
    })
  }, [])

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView 
        keyboardShouldPersistTaps='always' 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ 
          flex: 1
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
                  fontSize: 16,
                  paddingBottom: 10
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
                            flex:9,
                            paddingRight: 10
                          }}>{(i + 1) + '. ' + u.question.question.question}</Text>
                          <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                            flex: 3
                          }}>Points: {u.grade}</Text>
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
        </View>
      </ScrollView>
    </View>
  )
}