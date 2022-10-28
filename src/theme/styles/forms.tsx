import {
    StyleSheet,
  } from "react-native";
import { mainColor, secondaryColor } from "../constant";


export default StyleSheet.create({
        formInputView: {
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 10,
          width: "90%",
          height: 45,
          marginTop: 10,
        },
        formTextInput: {
          height: 50,
          flex: 1,
          padding: 10,
          fontFamily: "Raleway_400Regular",
        },
        forgot_button: {
          height: 30,
          marginBottom: 30,
          marginTop: 10,
        },
        margingTop5: {
          marginTop: 10,
        },
        loginBtn: {
          width: "90%",
          borderRadius: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          backgroundColor: mainColor,
          fontFamily: "Raleway_400Regular",
          color: "#fff"
        },
        registerBtn :{
          width: "50%",
          borderRadius: 10,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Raleway_400Regular",
          marginTop: 10,
          backgroundColor: secondaryColor,
          color: "#fff"
        },
        loginText: {
          color: "#fff"
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

