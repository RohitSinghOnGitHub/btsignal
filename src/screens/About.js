import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CmsComponent from '../components/CmsComponent';
import otherServices from '../redux/apiServices/otherServices';

const About = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const [desc, setDesc] = useState(null);
  const pageId = 1;
  useEffect(() => {
    otherServices.cmsPage({token, pageId}).then(res => setDesc(res));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <CmsComponent
        title="About Us"
        navigation={navigation}
        discription={desc}
      />
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
});
