import { View, Text ,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import LottieView from 'lottie-react-native';
import { useBackHandler } from "@react-native-community/hooks";
import tw from 'twrnc'


const Comingsoon = ({navigation}) => {
  const backAction = () => {
    navigation.goBack()
    return true;
  };
  useBackHandler(backAction);

  return (
   
      <>
      <View style={tw`flex-1 bg-slate-600`}>

       <TouchableOpacity  
       
      onPress={()=>{
        navigation.navigate("home");
      }}
      >
      <Image 
       style={tw`left-10 mt-8 h-8 w-5 `}
       // resizeMode="cover"
       source={require("../Images/backlogo.png")}
      />
      </TouchableOpacity>

          <LottieView style={tw`self-center mt-32 h-40`}
              source={require("../Images/113096-coming-soon.json")}
              autoPlay
              loop={true}
              speed={0.5}
          />
          </View>
      </>
  
    
    
  
  )
}

export default Comingsoon