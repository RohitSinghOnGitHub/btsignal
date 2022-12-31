import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import CmsComponent from '../components/CmsComponent';
import otherServices from '../redux/apiServices/otherServices';

const TermsConditions = ({navigation}) => {
  const {token} = useSelector(state => state.auth);
  const [desc, setDesc] = useState(null);
  const pageId = 2;
  useEffect(() => {
    otherServices.cmsPage({token, pageId}).then(res => setDesc(res));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <CmsComponent
        title="Terms and Conditions"
        navigation={navigation}
        discription={desc}
      />
    </SafeAreaView>
  );
};

export default TermsConditions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2d2d2d',
    flex: 1,
  },
});
