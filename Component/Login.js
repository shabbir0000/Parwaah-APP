import  React ,{useEffect,useState} from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput,Alert,BackHandler } from "react-native";
import { Formik } from 'formik'
import * as Yup from 'yup'
import tw from 'twrnc'
import { app } from "../Firebase";
import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo";


const Login = ({ navigation }) => {

    const Validation = Yup.object().shape({
        email: Yup.string().email().required("Email must be filled"),
        password: Yup.string().min(5, "Min five char required").required("Password must be filled"),

    })
    const [isConnected, setIsConnected] = useState(true);

    const auth = getAuth(app);
    // const user = auth.currentUser;

    const loginwithemailandpass = async (email, pass) => {
        try {
            signInWithEmailAndPassword(auth, email, pass)
                .then((data) => {
                    AsyncStorage.setItem("islogin", "true");
                    console.log(data.user.accessToken);
                    navigation.navigate("home");
                })
                .catch((error) => {
                    Alert.alert(error.message)
                });

        } catch (error) {
            Alert.alert("Plzz Enter Valid Email Or Pass");
        }
    }

   

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

   // const auth = getAuth(app);
//     const Islogin = async ()=>{
//         const appData = await AsyncStorage.getItem("islogin");
//          onAuthStateChanged(auth, (user) => {
//     if (user.accessToken) {
//       console.log("2",appData);
//       if (appData == true) {
//         setislogin(true);
//         AsyncStorage.setItem("islogin","true");
//       } else {
//         setislogin(false);
//       }
//     console.log(user.accessToken);
//     console.log(user);
//      // setislogin(true)
//       // ...
//     // } else {
//     //   // User is signed out
//     //   // ...
//     // //  console.log(user);
//     //   setislogin(false)
//     // }
//     }
//   })
//     }



    return (
        <>
       
    {
      isConnected ? 
    (
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Validation}
                onSubmit={(values, { resetForm }) => (
                    loginwithemailandpass(values.email, values.password),
                    resetForm({ values: "" })
                )}

            >


                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    values,
                    isValid }) => (


                    
                    <View style={styles.frameView}>
                        <View style={styles.loginScreenView}>
                            <View style={{alignItems:"center",top:90}}>
                            <Image
                                style={styles.asset31}
                                resizeMode="cover"
                                source={require("../Images/Asset9.png")}
                            />
                            </View>

                            <View style={styles.groupView}>
                                <Text style={styles.logInNow}>Log In Now</Text>
                                <Text style={styles.pleaseLoginToContinueUsing}>
                                    Please login to continue using our app
                                </Text>
                            </View>

                            <View style={{alignItems:"center" ,top:-70}} >
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="grey"
                                    textAlign={'center'}
                                    style={styles.rectangleView}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                />

                            </View>

                            <View>
                            {errors && (<>
                                <Text style={tw` -top-70 left-10 text-red-500`}>
                                    {errors.email}
                                </Text>
                            </>)}
                            </View>

                            <View style={{alignItems:"center"}} >
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="grey"
                                    textAlign={'center'}
                                    secureTextEntry={true}
                                    style={styles.rectangleView1}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />

                            </View>
                            <View >
                            {errors && (<>
                                <Text style={tw`-top-103 left-10 text-red-500`}>
                                    {errors.password}
                                </Text>
                            </>)}
                            </View>

                             <View style={{top:-440}}>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        navigation.navigate("forget")
                                    }
                                }
                            >
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                            </View>
                             <View  style={tw` left-20 -top-350px`}>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        navigation.navigate("signup")
                                    }
                                   
                                }
                              
                            >
                                {/* <Text style={styles.dontHaveAnAccountSignUP}> */}
                                    {/* <Text style={styles.dontHaveAn}>{`Don’t have an account?  `}</Text> */}
                                    <Text   style={tw`text-gray-500 `}>Don’t have an account? SignUP</Text>
                                {/* </Text> */}
                            </TouchableOpacity>
                            </View>

                            <View  >
                                
                                <TouchableOpacity

                                    onPress={handleSubmit}
                                    style={[styles.rectangleView2, styles.groupView1]}
                                >
                                    <Text style={styles.logInText}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
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
    antDesigneyeInvisibleOutliIcon: {
        position: "absolute",
        top: 425,
        left: 295,
        width: 24,
        height: 24,
        overflow: "hidden",
    },
    logInNow: {
        position: "relative",
        top: "0%",
     //   left: "28.33%",
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "#000",
        textAlign: "center",
    },
    pleaseLoginToContinueUsing: {
        position: "relative",
      //  top: "15.65%",
       // left: "11.67%",
        fontSize: 12,
        fontFamily: "Poppins",
        color: "rgba(0, 0, 0, 0.65)",
        textAlign: "center",
    },
    rectangleView: {
        position: "relative",
        height: "25.74%",
        width: "80%",
      //  top: "90.09%",
        right: "0%",
        bottom: "32.17%",
        left: "0%",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 1,
        color: "black",
        

    },
    rectangleView1: {
        position: "relative",
        height: "25.74%",
        width: "80%",
        top: "-130.26%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 1,
        color: "black"
    },
    groupView: {
      //  position: "relative",
        height: "28.75%",
        width: "83.33%",
        top: "0%",
        right: "8.33%",
        bottom: "42.25%",
        left: "8.33%",
    },
    asset31: {
        position: "relative",
        height: "25.75%",
        width: "65.94%",
      //  top: "10.5%",
      //  right: "21.67%",
        //bottom: "79.75%",
      //  left: "21.39%",
        maxWidth: "100%",
       // overflow: "hidden",
     //   maxHeight: "100%",
       
    },
    emailText: {
        position: "absolute",
        top: 340,
        left: 42,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "rgba(0, 0, 0, 0.4)",
        textAlign: "left",
    },
    forgotPasswordText: {
        position: "relative",
      //  top: -220,
        left: -35,
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "rgba(0, 0, 0, 0.7)",
        textAlign: "right",
    },
    dontHaveAn: {
        fontWeight: "500",
        fontFamily: "Poppins",
    },
    signUPText: {
        fontWeight: "700",
        fontFamily: "Poppins",
        Color: "black"
    },
    dontHaveAnAccountSignUP: {
      position: "relative",
        top: -350,
        fontSize: 15,
        color: "rgba(0, 0, 0, 0.7)",
        textAlign: "center",
    },
    passwordText: {
        position: "absolute",
        top: 425,
        left: 42,
        fontSize: 16,
        fontFamily: "Poppins",
        color: "rgba(0, 0, 0, 0.4)",
        textAlign: "left",
    },
    rectangleView2: {
        position: "relative",
        height: "100%",
        width: "100%",
        top: "0%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        borderRadius: 5,
        borderColor: "8325D3",
        backgroundColor: "rgba(131, 37, 211, 1)"
    },
    logInText: {
        position: "relative",
        top: 10,
        left: 70,
        fontSize: 20,
        fontWeight: "500",
        fontFamily: "Inter",
        color: "#fff",
        textAlign: "center",
        width: 140.4,
    },
    groupView1: {
        position: "relative",
        height: "25.25%",
        width: "77.78%",
        top: "-215%",
        right: "11.11%",
        bottom: "28.75%",
        left: "11.11%",
    },
    loginScreenView: {
        position: "relative",
        backgroundColor: "#fff",
        width: 360,
        height: 800,
        
    },
    frameView: {
       position: "relative",
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
});

export default Login;
