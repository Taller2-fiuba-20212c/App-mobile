import React, {useState, useEffect} from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { YoutubeVideo } from './../video'
import { ListItem, Icon } from 'react-native-elements';
import { BASE_COLOR, ERROR_COLOR } from '../../consts';

export default AccordionListItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const item = props.item;
  const uid = props.uid;
  const edit = props.edit == null ? false : props.edit;
  const navigation = props.navigation;
  const userPermission = props.userPermission;
  const [loading, setLoading] = useState(true);
  const [corrected, setCorrected] = useState(false);

  useEffect(() => {
    setCorrected(item.exam?.examResolutions.some(e => {
      e.creatorId == uid && e.grade != null
    }))
    setLoading(false);
  }, [])

  const handlePressExam = () => {
    if (item.exam.examResolutions.some(e => e.creatorId == uid)) {
      console.log('Resuelto')
    } else {
      navigation.navigate('CompleteExamScreen', {
        exam: item.exam,
        title: item.exam.name,
        unitName: item.name,
        cid: props.cid
      })
    }
  }
  
  const renderUnit = (item) => {
    return (
      <View 
        style={{ flex: 1 }}
      >
        {
          item.contentType == 'VIDEO' ?
          <View style={{ alignItems: 'center'}}>
            <YoutubeVideo 
              height={175}
              width={300}
              videoId={item.content.videoId}
            />
          </View>
          :
          <View style={{ paddingHorizontal: 55, paddingBottom: 10}}>
            <NormalButton 
              title={'Watch content'}  
              onPress={() => {
                navigation.navigate('TextClassScreen', {
                  title: item.name,
                  text: item.content.text
                })
              }}
            />
          </View>
        }
        {
          item.exam && 
          userPermission.suscripted &&
          (loading ?
          <ActivityIndicator size="large" color={BASE_COLOR} />
          :
          <View style={{ paddingHorizontal: 55 }}>
            {
              item.exam?.examResolutions.some(e => e.creatorId == uid) ?
              <NormalButton 
                disabled={!corrected}
                title={'See correction'}
                onPress={() => handlePressExam()} 
              />
              :
              <NormalButton 
                title={'Complete exam'}
                onPress={() => handlePressExam()} 
              />
            }
          </View>)
        }
      </View> 
    )
  }

  return (
    <ListItem.Accordion
      {...props}
      containerStyle={{ 
        paddingLeft: 20
      }}
      disabled={Object.values(userPermission).every(x => x == false)}
      noIcon={edit}
      content={
        <>
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 16}}>Unit {props.number+1} - {item.name}</ListItem.Title>
          </ListItem.Content>
          {
            edit && 
            <View style={{ flexDirection: 'row'}}>
            <Icon 
              name='edit'
              size={24}
              type='font-awesome'
              color={BASE_COLOR}
              onPress={() => navigation.navigate('EditUnitScreen', {
                unit: item,
                number: props.number,
              })}
            />
            <View style={{ marginLeft: 10 }}>
            <Icon 
              name='times-rectangle-o'
              size={24}
              type='font-awesome'
              color={ERROR_COLOR}
              onPress={() => props.delete(props.number)}
            />
            </View>
            </View>
          }
        </>
      }
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
    >
      {
        expanded ? 
        renderUnit(item)        
        :
        null
      }
    </ListItem.Accordion>
  )
}