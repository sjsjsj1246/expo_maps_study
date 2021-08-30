import * as React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import useSetTimeout from "./src/util/useInterval";
import useInterval from "./src/util/useInterval";
import * as Location from "expo-location";

export default function App() {
  const [points, setPoints] = React.useState([
    { latitude: 37.627578936346175, longitude: 127.07804608199271 },
    { latitude: 37.62695983811376, longitude: 127.07614672842098 },
    { latitude: 37.626821896494256, longitude: 127.07647820012762 },
    { latitude: 37.62616230164941, longitude: 127.07684346835819 },
  ]);

  const getLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setPoints(points.concat({ latitude, longitude }));
      console.log({ latitude, longitude });
    } catch (e) {
      Alert.alert("위치정보를 가져올 수 없습니다.");
    }
  };

  useInterval(getLocation, 1000);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} showsUserLocation={true}>
        <Polyline
          coordinates={points}
          strokeWidth={10}
          strokeColor="#3035F0"
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
            "#B24112",
            "#E5845C",
          ]}
          lineCap="round"
          lineJoin="bevel"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
