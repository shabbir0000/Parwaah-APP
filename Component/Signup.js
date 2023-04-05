import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import tw from 'twrnc'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import {app ,ref1} from '../Firebase'
import { getFirestore, collection } from 'firebase/firestore/';
import { set ,getDatabase } from "firebase/database";



const Signup = ({ navigation }) => {

    const auth = getAuth();
    const user = auth.currentUser;
    const db = getDatabase(app);
    //  const db1 = getFirestore(data);
    // connectFirestoreEmulator(db, 'localhost', 8080);

   // const coll = collection(db, "users");
   




    const Validation = Yup.object().shape({
        email: Yup.string().required("Email must be filled"),
        password: Yup.string().min(5, "Min five char required").required("Password must be filled"),
    })

    const loginwithemailandpass = async (email, pass, name) => {

        


        createUserWithEmailAndPassword(auth, email, pass)
            .then((data) => {
                console.log(data.user.email)
                const unique = Math.floor(Math.random() * 10000000000000);

                set(ref1(db, "allfiles/" + data.user.uid + "//" + unique), {
                    name: "null",
                    type: "null",
                    link: "null",
                  })


                navigation.navigate("login");


                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("verification email has been sent");
                    })

            }).catch((err) => {
                console.log(err);
            })


    }





    return (

        <>

            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Validation}
                onSubmit={(values) => (
                    loginwithemailandpass(values.email, values.password)
                  //  console.log(values.name)
                )}>


                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    values,
                    isValid }) => (

                    <View style={styles.frameView}>
                        <View style={styles.loginScreenView}>
                            <Image
                                style={styles.asset31}
                                resizeMode="cover"
                                source={require("../Images/Asset9.png")}
                            />

                            <View style={styles.groupView}>
                                <Text style={styles.logInNow}>Sign-up Now</Text>
                                <Text style={styles.pleaseLoginToContinueUsing}>
                                    Please Signup to continue using our app
                                </Text>
                                {/* <View  >
                                    <TextInput
                                        placeholder="Full Name"
                                        placeholderTextColor="grey"
                                        textAlign={'center'}
                                        style={styles.rectangleView}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                </View> */}

                                <View  >
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="grey"
                                        textAlign={'center'}
                                        style={styles.rectangleView1}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                </View>
                                {errors && (<>
                                    <Text style={tw`top-6 text-red-500`}>
                                        {errors.email}
                                    </Text>
                                </>)}

                                <View  >
                                    <TextInput
                                        placeholder="Password"
                                        placeholderTextColor="grey"
                                        textAlign={'center'}
                                        secureTextEntry={true}
                                        style={styles.rectangleView3}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                </View>
                                {errors && (<>
                                    <Text style={tw` text-red-500`}>
                                        {errors.password}
                                    </Text>
                                </>)}

                            </View>
                            <View style={tw` left-28 top-480px`}>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        navigation.navigate("login")
                                    }
                                }
                            >
                        
                        
                          <Text style={tw`text-black `}>have an account? Login</Text>     
                          
                            </TouchableOpacity>
                            </View>
                            
                            <View style={styles.groupView1}>
                                <View style={styles.rectangleView2} />
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.logInText}>Signup</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </Formik>
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
        position: "absolute",
        top: "0%",
        left: "28.33%",
        fontSize: 24,
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "#000",
        textAlign: "center",
    },
    pleaseLoginToContinueUsing: {
        position: "absolute",
        top: "15.65%",
        left: "11.67%",
        fontSize: 12,
        fontFamily: "Poppins",
        color: "rgba(0, 0, 0, 0.65)",
        textAlign: "center",
    },
    rectangleView: {
        position: "relative",
        height: "45.74%",
        width: "100%",
        top: "90.09%",
        right: "0%",
        bottom: "32.17%",
        left: "0%",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 1,
        color: "black"

    },
    rectangleView1: {
        position: "relative",
        height: "45.74%",
        width: "100%",
        top: "70.26%",
        right: "0%",
        bottom: "0%",
        left: "0%",
        borderRadius: 10,
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 1,
        color: "black"
    },
    rectangleView3: {
        position: "relative",
        height: "45.74%",
        width: "100%",
        top: "45.26%",
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
        position: "absolute",
        height: "28.75%",
        width: "83.33%",
        top: "20%",
        right: "8.33%",
        bottom: "42.25%",
        left: "8.33%",
    },
    asset31: {
        position: "absolute",
        height: "5.75%",
        width: "56.94%",
        top: "5.5%",
        right: "21.67%",
        bottom: "79.75%",
        left: "21.39%",
        maxWidth: "100%",
        overflow: "hidden",
        maxHeight: "100%",

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
        //  position: "absolute",
        top: 471,
        left: 205,
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "rgba(0, 0, 0, 0.7)",
        textAlign: "left",
    },
    dontHaveAn: {
        fontWeight: "500",
        fontFamily: "Poppins",
    },
    signUPText: {
        fontWeight: "700",
        fontFamily: "Poppins",
    },
    dontHaveAnAccountSignUP: {
         position: "relative",
        top:480,
        //left: 82,
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
        position: "absolute",
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
        position: "absolute",
        top: 13,
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
        height: "6.25%",
        width: "77.78%",
        top: "50%",
        right: "11.11%",
        bottom: "28.75%",
        left: "11.11%",
    },
    loginScreenView: {
        position: "relative",
        backgroundColor: "#fff",
        width: 360,
        height: 800,
        flexShrink: 0,
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

export default Signup;
