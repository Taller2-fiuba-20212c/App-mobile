import React, {useState} from 'react'
import { Text } from 'react-native'
import { BASE_COLOR, SUBCRIPTIONS_TYPES, WIDTH_SCREEN } from '../../consts'
import { Overlay, Button, PricingCard } from 'react-native-elements'
import Carousel, { Pagination } from 'react-native-snap-carousel';

const SLIDER_WIDTH = Math.round(WIDTH_SCREEN * 0.75);
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);

const SuscriptionsLevel = SUBCRIPTIONS_TYPES.map((c,i) => {
  return {
    title: c,
    price: `${i*5}`,
    color: c == 'Bronze' ? 
    '#CD7F32' : 
    c == 'Diamond' ?
    '#9AC5DB' :
    c.toLowerCase()
  }
})

export default OfferSubscription = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const _renderItem = ({item, index}) => {
    return (
      <PricingCard 
        color={item.color}
        title={item.title}
        price={'$' + item.price}
        info={['/month', '1 User']}
        button={{ title: ' START', icon: 'shopping-cart' }}
      />
    );
  }

  return (
    <Overlay 
      animationType='fade'
      statusBarTranslucent={true}
      isVisible={props.isVisible} 
      onBackdropPress={() => props.onBackdropPress()}
      overlayStyle={{
        width: WIDTH_SCREEN * 0.8,
        borderRadius: 20,
      }}
    >
      <Carousel 
        data={SuscriptionsLevel} 
        renderItem={_renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setActiveSlide(index) }
      />
      <Pagination
        dotsLength={SuscriptionsLevel.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
        }}
        dotContainerStyle={{
          height: 0,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </Overlay>
  )
}