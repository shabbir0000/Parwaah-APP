import * as React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput ,Alert } from "react-native";
import { Formik } from 'formik'
import * as Yup from 'yup'
import tw from "twrnc"
import { sendPasswordResetEmail ,getAuth} from 'firebase/auth'

const Forget = ({ navigation }) => {
    const auth = getAuth();
    const Validation = Yup.object().shape({
        email: Yup.string().email().required("Email must be filled"),
    })

    const RESETemail = async (email)=>{

        sendPasswordResetEmail(auth,email)
          .then(() => {
            Alert.alert("RESET EMAIL SEND IN YOUR SPAM SECTION IN EMAIL BOX"),
            navigation.navigate("login")
          })
          .catch((error) => {
           
            Alert.alert("some error",error);
          });
             }

    return (
<>
        <Formik
        initialValues={{ email: ""}}
        validationSchema={Validation}
        onSubmit={(values , {resetForm}) => (
            RESETemail(values.email),
            resetForm({ values: "" })
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
                    <Text style={styles.logInNow}>Forget Now</Text>
                    <Text style={styles.pleaseLoginToContinueUsing}>
                        Please Check Your Spam Box in Email
                    </Text>
                    <View  >
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
                                {errors && (<>
                                    <Text style={tw`top-10 left-2 text-red-500`}>
                                        {errors.email}
                                    </Text>
                                </>)}


                </View>
                  <View style={tw`left-28 top-460px`}>
                <TouchableOpacity
                    onPress={
                        () => {
                            navigation.navigate("login")
                        }
                    }
                >
                        <Text style={tw`text-black`}>have an account? Login</Text>
                    
                </TouchableOpacity>
                </View>

                <View style={styles.groupView1}>
                    <View style={styles.rectangleView2} />
                    <TouchableOpacity
                       onPress={handleSubmit}
>

                        <Text style={styles.logInText}>Send</Text>
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
    groupView: {
        position: "absolute",
        height: "28.75%",
        width: "83.33%",
        top: "29%",
        right: "8.33%",
        bottom: "42.25%",
        left: "8.33%",
    },
    asset31: {
        position: "absolute",
        height: "5.75%",
        width: "56.94%",
        top: "14.5%",
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
        position: "absolute",
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
        color: "grey"
    },
    dontHaveAnAccountSignUP: {
        // position: "absolute",
        top: 460,
        // left: 110,
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
        position: "absolute",
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

export default Forget;
