import React, {useState, useRef, useEffect, useCallback} from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import commanServices from '../redux/apiServices/commanServices';

const SliderCustom = () => {
  const [dummySlider, setDummySlider] = useState([
    {
      image:
        'https://images.unsplash.com/photo-1542410613-d073472c3135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1626278664285-f796b9ee7806?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1557342960-7ea3df1d8630?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=848&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1608889476518-738c9b1dcb40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    },
  ]);
  const {token} = useSelector(state => state.auth);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef();
  let intervalId = null;

  useEffect(() => {
    commanServices.getSlider({token}).then(res => {
      console.log('in Slider' + res);
      setDummySlider(res);
    });
  }, []);
  const onSlideChange = useCallback(() => {
    const newIndex =
      selectedIndex === dummySlider.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: 390 * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();
    return () => {
      clearInterval(intervalId);
    };
  });

  const onTouchStart = () => {
    clearInterval(intervalId);
  };

  const onTouchend = () => {
    startInterval();
  };

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let currentIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(currentIndex);
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchend}
        onMomentumScrollEnd={setIndex}
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {dummySlider.map((item, index) => (
          <View key={index} style={styles.item}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={styles.parentDot}>
        {dummySlider.map((val, key) => (
          <View
            key={key}
            style={[
              styles.dot,
              {
                backgroundColor: key === selectedIndex ? '#fff' : 'lightgray',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default SliderCustom;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    //marginVertical: 0,
  },
  item: {
    width: 370,
    height: 200,
    borderRadius: 10,
    marginRight: 20,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'lightcoral',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    //borderTopRightRadius: 25,
  },
  parentDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    top: -20,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 2,
    borderRadius: 100,
  },
});
