import * as React from 'react';
import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {addFavorite} from './../../redux/actions/actionCreators';
import {useNavigation} from '@react-navigation/native';
import styles from '../List/styles';

function FlatCards({flats, dispatch, user, flatStore}) {
  const navigation = useNavigation();
  function addFav(flatId) {
    dispatch(
      addFavorite({
        id: user.user._id,
        favorites: [...user.user.favorites, flatId],
        bearerToken: user.token,
      }),
    );
  }

  function removeFav(flatId) {
    let arr = [...user.user.favorites];
    arr.splice(arr.indexOf(flatId), 1);
    dispatch(
      addFavorite({
        id: user.user._id,
        favorites: arr,
        bearerToken: user.token,
      }),
    );
  }

  function findIcon(flatId) {
    const flat = flatStore.find(element => element._id === flatId).face;
    const highestRate = flat.sort(function (a, b) {
      return parseFloat(b.votes) - parseFloat(a.votes);
    });
    return {type: highestRate[0].type, votes: highestRate[0].votes};
  }
  return flatStore.map((flatsData, index) => (
    <Pressable
      testID="FlatCard"
      key={index}
      onPress={() => navigation.navigate('Details', {flatId: flatsData._id})}>
      <View style={styles.box} key={flatsData.index}>
        <Image
          style={styles.img}
          source={{
            uri: `${flatsData.photos[0]}`,
          }}
        />
        <View style={styles.info}>
          <Text>{flatsData.address}</Text>
          <Text>{flatsData.neighborhood}</Text>
          <Text>{flatsData.price} €</Text>
          <View style={styles.iconSection}>
            <Text>{flatsData.toilet} </Text>
            <Icon style={styles.icon} name="bath" color="#000" size={25} />
            <Text>{flatsData.rooms} </Text>
            <Icon style={styles.icon} name="bed" color="#000" size={25} />
            <Text>{flatsData.m2}m2</Text>
            <Icon2
              style={styles.icon}
              name="tape-measure"
              color="#000"
              size={25}
            />
            <View style={[styles.icon_container, {top: -85, right: -30}]}>
              <TouchableOpacity
                testID="FlatCardsButton"
                onPress={() => {
                  user.user.favorites.includes(flatsData._id)
                    ? removeFav(flatsData._id)
                    : addFav(flatsData._id);
                }}>
                {user.user.favorites.includes(flatsData._id) ? (
                  <Icon name="heart" color="#EE3BC5" size={25} />
                ) : (
                  <Icon name="heart" color="#000" size={25} />
                )}
              </TouchableOpacity>
            </View>

            <View style={[styles.icon_container, {top: -260, right: -10}]}>
              <Icon3
                name={findIcon(flatsData._id).type}
                color="#000"
                size={35}
              />
              <View style={styles.miniIcon_container}>
                <Text>{findIcon(flatsData._id).votes}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  ));
}

FlatCards.propTypes = {
  flats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  filteredFlats: PropTypes.array.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    filteredFlats: store.filteredFlats,
    user: store.user,
  };
}

export default connect(mapStateToProps)(FlatCards);
