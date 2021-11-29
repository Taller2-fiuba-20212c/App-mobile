import { StyleSheet } from "react-native";
import { BASE_COLOR } from  './../consts/index'

export default loginStyles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex:1
	},
	
	tittle: {
		padding: 20,
		fontWeight: 'bold',
		fontSize: 40,
		textAlign: 'center',
	},

	signUp: {
		fontWeight: 'bold', 
		color: BASE_COLOR
	}
})
