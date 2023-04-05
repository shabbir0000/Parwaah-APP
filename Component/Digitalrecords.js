import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ScrollView, Modal,Alert,BackHandler } from "react-native";
import React, { useState, useEffect } from 'react'
import FilePicker from "react-native-document-picker";
import { useBackHandler } from "@react-native-community/hooks";
import { Formik } from 'formik'
import * as Yup from 'yup'
import { storage, ref1, app } from "../Firebase";
import { ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
import { getDatabase, set, onValue, orderByChild, query, startAt, endAt } from "firebase/database";
import tw from "twrnc"
import { getAuth } from 'firebase/auth'
import LottieView from 'lottie-react-native';
import Share from 'react-native-share'
import NetInfo from "@react-native-community/netinfo";




const Digitalrecords = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(true);
  const [filedata, setfiledata] = useState([]);
  //  const reference = ref(storage, "allfiles/");
  const [imglink, setimglink] = useState(null);
  const [name, setimgname] = useState(null);
  const [type, setimgtype] = useState(null);
  const [getfiles, setfiles] = useState([]);
  const [selectitem, setselectitem] = useState([]);
  const [color, setcolor] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [date, setdate] = useState("")
  const db = getDatabase(app);
  const auth = getAuth();
  const user = auth.currentUser;

  const backAction = () => {
    navigation.goBack()
    return true;
  };
  useBackHandler(backAction);


  const Validation = Yup.object().shape({
    email: Yup.string().required("name must be filled")
  })




  // const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/e-share-fabcf.appspot.com/o/allfiles%2FCS5B-1.pdf?alt=media&token=c7fda4d3-2390-477f-b94e-4a01718f46a6', cache: true };



  useEffect(() => {


    const unsubscribe1 = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      if (!state.isConnected) {
        setIsConnected(false);
      } else {
        setIsConnected(true);
      }
     
    });
    
    const date = new Date().toLocaleString();
    setdate(date);
    console.log(selectitem);
    setfiles([]);
    console.log(getfiles);
    const db = getDatabase();
    const reff = query(ref1(db, "allfiles/" + user.uid + "//"));

    console.log("startaaaa");
    let unsubscribe = onValue(reff, (snapshot) => {
      if (snapshot.exists()) {
        setfiles([]);
        //  console.log(snapshot.val());
        snapshot.forEach((items) => {
          // setfiles([]);
          //ye neche usestate ko do array ma slice kar daita  ha .
          setfiles((prev) => [...prev, items.val()].reverse());
        })
      }

    })



    console.log("end");

    return (() => {
      unsubscribe()
      unsubscribe1()
    })

  }, [])


  const sortmonth = async () => {
    setfiles([]);
    console.log(getfiles);
    const db = getDatabase();
    const reff1 = query(ref1(db, "allfiles/" + user.uid + "//"), orderByChild(date));

    console.log("startaaaa");
    onValue(reff1, (snapshot) => {
      if (snapshot.exists()) {
        setfiles([]);
        //  console.log(snapshot.val());
        snapshot.forEach((items) => {
          // setfiles([]);
          //ye neche usestate ko do array ma slice kar daita  ha .
          setfiles((prev) => [...prev, items.val()]);
        })
      }

    })



    console.log("end");
  }

  const search = async () => {
    setfiles([]);
    console.log(getfiles);
    console.log(name);
    const db = getDatabase();
    const reff1 = query(ref1(db, "allfiles/" + user.uid + "//"), orderByChild("name"), startAt(name), endAt(name + "\uF8FF"));

    console.log("startaaaa");
    onValue(reff1, (snapshot) => {
      if (snapshot.exists()) {
        setfiles([]);
        //  console.log(snapshot.val());
        snapshot.forEach((items) => {
          // setfiles([]);
          //ye neche usestate ko do array ma slice kar daita  ha .
          setfiles((prev) => [...prev, items.val()]);
        })
      }

    })



    console.log("end");
  }

  const onShare = async () => {
    const data = await selectitem.map((data) => data)
    console.log("all data", data);
    const link = selectitem.join('\r\n');
    const links = link.toString();
    console.log(links);
    const data1 = {
      urls: [links]
    }
    try {

      await Share.open(data1);
      // const result = await Share.share({
      //   message: selectitem[0]
      // });
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {

      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      alert(error.message);
    }
  };

  const sortname = async () => {
    setfiles([]);
    console.log(getfiles);
    const db = getDatabase();
    const reff1 = query(ref1(db, "allfiles/" + user.uid + "//"), orderByChild("name"));

    console.log("startaaaa");
    onValue(reff1, (snapshot) => {
      if (snapshot.exists()) {
        setfiles([]);
        //  console.log(snapshot.val());
        snapshot.forEach((items) => {
          // setfiles([]);
          //ye neche usestate ko do array ma slice kar daita  ha .
          setfiles((prev) => [...prev, items.val()]);
        })
      }

    })



    console.log("end");
  }

  const choosefile = async () => {



    try {
      const res = await FilePicker.pick({
        presentationStyle: 'fullscreen'
      });

      setfiledata(res);
      console.log(res[0].uri);

      //blob function 
      const r = await fetch(res[0].uri);
      const b = await r.blob();
      // console.log("After editing", url);
      setimglink(b)
      setimgname(res[0].name)
      setimgtype(res[0].type)



    } catch (error) {
      if (FilePicker.isCancel(error)) {
        console.log("user cancel the pick file");
      } else {
        throw error
      }
    }
  }



  const uploadfile = async () => {
    console.log(name);
    setModalVisible(!modalVisible);
    if (imglink == null) return;
    console.log(imglink);
    const imgref = await ref(storage, `allfiles/${name}`);
    console.log(imgref);

    const Upload = await uploadBytesResumable(imgref, imglink)
      .catch((error) => {
        console.log(error);
      });

    console.log("upload : ", Upload);

    getDownloadURL(Upload.ref).then((url) => {

      console.log("Your File is Locating At", url);

      uploadrealtimedata(url);


    }).catch((error) => {
      console.log("error: ", error);
    })



  }



  const uploadrealtimedata = (url) => {


    const unique = Math.floor(Math.random() * 10000000000000);

    set(ref1(db, `allfiles/${user.uid}//` + unique), {
      name: name,
      type: type,
      link: url,
      time: date,
    })


  }


  const handleLongPress = (note) => {

    if (selectitem.includes(note)) {
      const deselect = selectitem.filter((notelink) => notelink !== note);
      return setselectitem(deselect);
    }
    setselectitem([...selectitem, note])
    console.log(selectitem);
    // setselectitem([])   
  }

  const getselect = (note) => selectitem.includes(note)

  const Images = ({ name, type, link, key, time, select }) => (
    <>
      {
        type.includes('image/') && (
          <View >
            <TouchableOpacity
              onPress={() => {
                if (selectitem.length) {
                  return handleLongPress(link);

                }
                navigation.navigate("show", {
                  link,
                  type
                })
              }}
              onLongPress={() => {
                console.log("pressed photo link is :", link);
                handleLongPress(link);

              }}
            >
              <View key={key}>

                <View style={[styles.rectangleView1, { backgroundColor: `${select ? "rgba(205, 210, 241, 1)" : "rgba(220, 226, 241, 0.4)"}` }]} >
                  <Text style={styles.parwahhReportFilepdf}>{name}</Text>
                  <Text style={styles.amText}>{time}</Text>
                  <Text style={styles.kBText}>{type}</Text>
                  <View style={styles.groupView2}>
                    <Image
                      style={styles.icbaselinePictureAsPdfIcon}
                      resizeMode="cover"
                      source={{
                        uri: link
                      }}
                    />
                    <View style={styles.rectangleView2} />
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          </View>
        )}
    </>
  )

  const Pdf = ({ name, type, link, key, time, select }) => (
    <>
      {
        type.includes('application/pdf') && (
          <View>
            <TouchableOpacity
              onPress={() => {
                if (selectitem.length) {
                  return handleLongPress(link);

                }
                navigation.navigate("show", {
                  link,
                  type
                })
              }}
              onLongPress={() => {
                console.log("pdf link is :", link);
                handleLongPress(link);

              }}
            >
              <View key={key}>

                <View style={[styles.rectangleView6, { backgroundColor: `${select ? "rgba(205, 210, 241, 1)" : "rgba(220, 226, 241, 0.4)"}` }]} >
                  <Text style={styles.parwahhReportFilepdf}>{name}</Text>
                  <Text style={styles.amText}>{time}</Text>
                  <Text style={styles.kBText}>{type}</Text>
                  <View style={styles.groupView2}>
                    <Image
                      style={styles.icbaselinePictureAsPdfIcon}
                      resizeMode="cover"
                      source={{
                        uri: link
                      }}
                    />
                    <View style={styles.rectangleView2} />
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          </View>
        )}
    </>
  )




  return (
    <>    
       {
         isConnected ? 
       (
      <View style={[styles.homeScreenView, tw`${modalVisible ? `opacity-5 bg-slate-700` : `bg-white`}`]}>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            //  Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {
                modalVisible2 ? (
                  <>
                    <Text style={tw`bg-slate-700 mt-4`}></Text>

                    <TouchableOpacity
                      style={[styles.button1, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                    {
                      imglink ? (

                        <>
                        
                        </>
                      ) : (
                        <TouchableOpacity
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            modalVisible1 ?
                              (
                                sortmonth(),
                                setModalVisible(!modalVisible)
                              )
                              :
                              (
                                choosefile()

                              )
                          }}
                        >
                          <Text style={styles.textStyle}>{modalVisible1 ? "Sort by Month" : " Pick-File"}</Text>
                        </TouchableOpacity>
                      )}
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        modalVisible1 ?
                          (

                            sortname(),
                            setModalVisible(!modalVisible)

                          ) : (

                            uploadfile()

                          )

                      }}
                    >
                      <Text style={styles.textStyle}>{modalVisible1 ? "Sort by Name" : " Upload-File"}</Text>
                    </TouchableOpacity>
                  </>
                )
                  :
                  (
                    <>
                      <Formik
                        initialValues={{ email: "" }}
                        validationSchema={Validation}
                        onSubmit={(values) => (
                          console.log(values.email),
                          search(values.email),
                          setModalVisible(!modalVisible)
                        )}>


                        {({
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          errors,
                          values,
                          isValid }) => (
                          <>
                            <TextInput
                              placeholder="Search By Name"
                              placeholderTextColor="grey"
                              textAlign={'center'}
                              style={tw`border-black border text-black h-10 w-56 rounded-lg justify-center`}
                              onChangeText={handleChange('email')}
                              onBlur={handleBlur('email')}
                              value={values.email}
                            />
                            {errors && (<>
                              <Text style={tw`top-2 text-red-500`}>
                                {errors.email}
                              </Text>
                            </>)}

                            <TouchableOpacity
                              style={tw`bg-blue-600 h-8 w-24 rounded-md items-center text-center mt-8`}
                              onPress={
                                handleSubmit

                              }
                            >
                              <Text style={tw`text-center text-white mt-1`}>Search</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </Formik>
                    </>
                  )
              }
            </View>
          </View>
        </Modal>



        <View style={styles.rectangleView} />
        <Image
          style={styles.vectorIcon}
          resizeMode="cover"
          source={require("../Images/Assetlogo.png")}
        />
        <View style={styles.frameView}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("home")
            }}
          >
            <Image
              style={styles.vectorIcon1}
              resizeMode="cover"
              source={require("../Images/backlogo.png")}
            />
          </TouchableOpacity>
          <Image
            style={[styles.ellipseIcon, styles.ml243]}
            resizeMode="cover"
          //  source={require("../Images/logo3.png")}
          />
        </View>
        <Text style={styles.digitalRecordsText}>Digital Records</Text>
        <View style={styles.groupView1}>

          <View style={styles.lineView1} />
          <View style={styles.lineView2} />


          <TouchableOpacity
            onPress={() => {
              setcolor(false),
                setselectitem([])
            }}
          >
            <Text style={[styles.wordText, { color: color ? "grey" : "black" }]}>PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setcolor(true),
                setselectitem([])
            }}
          >
            <Text style={[styles.imagesText, { color: color ? "black" : "grey" }]}>IMAGES</Text>
          </TouchableOpacity>

          <View >
            <TouchableOpacity
              style={styles.groupView}
              onPress={() => { setModalVisible(true), setModalVisible1(true), setModalVisible2(true) }}
            >
              <Image
                style={styles.vectorIcon2}
                resizeMode="cover"
                source={require("../Images/Vectorsort.png")}
              />
              <Text style={styles.sortByText}>Sort by</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.groupView3}>
          <ScrollView vertical ShowsVerticalScrollIndicator={true}>
            {

              getfiles.map((data, key) => (
                <>
                  {
                    color ?
                      <Images name={data.name} type={data.type} link={data.link} key={key} time={data.time} select={getselect(data.link)} />
                      :
                      <Pdf name={data.name} type={data.type} link={data.link} key={key} time={data.time} select={getselect(data.link)} />
                  }
                </>
              ))

            }
          </ScrollView>
        </View>



        <View style={styles.lineView3} />
        <View style={styles.lineView4} />

        <TouchableOpacity
          onPress={() => { setModalVisible(true), setModalVisible2(false) }}
        >
          <View style={styles.rectangleView3} />
          <View style={tw`-top-380px absolute  left-10  w-32 h-10`}>
            <LottieView style={tw`h-12 `}
              source={require("../Images/77218-search-imm.json")}
              autoPlay
              loop={true}
              speed={0.5}
            />
          </View>
        </TouchableOpacity>

        <Image

          style={styles.vectorIcon3}
          resizeMode="cover"
        // source={require("../Images/search.png")}
        />


        <Text style={styles.todayText}>Today</Text>


        <TouchableOpacity
          style={[styles.groupView4, styles.rectangleView4]}
          onPress={
            () => {
              selectitem.length ?
                (
                  onShare()

                )
                :
                (
                  setModalVisible(true), setModalVisible1(false), setModalVisible2(true), setimglink(null)
                )

            }
          }
        >
          <Text style={styles.uploadFileText}>{selectitem.length ? "Share" : "Upload File"}</Text>
        </TouchableOpacity>


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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  modalView: {
    marginTop: 20,

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    height: 200,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button1: {
    borderRadius: 40,
    padding: 10,
    elevation: 2,
    top: -65,
    left: 120,


  },
  button: {
    // borderRadius: 40,
    padding: 10,
    elevation: 2,
    top: -80,
    marginTop: 20


  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "rgba(131, 37, 211, 1)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },



  ml243: {
    marginLeft: 243,
  },
  rectangleView: {
    position: "relative",
    height: "10%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "90%",
    left: "0%",
    backgroundColor: "rgba(131, 37, 211, 1)"
  },
  vectorIcon: {
    position: "absolute",
    height: "3.75%",
    width: "15.28%",
    top: "4.88%",
    right: "42.22%",
    bottom: "91.38%",
    left: "42.5%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  vectorIcon1: {
    position: "relative",
    width: 18,
    height: 24,
    flexShrink: 0,
  },
  ellipseIcon: {
    position: "relative",
    width: 40,
    height: 40,
    flexShrink: 0,
  },
  frameView: {
    position: "absolute",
    top: 34,
    left: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  digitalRecordsText: {
    position: "absolute",
    height: "3.75%",
    width: "41.11%",
    top: "11.75%",
    left: "29.44%",
    fontSize: 20,
    fontWeight: "300",
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "center",
  },
  lineView: {
    position: "absolute",
    top: -1,
    left: 57,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.65)",
    borderRightWidth: 1,
    width: 2,
    height: 26,
  },
  lineView1: {
    position: "absolute",
    top: 24,
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    width: 50,
    height: 0,
  },
  lineView2: {
    position: "absolute",
    top: -1,
    left: 100,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    elevation: 10,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.65)",
    borderRightWidth: 1,
    width: 2,
    height: 26,
  },
  pdfText: {
    position: "absolute",
    top: 0,
    left: 12,
    fontSize: 15,
    fontFamily: "Poppins",
    color: "#000",
    textAlign: "center",
    width: 25,
    height: 24,
  },
  wordText: {
    position: "absolute",
    top: 0,
    left: 40,
    fontSize: 15,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    width: 42,
    height: 24,
  },
  imagesText: {
    position: "absolute",
    top: 0,
    left: 120,
    fontSize: 15,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    width: 59,
    height: 24,
  },
  vectorIcon2: {
    position: "relative",
    height: "62.5%",
    width: "85.71%",
    top: "0%",
    right: "7.14%",
    bottom: "37.5%",
    left: "7.14%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  sortByText: {
    position: "absolute",
    top: 18.75,
    left: 0,
    fontSize: 8,
    fontFamily: "Poppins",
    color: "#6e7179",
    textAlign: "center",
    width: 30,
    height: 11.25,
  },
  groupView: {
    position: "relative",
    height: "100%",
    width: "10.56%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "89.44%",
  },
  groupView1: {
    position: "absolute",
    top: 150,
    left: 38,
    width: 284,
    height: 30,
  },
  rectangleView1: {
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 5,
    // backgroundColor: "rgba(220, 226, 241, 0.4)",
    width: 300,
    height: 50,
    marginTop: 10,
    // paddingBottom:20

  }, rectangleView6: {
    position: "relative",
    top: 0,
    left: 0,
    borderRadius: 5,
    // backgroundColor: "rgba(220, 226, 241, 0.4)",
    width: 300,
    height: 50,
    marginTop: 10,
    // paddingBottom:20

  },
  parwahhReportFilepdf: {
    position: "relative",
    top: 4,
    left: 66,
    fontSize: 15,
    fontFamily: "Poppins",
    color: "#000",
    textAlign: "left",
  },
  amText: {
    position: "relative",
    top: 10,
    left: 66,
    fontSize: 10,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.5)",
    // textAlign: "center",
  },
  kBText: {
    position: "relative",
    top: -4,
    left: 200,
    fontSize: 10,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.5)",
    // textAlign: "center",
  },
  icbaselinePictureAsPdfIcon: {
    position: "relative",
    top: -45,
    left: 2.52,
    width: 34.44,
    height: 33.6,
    overflow: "hidden",
  },
  rectangleView2: {
    position: "relative",
    top: 0,
    left: 0,
    width: 42,
    height: 42,
  },
  groupView2: {
    position: "relative",
    top: 4,
    left: 10,
    width: 42,
    height: 42,
  },
  groupView3: {
    position: "relative",
    top: 200,
    left: 30,
    width: 300,
    height: 500,
    marginTop: 10,
    paddingBottom: 70,
  },
  lineView3: {
    position: "absolute",
    top: 132,
    left: -2,
    shadowColor: "#dce2f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderTopWidth: 2,
    width: 364,
    height: 4,
  },
  lineView4: {
    position: "absolute",
    top: 187,
    left: -2,
    shadowColor: "#dce2f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderTopWidth: 2,
    width: 364,
    height: 4,
  },
  rectangleView3: {
    position: "absolute",
    top: -380,
    left: 30,
    borderRadius: 50,
    backgroundColor: "rgba(220, 226, 241, 0.4)",
    width: 190,
    height: 40,

  },
  rectangleView4: {
    position: "absolute",
    top: 206,
    left: 229,
    borderRadius: 5,
    width: 101,
    height: 40,
    backgroundColor: "rgba(131, 37, 211, 1)"
  },
  searchText: {
    position: "relative",
    top: 70,
    left: 95,
    fontSize: 15,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    width: 55,
    height: 24,
  },
  vectorIcon3: {
    position: "relative",
    height: "2.9%",
    width: "6.44%",
    top: "-56.2%",
    right: "80.25%",
    bottom: "70.24%",
    left: "50.31%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",
  },
  todayText: {
    position: "absolute",
    top: 263,
    left: 30,
    fontSize: 10,
    fontFamily: "Poppins",
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: "left",
  },
  vectorIcon4: {
    position: "absolute",
    height: "77.78%",
    width: "16.87%",
    top: "11.11%",
    right: "83.13%",
    bottom: "11.11%",
    left: "0%",
    maxWidth: "100%",
    overflow: "hidden",
    maxHeight: "100%",

  },

  uploadFileText: {
    position: "relative",
    top: 12,
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#fff",
    textAlign: "center",
  },
  groupView4: {
    position: "absolute",
    height: "2.25%",
    width: "23.06%",
    top: "27.13%",
    right: "10.83%",
    bottom: "70.63%",
    left: "66.11%",

  },
  homeScreenView: {
    position: "relative",
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 800,
  },
});

export default Digitalrecords;
