import  React ,{useEffect ,useState} from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity,BackHandler, Alert } from "react-native";
import LottieView from 'lottie-react-native';
import tw from "twrnc"
import { useBackHandler } from "@react-native-community/hooks";
import NetInfo from "@react-native-community/netinfo";

const HomeScreen = ({ navigation }) => {

const [flag, setflag] = useState(true)
const [isConnected, setIsConnected] = useState(true);

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
  return ()=>{
    unsubscribe();
  }
}, [])



  const backAction = () => {
    
     if (flag) {
      
    Alert.alert("Hold on!", "Are you sure you want Exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
  return true ;
  }
  else{
   setflag(false)
  }
  
  };


  useBackHandler(backAction);

  return (
    <>
    {
      isConnected ? 
    (
    <View style={styles.homeScreenView}>

      <View style={styles.rectangleView}/>
         <TouchableOpacity
         onPress={()=>{
          navigation.navigate("profile")
         }}
         >
         <LottieView style={tw`left-32 h-20`}
              source={require("../Images/35756-user-profile-man.json")}
              autoPlay
              loop={true}
              speed={0.5}
          />
         </TouchableOpacity>


        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require("../Images/Assetlogo.png")}
        />
     


      <View style={styles.rectangleView1} />
      <Text style={styles.welcomeText}>{`Welcome!  `}</Text>
      <Text style={styles.womenAreAnImportantPartOf}>
        <Text style={styles.womenAreAn}>
          Women are an important part of society and play a vital role in its
          development.
        </Text>
      </Text>


    
      <Image
        style={styles.vectorIcon1}
        resizeMode="cover"
        source={require("../Images/logo3.png")}
      />


      <Cards
        link={require("../Images/degetalrecords.png")}
        style={styles.rectangleView2}
        textstyle={styles.digitalRecordsText}
        name={"Digital Records"}
        screen={() => {
          navigation.navigate("Digitalrecords")
        }}
      />

      <Cards
        link={require("../Images/consultant.png")}
        style={styles.rectangleView3}
        textstyle={styles.periodTrackerText}
        name={"Period tracker"}
        screen={() => {
          navigation.navigate("loading")
        }}
      />

      <Cards
        link={require("../Images/amico.png")}
        style={styles.rectangleView4}
        textstyle={styles.onlineConsultationText}
        name={"Online Consultation"}
        screen={() => {
          navigation.navigate("loading")
        }}
      />

      <Cards
        link={require("../Images/onlinestore.png")}
        style={styles.rectangleView5}
        textstyle={styles.storeText}
        name={"Store"}
        screen={() => {
          navigation.navigate("loading")
        }}
      />





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

const Cards = ({ link, style, textstyle, name, screen }) => (
  <>
    <View style={style} >
      <TouchableOpacity
        onPress={screen}
      >
        <Image
          // style={styles.fileSynchronizationamicoIcon}
          resizeMode="cover"
          source={link}
        />
      </TouchableOpacity>
    </View>
    <Text style={textstyle}>{name}</Text>
  </>
)
const styles = StyleSheet.create({
  rectangleView: {
    position: "absolute",
    height: "10%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "90%",
    left: "0%",
    backgroundColor: "rgba(131, 37, 211, 1)",
  },
  groupIcon: {
    position: "absolute",
    height: "7.75%",
    width: "94.44%",
    top: "88%",
    right: "2.78%",
    bottom: "4.25%",
    left: "2.78%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  rectangleIcon: {
    position: "absolute",
    height: "25.13%",
    width: "98.33%",
    top: "12.75%",
    right: "0.83%",
    bottom: "62.13%",
    left: "0.83%",
    borderRadius: 20,
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  rectangleView1: {
    position: "absolute",
    height: "22.63%",
    width: "92.78%",
    top: "13.5%",
    right: "3.61%",
    bottom: "63.88%",
    left: "3.61%",
    borderRadius: 20,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    backgroundColor: "rgba(131, 37, 211, 1)",
  },
  welcomeText: {
    position: "absolute",
    top: "15.25%",
    left: "26.94%",
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
  womenAreAn: {
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  womenAreAnImportantPartOf: {
    position: "absolute",
    width: "79.17%",
    top: "22.5%",
    left: "10.28%",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
  vectorIcon: {
    position: "relative",
    height: "2.05%",
    width: "5.02%",
    top: "33.04%",
    right: "8.03%",
    bottom: "64.91%",
    left: "86.94%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  groupIcon1: {
    position: "absolute",
    height: "1.13%",
    width: "9.72%",
    top: "33.5%",
    right: "45.28%",
    bottom: "65.38%",
    left: "45%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  ellipseIcon: {
    position: "relative",
    height: "25%",
    width: "11.11%",
    top: "14.25%",
    right: "8.06%",
    bottom: "90.75%",
    left: "80.83%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  vectorIcon1: {
    position: "absolute",
    height: "3.75%",
    width: "15.28%",
    top: "4.88%",
    right: "42.5%",
    bottom: "91.38%",
    left: "42.22%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  rectangleView2: {
    position: "absolute",
    height: "16%",
    width: "35.56%",
    top: "43.25%",
    right: "56.11%",
    bottom: "40.75%",
    left: "8.33%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
  },
  rectangleView3: {
    position: "absolute",
    height: "16%",
    width: "35.56%",
    top: "65.88%",
    right: "56.11%",
    bottom: "18.13%",
    left: "8.33%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
  },
  rectangleView4: {
    position: "absolute",
    height: "16%",
    width: "35.56%",
    top: "43.25%",
    right: "8.33%",
    bottom: "40.75%",
    left: "56.11%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
  },
  rectangleView5: {
    position: "absolute",
    height: "16%",
    width: "35.56%",
    top: "65.88%",
    right: "8.33%",
    bottom: "18.13%",
    left: "56.11%",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
  },
  fileSynchronizationamicoIcon: {
    position: "absolute",
    height: "13.43%",
    width: "30.49%",
    top: "44.5%",
    right: "58.67%",
    bottom: "42.07%",
    left: "10.83%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  gynecologyConsultationamicoIcon: {
    position: "absolute",
    height: "13.19%",
    width: "30.83%",
    top: "67.25%",
    right: "58.33%",
    bottom: "19.56%",
    left: "10.83%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  digitalRecordsText: {
    position: "absolute",
    height: "2.75%",
    width: "29.72%",
    top: "60.63%",
    left: "11.67%",
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#646166",
    textAlign: "center",
  },
  periodTrackerText: {
    position: "absolute",
    height: "2.63%",
    width: "32.78%",
    top: "60.63%",
    left: "57.5%",
    fontSize: 12,
    letterSpacing: 0.1,
    fontFamily: "Poppins",
    color: "#646166",
    textAlign: "center",
  },
  onlineConsultationText: {
    position: "absolute",
    width: "35.56%",
    top: "82.88%",
    left: "8.33%",
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#646166",
    textAlign: "center",
  },
  storeText: {
    position: "absolute",
    width: "25.83%",
    top: "82.88%",
    left: "61.11%",
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#646166",
    textAlign: "center",
  },
  homeScreenView: {
    position: "relative",
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 800,
  },
});

export default HomeScreen;
