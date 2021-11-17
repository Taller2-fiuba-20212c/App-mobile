import React, {useState} from 'react'
import { ListItem, Icon } from 'react-native-elements';

export default AccordionListItem = (props) => {
  const [expanded, setExpanded] = useState(false);
  const item = props.item;
  
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
        item.content.map((c, j) => (
          <ListItem 
            key={j} 
            onPress={()=>console.log('log')} 
            containerStyle={{ 
              paddingLeft: 40
            }}
          >
            <Icon name='play' type='feather'/>
            <ListItem.Content>
              <ListItem.Title style={{fontSize: 16}}>Class {j+1} - {c.name}</ListItem.Title>
              <ListItem.Subtitle style={{fontSize: 14}}>Video - 02:30 mins</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )) :
        null
      }
    </ListItem.Accordion>
  )
}