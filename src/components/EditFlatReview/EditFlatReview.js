import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {PropTypes} from 'prop-types';
import {flatReview} from '../../redux/actions/actionCreators';
import styles from '../List/styles';
import {TextInput} from 'react-native-gesture-handler';

function EditFlatReview({flats, user, route, dispatch}) {
  const [proReviews, setProReviews] = useState([]);
  const [consReviews, setConsReviews] = useState([]);
  const [textReviews, setTextReviews] = useState('');
  const [currentFace, setCurrentFace] = useState({});
  const {flatId} = route.params;
  const currentFlat = flats.filter(flatList => flatList._id === flatId)[0];
  let pros = ['bus', 'thermometer', 'volume-off', 'wifi'];
  let cons = ['euro', 'snowflake-o', 'volume-up', 'wrench'];

  function changeIconColor(hookType, type) {
    let iconColor;
    !hookType.includes(type) ? (iconColor = '#000') : (iconColor = '#397ED0');
    return iconColor;
  }

  function changeFaceColor(type) {
    let faceColor;
    currentFace === currentFlat.face.filter(face => face.type === type)[0]
      ? (faceColor = '#397ED0')
      : (faceColor = '#000');
    return faceColor;
  }

  function handleConsReviews(consData) {
    !consReviews.includes(consData)
      ? setConsReviews([...consReviews, consData])
      : setConsReviews(consReviews.filter(item => item !== consData));
  }

  function handleProReviews(proData) {
    !proReviews.includes(proData)
      ? setProReviews([...proReviews, proData])
      : setProReviews(proReviews.filter(item => item !== proData));
  }

  function handleEditFace(faceType) {
    setCurrentFace(currentFlat.face.filter(face => face.type === faceType)[0]);
  }

  function submitReview() {
    currentFace.votes++;
    dispatch(
      flatReview({
        id: flatId,
        pros: [...currentFlat.pros, ...proReviews],
        cons: [...currentFlat.cons, ...consReviews],
        reviews: [...currentFlat.reviews, textReviews],
        face: [...currentFlat.face],
      }),
    );
  }
  return (
    <ScrollView>
      <View style={styles.page}>
        <Text style={{marginTop: 40, fontSize: 20}}>Edit Flat</Text>
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
                  </View>
                </View>
                <View style={editFlatStyles.facesBox}>
                  <Icon3
                    name="frown"
                    size={40}
                    style={{margin: 20}}
                    color={changeFaceColor('frown')}
                    onPress={() => {
                      handleEditFace('frown');
                    }}
                  />
                  <Icon3
                    name="meh"
                    size={40}
                    style={{margin: 20}}
                    color={changeFaceColor('meh')}
                    onPress={() => {
                      handleEditFace('meh');
                    }}
                  />
                  <Icon3
                    name="smile"
                    size={40}
                    style={{margin: 20}}
                    color={changeFaceColor('smile')}
                    onPress={() => {
                      handleEditFace('smile');
                    }}
                  />
                  <Icon3
                    name="grin"
                    size={40}
                    style={{margin: 20}}
                    color={changeFaceColor('grin')}
                    onPress={() => {
                      handleEditFace('grin');
                    }}
                  />
                </View>
                <View style={editFlatStyles.detailIcons}>
                  <View style={editFlatStyles.prosIcons}>
                    {flatDetails.pros.map((proData, prosIndex) => (
                      <Icon
                        key={prosIndex}
                        style={styles.icon}
                        color="#2C7F42"
                        name={proData}
                        size={40}
                      />
                    ))}
                    {pros
                      .filter(x => !flatDetails.pros.includes(x))
                      .map((proData, FlatDetailsProsIndex) => (
                        <Icon
                          key={FlatDetailsProsIndex}
                          style={styles.icon}
                          color={changeIconColor(proReviews, proData)}
                          name={proData}
                          size={40}
                          onPress={() => handleProReviews(proData)}
                        />
                      ))}
                  </View>
                  <View style={editFlatStyles.consIcons}>
                    {flatDetails.cons.map((consData, consIndex) => (
                      <Icon
                        key={consIndex}
                        style={styles.icon}
                        color="#CA0303"
                        name={consData}
                        size={40}
                      />
                    ))}
                    {cons
                      .filter(x => !flatDetails.cons.includes(x))
                      .map((consData, flatDetailsConsIndex) => (
                        <Icon
                          key={flatDetailsConsIndex}
                          style={styles.icon}
                          color={changeIconColor(consReviews, consData)}
                          name={consData}
                          size={40}
                          onPress={() => handleConsReviews(consData)}
                        />
                      ))}
                  </View>
                </View>
                <View>
                  <TextInput
                    style={[styles.input, editFlatStyles.editInput]}
                    onChangeText={search => setTextReviews(search)}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => submitReview()}>
                    <Text style={styles.text}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

EditFlatReview.propTypes = {
  flats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    user: store.user,
  };
}

export default connect(mapStateToProps)(EditFlatReview);

const editFlatStyles = StyleSheet.create({
  detailIcons: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    width: 300,
  },
  editInput: {
    fontSize: 15,
    textAlign: 'left',
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
  facesBox: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#C4C4C4',
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
});
