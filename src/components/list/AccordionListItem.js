import React, {useState} from 'react'
import { Text, View} from 'react-native'
import { YoutubeVideo } from './../video'
import { ListItem } from 'react-native-elements';

export default AccordionListItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const item = props.item;
  
  const renderUnit = (item) => {
    return (
      <View 
        style={{ 
          flex: 1, 
          alignItems: 'center',
          height: 200
        }}
      >
        <YoutubeVideo 
          height={175}
          width={300}
          videoId={item.videoId}
        />
      </View> 
    )
  }

  return (
    <ListItem.Accordion
      {...props}
      containerStyle={{ 
        paddingLeft: 20
      }}
      content={
        <>
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 16}}>Unit {props.number+1} - {item.name}</ListItem.Title>
          </ListItem.Content>
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