import { StyleSheet } from "react-native";
import { BASE_COLOR } from  '../../consts'

export default WelcomeStyles = StyleSheet.create({
  principalContainer: {
    justifyContent:'center',
		flex: 1,
    paddingHorizontal: 20
	},
  titleContainer: {
    justifyContent: 'center',
    flex: 14,
  },
  title: {
		padding: 20,
		fontWeight: 'bold',
		fontSize: 60,
		textAlign: 'center',
	},
  bottomContainer: {
    flex: 1,
    paddingHorizontal:100,
    paddingVertical: 20
  }
})
