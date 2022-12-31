import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, SectionList } from 'react-native'
import Swiper from 'react-native-swiper'

// const DATA = [
//   {
//    image: require('../../assets/slider2.jpg')
//   },
//   {
//     image: require('../../assets/slider3.jpg')
//   },
//   {
//     image: require('../../assets/slider4.jpg')
//   },
// ];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SliderMain = () => {
  return (
    <View style={styles.sliderContainer}>
            <Swiper autoplayTimeout={5} autoplay horizontal={false}>
                <View style={styles.slider}>
                    <Image
                        source={require('../../assets/slider2.jpg')}
                        resizeMode="contain"
                        style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slider}>
                    <Image
                        source={require('../../assets/slider3.jpg')}
                        resizeMode="contain"
                        style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slider}>
                    <Image
                        source={require('../../assets/slider4.jpg')}
                        resizeMode="contain"
                        style={styles.sliderImage}
                    />
                </View>
            </Swiper>
        </View>
  )
}

export default SliderMain

const styles = StyleSheet.create({
  sliderContainer: {
    height: HEIGHT * 0.25,
    width: WIDTH * 0.94,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 8,
    
    
},
slider: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'transparent',
    borderRadius: 8,
},
sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: "center",
    borderRadius: 8,
},
})