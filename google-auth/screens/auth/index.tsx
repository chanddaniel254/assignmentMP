import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, Dimensions } from "react-native";

import { GoogleApiResponseType } from "../../types";

import {
  GOOGLE_SCOPE_EMAIL,
  GOOGLE_SCOPE_PROFILE,
  GOOGLE_WEB_CLIENT_ID,
} from "../../config";
import { HeaderText } from "../../element";
import { APP_NAME, COLOR } from "../../constants";

const { height } = Dimensions.get("screen");

interface AuthProps {
  onSuccess: (props: GoogleApiResponseType) => void;
}
export default function Auth({ onSuccess }: AuthProps) {
  GoogleSignin.configure({
    scopes: [GOOGLE_SCOPE_EMAIL, GOOGLE_SCOPE_PROFILE],
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  return (
    <LinearGradient
      start={{ x: 3, y: 2 }}
      end={{ x: 0.3, y: 0 }}
      locations={[0.2, 0.6, 0.8, 0.6]}
      colors={[
        COLOR.LIGHT_BLUE,
        COLOR.ROYAL_BLUE,
        COLOR.ROYAL_BLUE,
        COLOR.LIGHT_BLUE,
      ]}
      style={[styles.container]}
    >
      <View style={styles.emptyBox}></View>

      <HeaderText title={APP_NAME} highlightPosition={2} highlightCount={2} />
      <View style={styles.buttonContainer}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={async () => {
            try {
              await GoogleSignin.hasPlayServices();
              const userInfo = await GoogleSignin.signIn();
              const { idToken, user } = userInfo;
              if (!idToken || !user) {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Unable to Sign In!!",
                });
                return;
              }
              onSuccess({
                token: idToken,
                familyName: user.familyName || "",
                givenName: user.givenName || "",
                name: user.name || "",
                photoUrl: user.photo || "",
                email: user.email,
              });
            } catch (error: any) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Unable to Sign In!!",
              });
            }
          }}
        />
        <Text style={styles.footerText}>Terms of use</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  emptyBox: {
    position: "absolute",
    backgroundColor: COLOR.OFF_WHITE,
    width: height / 1.5,
    height: height / 2,
    top: 0,
    transform: [
      { rotate: "59deg" },
      { translateX: -123 },
      { translateY: -300 },
    ],
  },
  footerText: {
    color: COLOR.OFF_WHITE,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  buttonContainer: {
    flex: 1,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
