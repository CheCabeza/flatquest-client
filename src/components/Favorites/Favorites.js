import * as React from 'react';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

function Favorites({navigation, flats, dispatch, user}) {
  return (
    <View style={styles.page}>
      <Text style={styles.favText}>Favorites</Text>
      <View style={styles.favSection}>
        {flats
          .filter(flat => user.user.favorites.includes(flat._id))
          .map((flatsData, index) => (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate('Details', {flatId: flatsData._id})
              }>
              <View style={styles.box} key={flatsData.index}>
                <Image
                  testID="detailButton"
                  style={styles.img}
                  source={{
                    uri: `${flatsData.photos[0]}`,
                  }}
                />
              </View>
            </Pressable>
          ))}
      </View>
    </View>
  );
}

Favorites.propTypes = {
  flats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    user: store.user,
  };
}

export default connect(mapStateToProps)(Favorites);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  favText: {
    fontSize: 20,
    marginTop: 70,
    marginBottom: 10,
  },
  img: {
    borderRadius: 20,
    width: 170,
    height: 120,
  },
  box: {
    shadowColor: '#000',
    margin: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favSection: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
