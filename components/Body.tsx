import React from "react";
import { View, StyleSheet } from "react-native";

function Body({ contentWidth, children }: {
  children: React.ReactNode;
  contentWidth?: number;
}) {
  const styles = StyleSheet.create({
    content: {
      maxWidth: contentWidth || 768,
      width: "100%",
      flex: 1,
    },
  });

  return (
    <View style={styles.content}>
      {children}
    </View>
  );
}


export default Body;
