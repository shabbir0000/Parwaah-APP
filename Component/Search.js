import { View, Text , Modal ,StyleSheet} from 'react-native'
import React ,{useState} from 'react'


const Search = () => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={tw`bg-slate-700 mt-4`}></Text>

              <TouchableOpacity
                style={[styles.button1, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  modalVisible1 ? sortmonth() : choosefile(),
                    setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>{modalVisible1 ? "Sort by Month" : " Pick-File"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  modalVisible1 ? sortname() : uploadfile(),
                    setModalVisible(!modalVisible)
                }}
              >
                <Text style={styles.textStyle}>{modalVisible1 ? "Sort by Name" : " Upload-File"}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
    </View>
  )
}

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
})
export default Search

