import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import * as Location from "expo-location";
import MapView from "react-native-maps";

//plotting point
export default function App() {
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [coordinates, setCoordinates] = useState();
  useEffect(() => {
    (async () => {
      function setPosition({ coords: { latitude, longitude } }) {
        setLongitude(longitude);
        setLatitude(latitude);
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition(location);
    })();
  }, []);
  const coordidates = [
    {
      latitude: 10.881894,
      longitude: 106.821983,
    },
    {
      latitude: 10.888666,
      longitude: 106.824375,
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.label}>FROM</Text>
      <Text style={styles.label}>Latitude: {latitude}</Text>
      <Text style={styles.label}>Longitude: {longitude}</Text>
      <Text style={styles.label}>FROM</Text>
      <Text style={styles.label}>Latitude: 10.801713488085893</Text>
      <Text style={styles.label}>Longitude: 106.71450025404664</Text>
      <MapView
        style={styles.mapView}
        showsPointsOfInterest={true}
        showsUserLocation
        followUserLocation
      >
        <MapView.Marker
          title="Phung Quoc Hung"
          description="Somwhere near Temple of Hung King"
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
        <MapView.Marker
          title="Hutech"
          description="475A Dien Bien Phu, Binh Thanh, HCMC"
          coordinate={{
            latitude: 10.801713488085893,
            longitude: 106.71450025404664,
          }}
        />
        <MapView.Polyline
          coordinates={[
            {
              latitude: latitude,
              longitude: longitude,
            },
            {
              latitude: 10.801713488085893,
              longitude: 106.71450025404664,
            },
          ]}
          strokeColor="blue"
          strokeWidth={4}
        />
      </MapView>
    </View>
  );
}
