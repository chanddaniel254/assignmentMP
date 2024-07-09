import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants";

interface Props {
  title: string;
  highlightPosition: number;
  highlightCount: number;
}

export default function HeaderText(props: Props) {
  const { title, highlightPosition, highlightCount } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.title.slice(0, highlightPosition)}
        <Text style={styles.blueText}>
          {props.title.slice(
            highlightPosition,
            highlightPosition + highlightCount
          )}
        </Text>
        {props.title.slice(highlightPosition + highlightCount, title.length)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
  },
  blueText: {
    color: COLOR.ROYAL_BLUE, // Ensure COLOR.ROYAL_BLUE is defined in your color file
  },
});
