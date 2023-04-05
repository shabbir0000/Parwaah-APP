import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useBackHandler } from "@react-native-community/hooks";
import LottieView from 'lottie-react-native';
import tw from "twrnc"
import { app } from "../Firebase";
import { getAuth, sendPasswordResetEmail, signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo";

const Profile = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(true);
  const auth = getAuth();
  const getinfo = auth.currentUser;

  useEffect(() => {

    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (!state.isConnected) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }

    });

    // Unsubscribe
    return () => {
      unsubscribe();
    }
  }, [])

  const RESETemail = () => {

    sendPasswordResetEmail(auth, getinfo.email)
      .then(() => {
        Alert.alert("RESET EMAIL SEND IN YOUR SPAM SECTION IN EMAIL BOX")
      })
      .catch((error) => {

        Alert.alert("some error", error);
      });
  }

  const signout = async () => {
    try {
      signOut(auth);
      await AsyncStorage.removeItem("islogin");

      navigation.navigate("login");


    }
    catch (error) {
      Alert.alert("Error", error)
    }
  }


  const backAction = () => {
    navigation.goBack()
    return true;
  };
  useBackHandler(backAction);


  return (
    <>

      {
        isConnected ?
          (
            <View style={styles.viewProfileScreen}>


              <View style={styles.rectangleView} />
              <Text style={styles.profileText}>PROFILE</Text>
              <TouchableOpacity
                style={styles.vectorIcon}
                onPress={() => {
                  navigation.navigate("home");
                }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../Images/backlogo.png")}
                />
              </TouchableOpacity>





              <View style={styles.rectangleView1} />
              {/* <Text style={styles.hadiqamemonText}>@hadiqamemon</Text>
      <Text style={styles.hadiqaJanText}>{`Hadiqa Jan `}</Text> */}

              <LottieView style={tw`mt-20 left-10 h-28`}
                source={require("../Images/35756-user-profile-man.json")}
                autoPlay
                loop={true}
                speed={0.5}
              />

              <TouchableOpacity style={styles.rectangleView2}
                onPress={() => {
                  Alert.alert("NOTIFICATION ALWAYS ON. " + "\n" + "BY THE RULES OF THE APP")
                }}
              >
                <View >
                  <Text style={styles.notificationsText}>Notifications</Text>
                  <Image
                    style={styles.claritynotificationSolidIcon}
                    resizeMode="cover"
                    source={require("../Images/notiicon.png")}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.rectangleView7} />



              <TouchableOpacity
                style={styles.rectangleView3}
                onPress={() => {
                  RESETemail();
                }}
              >
                <Text style={styles.changePasswordText}>Change Password</Text>
                <Image
                  style={styles.bxslockIcon}
                  resizeMode="cover"
                  source={require("../Images/lock.png")}
                />
              </TouchableOpacity>


              {/* <TouchableOpacity style={styles.rectangleView4} >
      <Text style={styles.settingsText}>Settings</Text>
      <Image
        style={styles.evasettingsFillIcon}
        resizeMode="cover"
       source={require("../Images/setting.png")}
      />
      </TouchableOpacity> */}


              <TouchableOpacity
                style={styles.rectangleView5}
                onPress={() => {
                  signout();
                }}
              >
                <Text style={styles.signOutText}>Sign Out</Text>
                <Image
                  style={styles.uilsignOutAltIcon}
                  resizeMode="cover"
                  source={require("../Images/signout.png")}
                />
              </TouchableOpacity>
              {/* <View style={styles.rectangleView6} /> */}


            </View>
          )
          :
          (
            Alert.alert("Hold on!", "First Established Your Internet Connection", [
              { text: "Exit", onPress: () => BackHandler.exitApp() }
            ])
          )
      }
    </>
  );
};


const styles = StyleSheet.create({
  rectangleView: {
    position: "absolute",
    height: "35%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "65%",
    left: "0%",
    backgroundColor: "rgba(131, 37, 211, 1)",
  },
  vectorIcon: {
    position: "absolute",
    height: "5%",
    width: "8%",
    top: "5.25%",
    right: "86.67%",
    bottom: "91.75%",
    left: "8.33%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  profileText: {
    position: "absolute",
    top: 42,
    left: 154,
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",

  },
  rectangleView1: {
    position: "absolute",
    top: 133,
    left: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    width: 300,
    height: 195,

  },
  rectangleView2: {
    position: "absolute",
    top: 369,
    left: 29,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(100, 97, 102, 0.3)",
    borderWidth: 1,
    width: 302,
    height: 52,

  },
  rectangleView3: {
    position: "absolute",
    top: 440,
    left: 29,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(100, 97, 102, 0.3)",
    borderWidth: 1,
    width: 302,
    height: 52,

  },
  rectangleView4: {
    position: "absolute",
    top: 511,
    left: 29,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(100, 97, 102, 0.3)",
    borderWidth: 1,
    width: 302,
    height: 52,

  },
  rectangleView5: {
    position: "absolute",
    top: 635,
    left: 29,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(100, 97, 102, 0.3)",
    borderWidth: 1,
    width: 302,
    height: 52,

  },
  ellipseIcon: {
    position: "absolute",
    height: "11.25%",
    width: "25%",
    top: "18.5%",
    right: "37.5%",
    bottom: "70.25%",
    left: "37.5%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",

  },
  hadiqamemonText: {
    position: "absolute",
    top: 278,
    left: 128,
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#7b7b7b",
    textAlign: "center",
  },
  hadiqaJanText: {
    position: "absolute",
    top: 248,
    left: 133,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#000",
    textAlign: "center",
  },
  notificationsText: {
    position: "relative",
    top: 15,
    left: 70,
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#000",
    //  textAlign: "center",

  },
  changePasswordText: {
    position: "absolute",
    top: 14,
    left: 68,
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#000",
    textAlign: "center",
  },
  settingsText: {
    position: "absolute",
    top: 15,
    left: 68,
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#000",
    textAlign: "center",
  },
  vectorIcon1: {
    position: "absolute",
    height: "2.5%",
    width: "5.56%",
    top: "18.5%",
    right: "13.33%",
    bottom: "79%",
    left: "81.11%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  evasettingsFillIcon: {
    position: "absolute",
    top: 15,
    left: 19,
    width: 25,
    height: 25,
    overflow: "hidden",
  },
  bxslockIcon: {
    position: "absolute",
    top: 14,
    left: 19,
    width: 25,
    height: 25,
    overflow: "hidden",
  },
  claritynotificationSolidIcon: {
    position: "relative",
    top: -9,
    left: 20,
    width: 25,
    height: 25,
    overflow: "hidden",
  },
  signOutText: {
    position: "absolute",
    top: 15,
    left: 68,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#646166",
    textAlign: "center",
  },
  uilsignOutAltIcon: {
    position: "absolute",
    top: 10,
    left: 19,
    width: 30,
    height: 30,
    overflow: "hidden",
  },
  rectangleView6: {
    position: "absolute",
    top: 383,
    left: 267,
    borderRadius: 100,
    borderStyle: "solid",
    borderColor: "#646166",
    borderWidth: 2,
    width: 49,
    height: 24,
  },
  rectangleView7: {
    position: "absolute",
    top: 386,
    left: 292,
    borderRadius: 100,
    backgroundColor: "#8325d3",
    width: 18,
    height: 18,

  },
  groupIcon: {
    position: "absolute",
    top: 704,
    left: 10,
    width: 340,
    height: 62,
  },
  viewProfileScreen: {
    position: "relative",
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 800,

  },
});

export default Profile;
