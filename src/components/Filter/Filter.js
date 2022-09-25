import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import {View, ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import {
  filterFlats,
  filterFlatsByFace,
} from '../../redux/actions/actionCreators';
import {PropTypes} from 'prop-types';
import styles from '../List/styles';
import {connect} from 'react-redux';
import FlatCards from '../FlatCards/FlatCards';

function Filter({flats, filteredFlats, filteredByFace, dispatch}) {
  const [faceIconColor1, setfaceIconColor1] = useState(false);
  const [faceIconColor2, setfaceIconColor2] = useState(false);
  const [faceIconColor3, setfaceIconColor3] = useState(false);
  const [faceIconColor4, setfaceIconColor4] = useState(false);
  const [formValues, setFormValues] = useState({
    rooms: 1,
    baths: 1,
    neighborhood: '',
    min: 500,
    max: 1400,
  });
  useEffect(() => {
    dispatch(filterFlatsByFace([]));
    dispatch(filterFlats(formValues));
  }, [dispatch, formValues]);

  function findIcon(flatId) {
    const flat = flats.find(element => element._id === flatId).face;
    const highestRate = flat.sort(function (a, b) {
      return parseFloat(b.votes) - parseFloat(a.votes);
    });
    return {type: highestRate[0].type, votes: highestRate[0].votes};
  }

  function filterByFace(faceType) {
    let filterByFaceFlats = filteredFlats.filter(
      flat => findIcon(flat._id).type === faceType,
    );
    if (filteredByFace.includes(...filterByFaceFlats)) {
      filterByFaceFlats.map(flat => {
        filteredByFace = filteredByFace.filter(element => element !== flat);
      });
      dispatch(filterFlatsByFace([...filteredByFace]));
    } else {
      dispatch(filterFlatsByFace([...filteredByFace, ...filterByFaceFlats]));
    }
  }

  function mapNeighborhoods() {
    const neighborhoodList = [];

    flats.map(flatsData => {
      if (
        !neighborhoodList.some(item => item.label === flatsData.neighborhood) //to not repeat neighborhoods
      ) {
        neighborhoodList.push({
          label: flatsData.neighborhood,
          value: flatsData.neighborhood,
        });
      }
    });
    return neighborhoodList;
  }

  return (
    <SafeAreaView style={{paddingBottom: 30}}>
      <ScrollView>
        <View style={styles.page}>
          <View style={filterStyles.facesBox}>
            <Icon3
              testID="frownButton"
              name="frown"
              color={faceIconColor1 ? '#397ED0' : '#000'}
              size={40}
              style={{margin: 20}}
              onPress={() => {
                filterByFace('frown');
                setfaceIconColor1(!faceIconColor1);
              }}
            />
            <Icon3
              testID="mehButton"
              name="meh"
              color={faceIconColor2 ? '#397ED0' : '#000'}
              size={40}
              style={{margin: 20}}
              onPress={() => {
                filterByFace('meh');
                setfaceIconColor2(!faceIconColor2);
              }}
            />
            <Icon3
              testID="smileButton"
              name="smile"
              color={faceIconColor3 ? '#397ED0' : '#000'}
              size={40}
              style={{margin: 20}}
              onPress={() => {
                filterByFace('smile');
                setfaceIconColor3(!faceIconColor3);
              }}
            />
            <Icon3
              testID="grinButton"
              name="grin"
              color={faceIconColor4 ? '#397ED0' : '#000'}
              size={40}
              style={{margin: 20}}
              onPress={() => {
                filterByFace('grin');
                setfaceIconColor4(!faceIconColor4);
              }}
            />
          </View>
          <View style={filterStyles.filterForm}>
            <View style={filterStyles.filterInput}>
              <Icon name="bed" color="#000" size={25} />
              <RNPickerSelect
                testID="bedButton"
                style={{viewContainer: {marginTop: 15}}}
                placeholder={{}}
                onValueChange={value => {
                  setFormValues({...formValues, rooms: value});
                }}
                items={[
                  {label: '+ 1', value: '1'},
                  {label: '+ 2', value: '2'},
                  {label: '+ 3', value: '3'},
                ]}
              />
              <Icon name="chevron-down" color="#000" size={25} />
            </View>
            <View style={filterStyles.filterInput}>
              <Icon name="bath" color="#000" size={25} />
              <RNPickerSelect
                style={{viewContainer: {marginTop: 15}}}
                placeholder={{}}
                onValueChange={value =>
                  setFormValues({...formValues, baths: value})
                }
                items={[
                  {label: '+ 1', value: '1'},
                  {label: '+ 2', value: '2'},
                  {label: '+ 3', value: '3'},
                ]}
              />
              <Icon name="chevron-down" color="#000" size={25} />
            </View>
            <View style={[filterStyles.filterInput, {width: 325}]}>
              <Icon3 name="city" color="#000" size={25} />
              <RNPickerSelect
                style={{viewContainer: {marginTop: 15}}}
                placeholder={{label: 'Neighborhood', value: ''}}
                onValueChange={value =>
                  setFormValues({...formValues, neighborhood: value})
                }
                items={mapNeighborhoods()}
              />
              <Icon name="chevron-down" color="#000" size={25} />
            </View>
            <View style={[filterStyles.filterInput, {width: 325}]}>
              <Icon name="dollar" color="#000" size={25} />
              <RNPickerSelect
                style={{viewContainer: {marginTop: 15}}}
                placeholder={{label: 'min.', value: '500'}}
                onValueChange={value =>
                  setFormValues({...formValues, min: value})
                }
                items={[
                  {label: '500 €', value: '500'},
                  {label: '600 €', value: '600'},
                  {label: '700 €', value: '700'},
                  {label: '800 €', value: '800'},
                  {label: '900 €', value: '900'},
                ]}
              />
              <Icon name="chevron-down" color="#000" size={25} />
              <RNPickerSelect
                style={{viewContainer: {marginTop: 15}}}
                placeholder={{label: 'max.', value: '1400'}}
                onValueChange={value => {
                  setFormValues({...formValues, max: value});
                }}
                items={[
                  {label: '1.000 €', value: '1000'},
                  {label: '1.100 €', value: '1100'},
                  {label: '1.200 €', value: '1200'},
                  {label: '1.300 €', value: '1300'},
                  {label: '1.400 €', value: '1400'},
                ]}
              />
              <Icon name="chevron-down" color="#000" size={25} />
            </View>
          </View>
          {filteredByFace.length === 0 ? (
            <FlatCards flatStore={filteredFlats} />
          ) : (
            <FlatCards flatStore={filteredByFace} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

Filter.propTypes = {
  flats: PropTypes.array.isRequired,
  filteredFlats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    filteredFlats: store.filteredFlats,
    filteredByFace: store.filteredByFace,
    user: store.user,
  };
}

export default connect(mapStateToProps)(Filter);

const filterStyles = StyleSheet.create({
  facesBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterInput: {
    width: 150,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'space-between',
    fontSize: 25,
    margin: 13,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#397ED0',
  },
  filterForm: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
