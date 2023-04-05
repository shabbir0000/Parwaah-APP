import { View, Text, Image } from 'react-native'
import React from 'react'
import Onboardings from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import tw from "twrnc"


const Onboarding = ({ navigation }) => {
  return (
    <Onboardings
      onSkip={() => {
        navigation.navigate("login")
      }
      }
      onDone={() => {
        navigation.navigate("login")
       
      }
      }
      pages={[
        {
          backgroundColor: 'rgba(131,37,211,0.53)',
          image: < Image source={require('../Images/Assetlogo.png')} style={tw` h-20 w-36`} />,
          title: "Parwaah",
          subtitle: "Being A women Is Not Easy",
        },
        {
          backgroundColor: 'rgba(179,22,223,0.4)',

          image:
            <LottieView style={tw` h-60 -top-25 absolute`}
              source={require("../Images/97297-happy-womens-day-march-8th.json")}
              autoPlay
              loop={true}
              speed={2}
            />,

          subtitle: "Aik Aurat Rakhti Ha Sab Ka Khayal... " + "\n" + " Khud Ko CHor Kar",

        },
        {
          backgroundColor: 'rgba(236,189,250,1)',
          image: 
          <LottieView style={tw` h-60 -top-25 absolute`}
            source={require("../Images/25649-women-power.json")}
            autoPlay
            loop={true}
            speed={2}
          />,

          subtitle: "Ab Parwaah karay Ga Apki Care ... " + "\n" + "\n" + "Kahin Bhi.. Kabhi Bhi.. in Just One CLick",
        },
      ]}
    />
  )
}

export default Onboarding