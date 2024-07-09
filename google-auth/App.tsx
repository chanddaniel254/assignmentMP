import { useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
import { Auth, Profile } from "./screens";
import { GoogleApiResponseType } from "./types";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const [userData, setUserData] = useState<null | GoogleApiResponseType>(null);

  const handlePress = (props: GoogleApiResponseType) => {
    setUserData(props);
  };
  const handleLogout = () => {
    setUserData(null);
  };

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        {userData ? (
          <Profile logoutUser={handleLogout} userData={userData} />
        ) : (
          <Auth onSuccess={handlePress} />
        )}
        <Toast />
      </View>
    </Provider>
  );
}
