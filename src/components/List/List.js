import React, {useEffect, useState} from 'react';
import {View, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {loadFlats} from './../../redux/actions/actionCreators';
import styles from './styles';
import FlatCards from '../FlatCards/FlatCards';
function List({flats, dispatch, user}) {
  let [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(loadFlats(searchValue));
  }, [dispatch, searchValue]);

  return (
    <SafeAreaView style={{paddingBottom: 30}}>
      <ScrollView>
        <View style={styles.page}>
          <View style={styles.input}>
            <Icon name="search" color="#000" size={25} />
            <TextInput
              testID="searchInput"
              style={styles.inputText}
              placeholder="Search Flat"
              autoCapitalize="none"
              onChangeText={search => setSearchValue(search)}
              value={searchValue}
            />
          </View>
          <FlatCards flatStore={flats} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

List.propTypes = {
  flats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    user: store.user,
  };
}

export default connect(mapStateToProps)(List);
