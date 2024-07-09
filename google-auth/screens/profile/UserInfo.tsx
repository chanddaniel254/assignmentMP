import { Avatar } from "react-native-paper";
import { View, Animated } from "react-native";

import { COLOR } from "../../constants";

interface UserInfoProps {
  photoUrl: string;
  name: string;
  email: string;
  animatedValue: Animated.Value;
  inputRange: number[];
}
const UserInfo = (props: UserInfoProps) => {
  const { name, email, photoUrl, animatedValue, inputRange } = props;

  const textColor = animatedValue.interpolate({
    inputRange,
    outputRange: [
      COLOR.ROYAL_BLUE,
      COLOR.ROYAL_BLUE,
      COLOR.ROYAL_BLUE,
      COLOR.OFF_WHITE,
      COLOR.OFF_WHITE,
    ],
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Avatar.Image size={100} source={{ uri: photoUrl }} />
      <View>
        <Animated.Text
          style={{
            textAlign: "center",
            color: textColor,
            fontSize: 20,
            textTransform: "capitalize",
            fontWeight: "600",
          }}
        >
          @{name}
        </Animated.Text>
        <Animated.Text
          style={{
            textAlign: "center",
            color: textColor,
          }}
        >
          {email}
        </Animated.Text>
      </View>
    </View>
  );
};

export default UserInfo;
