// All Logics
// import { View, Text, StyleSheet,Dimensions, Button, Image } from 'react-native'
//import React, { useState, useEffect } from 'react'
// import FilePicker from "react-native-document-picker";
// import { storage, ref1, app } from "../Firebase";
// import { ref, uploadBytesResumable, listAll, getDownloadURL } from "firebase/storage";
// import { getDatabase, set, get, child, onValue, off } from "firebase/database";

//import Pdf from 'react-native-pdf';



// const [filedata, setfiledata] = useState([]);
// //  const reference = ref(storage, "allfiles/");
//   const [imglink, setimglink] = useState(null);
//   const [name, setimgname] = useState(null);
//   const [type, setimgtype] = useState(null);  
//  // const [getfiles, setfiles] = useState([]);
//   const db = getDatabase();


  
  


  

   
//  // const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/e-share-fabcf.appspot.com/o/allfiles%2FCS5B-1.pdf?alt=media&token=c7fda4d3-2390-477f-b94e-4a01718f46a6', cache: true };
  
 
  
// //   useEffect(() => {
// //     setfiles([]);
// //     console.log(getfiles);
// //     const db = getDatabase();
// //     const reff = ref1(db, "allfiles/shabbir");

// //     console.log("startaaaa");
// //     let unsubscribe = onValue(reff, (snapshot) => {
// //       if (snapshot.exists()) {
// //         setfiles([]);
// //         //  console.log(snapshot.val());
// //         snapshot.forEach((items) => {
// //           // setfiles([]);
// //           //ye neche usestate ko do array ma slice kar daita  ha .
// //           setfiles((prev) => [...prev, items.val()]);
// //         })
// //       }

// //     })



// //     console.log("end");

// //     return (() => {
// //       unsubscribe()
// //     })

// //   }, []) 


//  const choosefile = async () => {



//     try {
//       const res = await FilePicker.pick({
//         presentationStyle: 'fullscreen'
//       });

//       setfiledata(res);
//       console.log(res[0].uri);
//       const r = await fetch(res[0].uri);
//       const b = await r.blob();
//       // console.log("After editing", url);
//       setimglink(b)
//       setimgname(res[0].name)
//       setimgtype(res[0].type)



//     } catch (error) {
//       if (FilePicker.isCancel(error)) {
//         console.log("user cancel the pick file");
//       } else {
//         throw error
//       }
//     }
//   }


//  const uploadfile = async () => {
//     console.log(name);

//     if (imglink == null) return;
//     const imgref = ref(storage, `allfiles/${name}`);
//     const Upload = await uploadBytesResumable(imgref, imglink);

//     getDownloadURL(Upload.ref).then((url) => {

//       console.log("Your File is Locating At", url);
//       uploadrealtimedata(url);

//     });

    
//   }

  

//   const uploadrealtimedata = (url) => {


//     const unique = Math.floor(Math.random() * 10000000000000);

//     set(ref1(db, 'allfiles/shabbir//' + unique), {
//       name: name,
//       type: type,
//       link: url,
//     })


//   }
















 // return (

//     <View style={styles.container} >
//       <Pdf
                    
// //                     source={{
// // uri:"content://com.android.providers.media.documents/document/document%3A140831"
// //                     }}
//                    source={source}
//                    trustAllCerts={false}
//                     onLoadComplete={(numberOfPages,filePath) => {
//                         console.log(`Number of pages: ${numberOfPages}`);
//                     }}
//                     onPageChanged={(page,numberOfPages) => {
//                         console.log(`Current page: ${page}`);
//                     }}
//                     onError={(error) => {
//                         console.log(error);
//                     }}
//                     onPressLink={(uri) => {
//                         console.log(`Link pressed: ${uri}`);
//                     }}
//                     style={styles.pdf}
//                     />
<>
      {/* <Text>App for react native</Text>
      <Button
        title="Pickfile"
        onPress={() => {
          choosefile()
        }}

      />
      <Button
        title="Upload"
        onPress={() => {
          uploadfile()
        }}

      />  */}

      {/* {

        filedata.length > 0 ? filedata.map((data, key) => (
          <View key={key}>
            <Image
              source={{
                uri: data.uri
              }}
              style={{ height: 300, width: 400, marginTop: 40 }}
            />
            <Text style={{ marginTop: 40 }}>
              {
                data.name == name ? data.name : ""


              }

            </Text>
          </View>
        ))
          : <></>

      } */}
      {/* {

        getfiles.map((data,key) => (
            
          <View key={key}>
            <Text>
              { console.log(data) }
               { data.name }
                {"\n"}
               { data.link }
               {"\n"}
            </Text>
          </View>
        ))
      } */}
 </> 
 //</View>
 

//  )
//}

//export default Digitalfilelogic;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginTop: 25,
// },
//   pdf: {
//       flex:1,
//       width:Dimensions.get('window').width,
//         height:Dimensions.get('window').height,
//   }
// });

import { View, Text } from 'react-native'
import React from 'react'

const Digitalfilelogic = () => {
  return (
    <View>
      <Text>Digitalfilelogic</Text>
    </View>
  )
}

export default Digitalfilelogic