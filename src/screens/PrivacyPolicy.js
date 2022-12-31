import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import CmsComponent from '../components/CmsComponent';
import otherServices from '../redux/apiServices/otherServices';
const PrivacyPolicy = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const [desc, setDesc] = useState(null);
  const pageId = 3;
  useEffect(() => {
    otherServices.cmsPage({token, pageId}).then(res => setDesc(res));

    console.log(desc);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CmsComponent
        title="Privacy Ploicy"
        navigation={navigation}
        discription={desc}
      />
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
});
