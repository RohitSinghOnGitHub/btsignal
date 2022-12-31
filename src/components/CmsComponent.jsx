import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CmsComponent = ({title, navigation, discription}) => {
  const {width} = useWindowDimensions();
  const source = {
    html: `<div style='text-align:justify; padding:10px;'>${discription}</div>`,
  };
  return (
    <View>
      <View
        style={{
          height: 50,
          backgroundColor: '#000',
          elevation: 0,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 0.5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" color={'#fefefe'} size={20} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#fefefe',
            paddingLeft: 10,
            fontFamily: 'Mulish Bold',
            fontSize: 16,
          }}>
          {title}
        </Text>
      </View>

      <ScrollView>
        <View
          style={{
            backgroundColor: '#cccc',
            margin: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              alignItems: 'center',
              backgroundColor: '#000',
            }}>
            <Text
              style={{
                color: '#fefefe',
                fontFamily: 'Mulish Bold',
                fontSize: 16,
              }}>
              {title}
            </Text>
          </View>
          {discription === null ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
              }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            // <Text
            //   style={{
            //     width: width,
            //     fontFamily: 'Mulish Regular',
            //     padding: 10,
            //     fontSize: 15,
            //     lineHeight: 22,
            //     color: '#1b1b1c',
            //   }}>
            //   {/* {discription} */}
            // </Text>
            <RenderHTML contentWidth={width} source={source} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default CmsComponent;
