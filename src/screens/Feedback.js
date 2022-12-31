import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {feedback} from '../redux/slices/packageSlice';
import commanServices from '../redux/apiServices/commanServices';

const Feedback = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const {pending, success} = useSelector(state => state.packages);
  const isEmpty = () => {
    if (title === '' || description === '') {
      return true;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
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
          Feedback
        </Text>
      </View>
      <ScrollView>
        <View>
          <View style={{backgroundColor: '#fefefe', margin: 10}}>
            <View style={{margin: 10, borderRadius: 10}}>
              <Image
                source={require('../../assets/feedback.jpg')}
                resizeMode="contain"
                style={styles.feedbackImage}
              />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                alignItems: 'center',
                backgroundColor: '#000',
              }}>
              <Text
                style={{
                  color: '#fefefe',
                  fontFamily: 'Mulish Bold',
                  fontSize: 16,
                }}>
                Write Your Feedback Here
              </Text>
            </View>
            <View style={styles.formBox}>
              <TextInput
                value={title}
                placeholder="Enter Subject"
                style={styles.formInput}
                placeholderTextColor="teal"
                onChangeText={text => setTitle(text)}
              />
              <TextInput
                value={description}
                placeholder="Enter Message"
                style={styles.formInput}
                numberOfLines={5}
                placeholderTextColor="teal"
                onChangeText={text => {
                  setDescription(text);
                }}
              />
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (!isEmpty()) {
                      dispatch(feedback({token, title, description}));
                      if (success === true) {
                        setTitle('');
                        setDescription('');
                      }
                    } else {
                      commanServices.showToast(
                        'Subject and Message are needed',
                      );
                    }
                  }}>
                  <LinearGradient
                    colors={['#2d2d2d', '#000']}
                    style={styles.loginBtn}>
                    {pending ? (
                      <ActivityIndicator size="small" color="#ffe01a" />
                    ) : (
                      <Text style={styles.loginBtnText}> Submit </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
  feedbackImage: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  iconcolor: {
    color: '#2d2d2d',
  },
  formBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: '#ffe01a',
    borderRadius: 10,
    paddingBottom: 20,
  },
  formBoxText: {
    fontFamily: 'Mulish Bold',
    color: '#fefefe',
  },
  formInput: {
    borderBottomWidth: 1,
    fontSize: 14,
    borderColor: '#737373',
    borderRadius: 5,
    color: '#2d2d2d',
    width: '100%',
    fontFamily: 'Mulish Bold',
  },
  loginBtn: {
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 20,
    minWidth: '90%',
    maxWidth: '90%',
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#fefefe',
    fontFamily: 'Mulish Bold',
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
