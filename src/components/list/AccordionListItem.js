import React, {useState} from 'react'
import { Text, View } from 'react-native'
import { YoutubeVideo } from './../video'
import { ListItem, Icon } from 'react-native-elements';
import { BASE_COLOR } from '../../consts';

export default AccordionListItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const item = props.item;
  const edit = props.edit == null ? false : props.edit;
  const navigation = props.navigation;
  
  const renderUnit = (item) => {
    return (
      <View 
        style={{ 
          flex: 1, 
          height: 200
        }}
      >
        <View style={{ alignItems: 'center'}}>
          <YoutubeVideo 
            height={175}
            width={300}
            videoId={item.videoId}
          />
        </View>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>Exam</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </View> 
    )
  }

  return (
    <ListItem.Accordion
      {...props}
      containerStyle={{ 
        paddingLeft: 20
      }}
      noIcon={edit}
      content={
        <>
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 16}}>Unit {props.number+1} - {item.name}</ListItem.Title>
          </ListItem.Content>
          {edit && <Icon 
            name='edit'
            size={24}
            type='font-awesome'
            color={BASE_COLOR}
            onPress={() => navigation.navigate('EditUnitScreen', {
              unit: item,
              number: props.number,
            })}
          />}
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