import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  TextInput
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
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
  const [searchInput, setSearchInput] = useState('');
  const [filteredBengkel, setFilteredBengkel] = useState([]);

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
  }, []);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const listTambalBan = [
    { id: 0, nama: "Tambal ban cak imin", tipe: "Bengkel motor", alamat: "Jl bareng cuma temen" },
    { id: 1, nama: "Tambal ban jetis kulon", tipe: "Bengkel motor VIP", alamat: "Jl bareng cuma temen" },
    { id: 2, nama: "Tambal ban mas bro", tipe: "Bengkel motor", alamat: "Jl bareng cuma temen" },
    { id: 3, nama: "Tambal ban sis", tipe: "Bengkel mobil", alamat: "Jl bareng cuma temen" },
    { id: 4, nama: "Tambal ban pak dono", tipe: "Bengkel mobil", alamat: "Jl bareng cuma temen" },
    { id: 5, nama: "Tambal ban banjaya", tipe: "Bengkel motor", alamat: "Jl bareng cuma temen" },
    { id: 6, nama: "Tambal ban barokah", tipe: "Bengkel motor", alamat: "Jl bareng cuma temen" },
    { id: 7, nama: "Tambal ban siskasis", tipe: "Bengkel motor", alamat: "Jl bareng cuma temen" },
  ];

  useEffect(() => {
    setFilteredBengkel(listTambalBan);
  }, []);

  useEffect(() => {
    const filtered = listTambalBan.filter(bengkel =>
      bengkel.nama.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredBengkel(filtered);
  }, [searchInput]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setChooseItem(item.id)}
        style={{
          height: windowHeight * 0.22,
          width: windowWidth * 0.8,
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
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
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: "#5A1781" }}>
            {item.nama}
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
            {item.tipe}
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
            {item.alamat}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: "center", backgroundColor: '#FFE6E6' }}>
        <Text style={{ fontSize: 20, fontFamily: 'Inter_700Bold', color: '#5A1781', marginTop: 10 }}>
          CARI LOKASI BENGKEL
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderRadius: 22, overflow: 'hidden', maxWidth: '80%', backgroundColor: '#FFE6E6' }}>
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
              value={searchInput}
              onChangeText={setSearchInput}
            />
            <TouchableOpacity
              style={{ backgroundColor: '#5A1781', padding: 8, borderRadius: 20 }}
              onPress={() => {}}
            >
              <Ionicons name="search-outline" size={24} color="#FFE6E6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ flex: 3 }}>
        <MapView
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: -7.3385169,
            longitude: 112.719163,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={{ flex: 1.5, justifyContent: "center", alignItems: "center", marginBottom: 7 }}>
        <FlatList
          data={filteredBengkel}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Nerby;
