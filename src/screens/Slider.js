import React, {useState} from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, SafeAreaView } from 'react-native'

const images = [
    'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
    'https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg',
]

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Slider = () => {
  const [imgActive, setImgActive] = useState(0);
  onChange = (nativeEvent) => {

  }
  return (
    <SafeAreaView style={{flex: 1,}}>
      <View style={{margin: 10,}}>
        <View style={styles.wrap}>
            <ScrollView
                onScroll={({nativeEvent}) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
                scrollEventThrottle={20}
            >
              {
                images.map((e, index) => 
                <Image 
                  key={e}
                  resizeMode='stretch'
                  style={styles.wrap}
                  source={{uri: e}}
                />

                )
              }
            </ScrollView>
        </View>
        </View>
    </SafeAreaView>
  )
}

export default Slider

const styles = StyleSheet.create({
  wrap:{
    width: WIDTH * 0.95,
    height: 200,
    borderRadius: 20,
  },
})