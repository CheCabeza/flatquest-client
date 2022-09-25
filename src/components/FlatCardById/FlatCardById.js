import * as React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';

function FlatCards({flats, dispatch, user, flatStore, flatId}) {
  const navigation = useNavigation();

  function findIcon(flatIdToFind) {
    const flat = flats.find(element => element._id === flatIdToFind).face;
    const highestRate = flat.sort(function (a, b) {
      return parseFloat(b.votes) - parseFloat(a.votes);
    });
    return {type: highestRate[0].type, votes: highestRate[0].votes};
  }
  return flats
    .filter(flatList => flatList._id === flatId)
    .map((flatDetails, index) => (
      <Pressable
        key={index}
        onPress={() =>
          navigation.navigate('Details', {flatId: flatDetails._id})
        }>
        <View
          testID="FlatCardByIdPressable"
          style={FlatCardByIdStyles.box}
          key={flatDetails.index}>
          <Image
            style={FlatCardByIdStyles.img}
            source={{
              uri: `${flatDetails.photos[0]}`,
            }}
          />
          <View style={FlatCardByIdStyles.info}>
            <Text>{flatDetails.address}</Text>
            <Text>{flatDetails.neighborhood}</Text>
            <Text>{flatDetails.price} €</Text>
            <View style={FlatCardByIdStyles.iconSection}>
              <Text>{flatDetails.toilet} </Text>
              <Icon
                style={FlatCardByIdStyles.icon}
                name="bath"
                color="#000"
                size={15}
              />
              <Text>{flatDetails.rooms} </Text>
              <Icon
                style={FlatCardByIdStyles.icon}
                name="bed"
                color="#000"
                size={15}
              />
              <Text>{flatDetails.m2}m2</Text>
              <Icon2
                style={FlatCardByIdStyles.icon}
                name="tape-measure"
                color="#000"
                size={15}
              />
              <View
                style={[
                  FlatCardByIdStyles.icon_container,
                  {top: -260, right: -10},
                ]}>
                <Icon3
                  name={findIcon(flatDetails._id).type}
                  color="#000"
                  size={35}
                />
                <View style={FlatCardByIdStyles.miniIcon_container}>
                  <Text>{findIcon(flatDetails._id).votes}</Text>
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

const FlatCardByIdStyles = StyleSheet.create({
  icon_container: {
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
  },
  input: {
    width: 100,
    height: 50,
    paddingLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 15,
    margin: 15,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#397ED0',
  },
  inputText: {
    paddingLeft: 20,
    fontSize: 20,
  },
  miniIcon_container: {
    width: 20,
    height: 20,
    top: -5,
    left: -5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: '#397ED0',
  },
  icon: {
    margin: 10,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  info: {
    margin: 10,
  },
  img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 250,
    height: 150,
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
