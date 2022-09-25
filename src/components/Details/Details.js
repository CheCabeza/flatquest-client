import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {PropTypes} from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from '../List/styles';

function Details({navigation, flats, user, route}) {
  const {flatId} = route.params;
  return (
    <SafeAreaView style={{paddingBottom: 30}}>
      <ScrollView>
        <View style={styles.page}>
          <Text style={{fontSize: 20}}>Details</Text>
          <View>
            {flats
              .filter(flatList => flatList._id === flatId)
              .map((flatDetails, index) => (
                <View style={styles.box} key={index}>
                  <Image
                    style={styles.img}
                    source={{
                      uri: `${flatDetails.photos[0]}`,
                    }}
                  />
                  <View style={styles.info}>
                    <Text>{flatDetails.address}</Text>
                    <Text>{flatDetails.neighborhood}</Text>
                    <Text>{flatDetails.price} €</Text>
                    <View style={styles.iconSection}>
                      <Text>{flatDetails.toilet} </Text>
                      <Icon
                        style={styles.icon}
                        name="bath"
                        color="#000"
                        size={25}
                      />
                      <Text>{flatDetails.rooms} </Text>
                      <Icon
                        style={styles.icon}
                        name="bed"
                        color="#000"
                        size={25}
                      />
                      <Text>{flatDetails.m2}m2</Text>
                      <Icon2
                        style={styles.icon}
                        name="tape-measure"
                        color="#000"
                        size={25}
                      />
                      <View
                        style={[styles.icon_container, {top: -85, right: -30}]}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('EditFlatReview', {
                              flatId: flatId,
                            })
                          }>
                          <Icon testID="editButton" name="plus" size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={detailStyles.detailIcons}>
                    <View style={detailStyles.prosIcons}>
                      {flatDetails.pros.map(prosValue => (
                        <Icon
                          key={prosValue}
                          style={styles.icon}
                          name={prosValue}
                          color="#2C7F42"
                          size={40}
                        />
                      ))}
                    </View>
                    <View style={detailStyles.consIcons}>
                      {flatDetails.cons.map(consValue => (
                        <Icon
                          key={consValue}
                          style={styles.icon}
                          name={consValue}
                          color="#CA0303"
                          size={40}
                        />
                      ))}
                    </View>
                  </View>
                  <View style={detailStyles.reviewSection}>
                    {flatDetails.reviews.map(reviewValue => (
                      <Text
                        key={reviewValue[0]}
                        style={detailStyles.reviewText}>
                        {reviewValue}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Details.propTypes = {
  flats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    user: store.user,
  };
}

export default connect(mapStateToProps)(Details);

const detailStyles = StyleSheet.create({
  detailIcons: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    paddingTop: 10,
    width: 300,
    borderTopWidth: 1,
    borderTopColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  prosIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  consIcons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  reviewSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  reviewText: {
    width: 300,
    height: 'auto',
    alignSelf: 'center',
    paddingLeft: 15,
    padding: 13,
    margin: 10,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#397ED0',
  },
});
