import {StyleSheet} from "react-native";
import * as constants from  './../Constants'

export default CreateUserStyles = StyleSheet.create({
	container: {
    justifyContent: 'center',
		flex: 1,
	},

	signUp: {
		fontWeight: "bold", 
		color: constants.BASE_COLOR
	}
})
