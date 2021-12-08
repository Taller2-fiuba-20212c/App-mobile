import { StyleSheet } from 'react-native'
import { NAV_BAR_HEIGHT, WIDTH_SCREEN, HEIGHT_SCREEN } from '../../consts';

export default SearchStyles = StyleSheet.create({
  header: {
    width: WIDTH_SCREEN * 0.8
  },
  optionsIcon: {
    paddingRight: 20
  },
  transparentSpace: {
    height: HEIGHT_SCREEN*0.20,
    width: WIDTH_SCREEN
  },
  filterBackground: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: HEIGHT_SCREEN*0.70,
    paddingBottom: NAV_BAR_HEIGHT
  },
  filter: {
    paddingHorizontal: 20
  },
  headerFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20
  },
  filtersText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: 'gray'
  },
  apply: {
    fontSize: 16,
    color: 'gray'
  },
  text: {
    fontSize: 16
  },
  SliderContainer: {
    padding: 20
  }

})