import { useRef, useState } from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet, Animated } from "react-native";

import UserInfo from "./UserInfo";
import { COLOR } from "../../constants";
import { GoogleApiResponseType } from "../../types";
import { AnimatedCircleButton } from "../../element";
import { useGetFakeProductsQuery } from "../../redux/fakeApi";
import FakeDataDisplay from "./fakeData";

export default function Profile({
  userData,
  logoutUser,
}: {
  userData: GoogleApiResponseType;
  logoutUser: () => void;
}) {
  const { photoUrl, name, email } = userData;
  const [index, setIndex] = useState<number>(0);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const animation = (toValue: number) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });

  const inputRange = [0, 0.001, 0.5, 0.5001, 1];
  const backgroundColor = animatedValue.interpolate({
    inputRange,
    outputRange: [
      COLOR.LIGHT_BLUE,
      COLOR.LIGHT_BLUE,
      COLOR.LIGHT_BLUE,
      COLOR.ROYAL_BLUE,
      COLOR.ROYAL_BLUE,
    ],
  });
  const handlePress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          styles.circleContainer,
          { backgroundColor },
        ]}
      >
        <UserInfo
          name={name}
          email={email}
          photoUrl={photoUrl}
          inputRange={inputRange}
          animatedValue={animatedValue}
        />

        <Button icon="logout" mode="elevated" onPress={logoutUser}>
          Logout
        </Button>
        <FakeDataDisplay />
        <AnimatedCircleButton
          inputRange={inputRange}
          onPress={handlePress}
          animatedValue={animatedValue}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    paddingBottom: 100,
    backgroundColor: COLOR.LIGHT_BLUE,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});
