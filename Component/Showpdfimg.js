import { View, Text ,Image ,Dimensions ,StyleSheet } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Pdf from 'react-native-pdf'

const Showpdfimg = ({navigation,route}) => {

    const {link ,type} = route.params;
     console.log(link);

  return (
    <>
    {
       type.includes('image/') ? (
      <View 
       style={tw`items-center mt-52`}
      >
      <Image
              source={{
                uri: link
              }}
              style={
              {
                width: 300,
                height: 300,
                resizeMode: 'contain'
              }
           }
            />
    </View>
):(
    <>
           <Pdf
                    
                                        source={{
                    uri: link
                                        }}
                                     //  source={source}
                                       trustAllCerts={false}
                                        onLoadComplete={(numberOfPages,filePath) => {
                                            console.log(`Number of pages: ${numberOfPages}`);
                                        }}
                                        onPageChanged={(page,numberOfPages) => {
                                            console.log(`Current page: ${page}`);
                                        }}
                                        onError={(error) => {
                                            console.log(error);
                                        }}
                                        onPressLink={(uri) => {
                                            console.log(`Link pressed: ${uri}`);
                                        }}
                                        style={styles.pdf}
                                        />
    </>
)}
    </>
  )
}

export default Showpdfimg

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
},
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
  }
});