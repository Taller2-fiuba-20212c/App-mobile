import React from 'react'
import { ScrollView } from 'react-native'
import { Divider } from 'react-native-elements';

export default ModifyUserScreen = () => {
	return (
		<ScrollView>
			<Divider orientation="horizontal" />
	
			<Divider orientation="vertical" width={5} />
	
			<Divider inset={true} insetType="middle" />
	
			<Divider
				orientation="horizontal"
				subHeader="Test"
				subHeaderStyle={{ color: 'blue' }}
			/>
		</ScrollView>
	)
}
