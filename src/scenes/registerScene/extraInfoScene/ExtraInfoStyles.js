import { StyleSheet } from 'react-native'
import { STATUS_BAR_HEIGHT } from './../../../consts'

export default ExtraInfoStyles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: STATUS_BAR_HEIGHT
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});