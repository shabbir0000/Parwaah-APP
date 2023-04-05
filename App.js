import { View, Text ,ActivityIndicator,BackHandler, Alert } from 'react-native'
import React , {useEffect , useState} from 'react'
import Navigationscreen from "./Navigationscreen"
import Navigation from './Navigation'
import { app } from './Firebase'
import {getAuth, onAuthStateChanged} from "firebase/auth"
import AsyncStorage from '@react-native-async-storage/async-storage'
import SplashScreen from 'react-native-splash-screen'
import tw from 'twrnc'
import Navigationlogin from './Navigationlogin'

//import { useBackHandler } from "@react-native-community/hooks";

const App = () => {

  const [firstLaunch, setFirstLaunch] = useState(null);
  const [islogin, setislogin] = useState(null);

  const setData= async ()=> {
    const appData = await AsyncStorage.getItem("appLaunched");
     
    console.log(appData);
    console.log("login",islogin);
    if (appData == null) {
      setFirstLaunch(true);
      AsyncStorage.setItem("appLaunched", "true");
    } else {
      setFirstLaunch(false);
    }
  }

  const auth = getAuth(app);


  const Islogin = async ()=>{
  const appData = await AsyncStorage.getItem("islogin");
  console.log("logindata" ,appData);
  if (appData === "null") {
    
    setislogin(false);
   // AsyncStorage.setItem("appLaunched", "true");
  } else if (appData === "true") {
    setislogin(true)
  } else {
    setislogin(false);
  }

  }


  useEffect(() => {
    Islogin();
    setData();
    
    SplashScreen.hide();

}, [islogin]);

if (firstLaunch == null) {
  return (
    <View style={tw`flex-1 bg-white`}>
    <View style={tw` mt-96`}>
    <ActivityIndicator size="large" />
  </View>
  </View>
  )
 
} else if (firstLaunch == true) { 
  console.log("alinotnull");
  return (
  <Navigationscreen/> 
)

}

else if (firstLaunch == false) {
return(
  <>
{
  islogin ? (
     <>
      <Navigationlogin/>
     </>
  ):
  (
    <>
      <Navigation/>
    </>
  )
}
</>
)
}
}
export default App;