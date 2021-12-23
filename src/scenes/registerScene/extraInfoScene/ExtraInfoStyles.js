import { StyleSheet } from 'react-native'
import { STATUS_BAR_HEIGHT, HEIGHT_SCREEN } from './../../../consts'

export default ExtraInfoStyles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: STATUS_BAR_HEIGHT
  },
  aboutYou: {
    paddingHorizontal: 20,
  },
  title: {
		padding: 20,
		fontWeight: 'bold',
		fontSize: 40,
		textAlign: 'center',
	},
  dropdown: {
    paddingHorizontal: 10, 
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