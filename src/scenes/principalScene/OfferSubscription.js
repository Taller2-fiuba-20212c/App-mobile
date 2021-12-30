import React, {useState} from 'react'
import { ActivityIndicator } from 'react-native'
import { BASE_COLOR, SUBCRIPTIONS_TYPES, WIDTH_SCREEN } from '../../consts'
import { Alert } from './../../components'
import { Overlay, Button, PricingCard } from 'react-native-elements'
import { subscribe, storeData } from '../../model'
import { USER_INFO } from '../../consts'
import Carousel, { Pagination } from 'react-native-snap-carousel';

const SLIDER_WIDTH = Math.round(WIDTH_SCREEN * 0.75);
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const PRICES = [1,2,3,5]
const SuscriptionsLevel = SUBCRIPTIONS_TYPES.map((c,i) => {
  return {
    title: c,
    price: `${PRICES[i]}`,
    color: c == 'Bronze' ? 
    '#CD7F32' : 
    c == 'Diamond' ?
    '#9AC5DB' :
    c.toLowerCase()
  }
})

export default OfferSubscription = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [subscriptionRequested, setSubscriptionRequested] = useState("");
  const [askInfo, setAskInfo] = useState({
    title: '',
    msg: ''
  })
  const [askVisible, setAskVisible] = useState(false);
  const [errorInfo, setErrorInfo] = useState({
    title: '',
    msg: ''
  })
  const [errorVisible, setErrorVisible] = useState(false);
  const [loading, setLoading] = useState(false)

  const ask = (value) => {
    setSubscriptionRequested(value)
    setAskInfo({
      title: 'Are you sure?',
      msg: "You can't go back"
    })
    setAskVisible(true)
  }

  const handleSubscribe = () => {
    setAskVisible(false)
    setLoading(true)
    subscribe(props.uid, subscriptionRequested)
    .then(r => {
      console.log(r)
      storeData(USER_INFO, JSON.stringify(r))
      .then(n => {
        setLoading(false)
        props.onBackdropPress()
      })
    })
    .catch(err => {
      console.log(err.response)
      if (err.response.status == 400) {
        setErrorInfo({
          title: 'Sorry!',
          msg: 'Insufficient money'
        })
      } else {
        setErrorInfo({
          title: 'Something went wrong!',
          msg: ''
        })
      }
      setErrorVisible(true)
      setLoading(false)
    })
  }
  
  const _renderItem = ({item, index}) => {
    return (
      <PricingCard 
        color={item.color}
        title={item.title}
        price={'$' + item.price}
        info={['/month', '1 User']}
        button={
          loading ?
          <ActivityIndicator size="large" color={item.color} />
          :
          <Button 
            title={item.title} 
            buttonStyle={{ backgroundColor: item.color }}
            onPress={() => ask(item.title)}
          />
        }
      />
    );
  }

  return (
    <>
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
    <Alert 
      isVisible={askVisible}
      alertInfo={askInfo}
      onBackdropPress={() => setAskVisible(false)}
      onButtonPress={() => handleSubscribe()}
    />
    <Alert 
      isVisible={errorVisible}
      alertInfo={errorInfo}
      onBackdropPress={() => setErrorVisible(false)}
      onButtonPress={() => setErrorVisible(false)}
    />
    </>
  )
}