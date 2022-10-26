import {
    StyleSheet,
  } from "react-native";
import { mainColor, secondaryColor } from "./constant";


export default StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        },
        image: {
          marginBottom: 40,
          position: "relative",
          marginHorizontal: "auto",
          alignItems: "center",
          textAlign: "center",
          width: 50,
          height: 50
        },
        h1: {
          fontSize: 18,
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 10
        },
        inputView: {
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 10,
          width: "90%",
          height: 45,
          marginTop: 10,
        },
        TextInput: {
          height: 50,
          flex: 1,
          padding: 10,
        },
        forgot_button: {
          height: 30,
          marginBottom: 30,
          marginTop: 10,
        },
        margingTop5: {
          marginTop: 10,
        } ,
      
        loginBtn: {
          width: "90%",
          borderRadius: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          backgroundColor: mainColor,
          color: "#fff"
        },
        registerBtn :{
          width: "50%",
          borderRadius: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          backgroundColor: secondaryColor,
          color: "#fff"
        },
        loginText: {
          color: "#fff"
        },
        avatarImage:{
          resizeMode: 'contain',
          alignSelf: 'center',
          justifyContent: "center",
          borderRadius: 50,
          marginBottom: 20,
          alignItems: "center",
          textAlign: "center",
          width: 100,
          height: 100
        },
        buttonStyle: {
          alignItems: 'center',
          backgroundColor: '#DDDDDD',
          padding: 10,
          width: '100%',
          marginTop: 16,
        },
        title1: {
            textAlign: 'center',
            fontWeight: 'bold'
        },
        navigationBar: {
            justifyContent: 'center',
            flex: 1,
            padding: 0,
        },
        validationTextError :{
          justifyContent: 'flex-start',
          color: "red",
          textAlign : "left"
        },
  
        homeContainer: {
          justifyContent: 'center',
          flex: 1,
          padding: 30,
      },
    });