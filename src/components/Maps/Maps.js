import * as React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import FlatCardById from '../FlatCardById/FlatCardById';

function Maps({flats}) {
  const navigation = useNavigation();
  let _mapView;

  return (
    <MapView
      style={mapStyles.mapContainer}
      provider={PROVIDER_GOOGLE}
      ref={mapView => {
        _mapView = mapView;
      }}
      initialCamera={{
        center: {latitude: 41.396519, longitude: 2.197323},
        pitch: 0,
        zoom: 14,
        heading: 0,
        altitude: 0,
      }}>
      {flats.map((flatData, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: +flatData.coordinates.latitude,
            longitude: +flatData.coordinates.longitude,
          }}
          onPress={() =>
            _mapView.animateCamera({
              center: {
                latitude: +flatData.coordinates.latitude,
                longitude: +flatData.coordinates.longitude,
              },
              pitch: 0,
              zoom: 14,
              heading: 0,
              altitude: 0,
            })
          }
          title={flatData.address}>
          <Callout
            testID="mapButton"
            onPress={() =>
              navigation.navigate('Details', {flatId: flatData._id})
            }>
            <FlatCardById flatId={flatData._id} />
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}
Maps.propTypes = {
  flats: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    flats: store.flats,
    user: store.user,
  };
}

export default connect(mapStateToProps)(Maps);

const mapStyles = StyleSheet.create({
  mapContainer: {
    height: '100%',
  },
});
