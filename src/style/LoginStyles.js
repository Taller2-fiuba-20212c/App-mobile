import {StyleSheet} from "react-native";
import * as constants from  './../Constants'

export default loginStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex:1
	},
	
	tittle: {
		padding: 20,
		fontWeight: "bold",
		fontSize: 40,
		textAlign: "center",
	},

	signUp: {
		fontWeight: "bold", 
		color: constants.BASE_COLOR
	}
})
