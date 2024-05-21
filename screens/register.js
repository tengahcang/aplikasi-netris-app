import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { Separator, Button, AuthTextInput, PwdInput } from "../components";
import React,{useState, useEffect} from "react";
import Firebase from '../firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },
});

const Register = ({ navigation }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [nama,setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [passwordSama, setPasswordSama] = useState(true);
  useEffect(() => {
    getUser();
  },[]);
  const getUser = async() => {
    try{
      const userData = await AsyncStorage.getItem("user-data");
      if (userData !== null) {
        navigation.replace("HomeTab");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const registerHandler = async () => { 
    if (password === confirmPassword) {
      Firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        saveUserData(email, password, userCredential);
      }).catch((error) => {
        console.error(error);
      });
    } else {
      setPasswordSama(false);
    }
  };
  const saveUserData = async (email, password, credential) => {
        const userData = { email, password, credential };
        try {
            await AsyncStorage.setItem("user-data", JSON.stringify(userData));
            saveNamaDatabase(nama,userData);
            // router.replace("/Todo");
        } catch (error) {
        console.error(error);
        }
  };
  const saveNamaDatabase = (Nama,userData) =>{
        const data = {
            Nama: Nama
        };
        const uid = userData.credential.user.uid;
        Firebase.database().ref("User/"+uid).push(data);
        navigation.replace("HomeTab")
  };

  return (
    
    <View style={styles.container}>
      {/* <ScrollView keyboardShouldPersistTaps='handled'> */}
        <View
          style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "Inter_600SemiBold",
              color: "#774494",
              fontSize: 35,
            }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              color: "#774494",
              fontSize: 15,
            }}
          >
            Create account here
          </Text>
        </View>
        {/* <ScrollView> */}
          <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
            <AuthTextInput label={"Full Name"} ph={"Enter your name"} onChangeText={(value) => setNama(value)} />
            <Separator h={20} />
            <AuthTextInput label={"Email"} ph={"Enter your email"} onChangeText={(value) => setEmail(value)} />
            <Separator h={20} />
            <PwdInput label={"Password"} onChangeText={(value) => setPassword(value)} />
            <Separator h={20} />
            <PwdInput label={"Retype Password"} onChangeText={(value) => setConfirmPassword(value)} />
          </View>
          {/* <View style={{height:40}} /> */}
          <View
            style={{ flex: 1.6, justifyContent: "center", alignItems: "center" }}
          >
            <Button left={false} op={registerHandler} text={"Register"} />
            <Separator h={15} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: "#774494",
                  fontSize: 16,
                }}
              >
                Already have account?
              </Text>
              <Separator w={4} />
              <Text
                style={{
                  fontFamily: "Inter_600SemiBold",
                  color: "#774494",
                  fontSize: 16,
                }}
              >
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        {/* </ScrollView> */}
        
      {/* </ScrollView> */}
    </View>
    
      
    
  );
};

export default Register;
