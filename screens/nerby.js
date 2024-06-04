import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  TextInput
} from "react-native";
// import { TextInput } from "react-native-paper";
import { Separator, Button, AuthTextInput, PwdInput } from "../components";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE6E6'
  },
});

const Nerby = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [chooseItem, setChooseItem] = useState(0);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        setError("Error getting user location: " + error);
      }
    };
    fetchCurrentLocation();
  });

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const listTambalBan = [
    {
      id: 0,
      nama: "Tambal ban cak imin",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      latitude: -7.314237,
      longitude: 112.726615
    },
    {
      id: 1,
      nama: "Tambal ban jetis kulon",
      tipe: "Bengkel motor VIP",
      alamat: "Jl bareng cuma temen",
      latitude: -7.30857273275034,
      longitude: 112.71209368312886,
    },
    // {
    //   id: 2,
    //   nama: "Tambal ban mas bro",
    //   tipe: "Bengkel motor",
    //   alamat: "Jl bareng cuma temen",
    // },
    // {
    //   id: 3,
    //   nama: "Tambal ban sis",
    //   tipe: "Bengkel mobil",
    //   alamat: "Jl bareng cuma temen",
    // },
    // {
    //   id: 4,
    //   nama: "Tambal ban pak dono",
    //   tipe: "Bengkel mobil",
    //   alamat: "Jl bareng cuma temen",
    // },
    // {
    //   id: 5,
    //   nama: "Tambal ban banjaya",
    //   tipe: "Bengkel motor",
    //   alamat: "Jl bareng cuma temen",
    // },
    // {
    //   id: 6,
    //   nama: "Tambal ban barokah",
    //   tipe: "Bengkel motor",
    //   alamat: "Jl bareng cuma temen",
    // },
  ];
  const handlePressItem = (item) => {
    setChooseItem(item.id);
    mapRef.current.animateToRegion({
      latitude: item.latitude,
      longitude: item.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePressItem(item)}
        style={{
          height: windowHeight * 0.22,
          width: windowWidth * 0.8,
          borderRadius: 10,
          backgroundColor: index === chooseItem ? "#FFFFFF" : "#FFFFFF",
          borderWidth: 2,
          borderColor: "#A7A7A7",
          marginHorizontal: 15,
          marginVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require("../assets/tambalBan.jpg")}
          />
        </View>
        <View style={{ flex: 1.3, paddingLeft: 10, justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: "#5A1781",
            }}
          >
            {item.nama}
          </Text>
          <Separator h={3} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              // color: "#774494",
            }}
          >
            {item.tipe}
          </Text>
          <Separator h={3} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
              // color: "#774494",
            }}
          >
            {item.alamat}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={{ flex: 1,  alignItems: "center", backgroundColor: '#FFE6E6' }}>
        <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: '#5A1781', marginTop:10, }}>
          SEARCH BENGKEL LOCATION
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10,  }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderRadius: 22, overflow: 'hidden', maxWidth: '80%', backgroundColor: '#FFE6E6'  }}>
            <TextInput
              style={{
                flex: 1,
                height: 40,
                paddingHorizontal: 10,
                fontFamily: 'Inter_400Regular',
                fontSize: 16,
                color: '#E0AED0',
              }}
              placeholder="Cari bengkel..."
              placeholderTextColor="#5A1781"
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#5A1781',
                padding: 8,
                borderRadius:20,
              }}
              onPress={() => {
                // Handle search action
              }}
            >
              <Ionicons name="search-outline" size={24} color="#FFE6E6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <MapView
          ref={mapRef}
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: parseFloat(-7.3385169),
            longitude: parseFloat(112.719163),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {listTambalBan.map((location) => (
            <Marker
              key={location.id}
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={location.nama}
              description={location.alamat}
            />
          ))}
        </MapView>
      </View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center",marginBottom:7, }}
      >
        <FlatList
          data={listTambalBan}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Nerby;