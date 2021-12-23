import { StyleSheet } from "react-native";

export default PrincipalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  YourCoursesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  section: {
		fontWeight: 'bold',
		fontSize: 28,
	},
  text: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  topCourses: {
    paddingBottom: 10
  }
})
