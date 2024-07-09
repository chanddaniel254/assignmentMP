import { Animated, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLOR } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
interface CircleProps {
  animatedValue: Animated.Value;
  inputRange: number[];
  onPress: () => void;
}
const AnimatedCircleButton = (props: CircleProps) => {
  const { animatedValue, inputRange, onPress } = props;
  const circleBackgroundColor = animatedValue.interpolate({
    inputRange,
    outputRange: [
      COLOR.ROYAL_BLUE,
      COLOR.ROYAL_BLUE,
      COLOR.ROYAL_BLUE,
      COLOR.LIGHT_BLUE,
      COLOR.LIGHT_BLUE,
    ],
  });
  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Animated.View
        style={[
          styles.circle,
          { backgroundColor: circleBackgroundColor },
          {
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AntDesign name="arrowright" size={28} color={"white"} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const CIRCLE_SIZE = 100;
const styles = StyleSheet.create({
  circleContainer: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    paddingBottom: 100,
    backgroundColor: COLOR.LIGHT_BLUE,
  },
  circleButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: COLOR.ROYAL_BLUE,
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default AnimatedCircleButton;
