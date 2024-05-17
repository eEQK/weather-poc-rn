import React from "react";
import { View, StyleSheet } from "react-native";

function Screen({ children }: {
  children: React.ReactNode;
}) {
  const styles = StyleSheet.create({
    headerLeading: {
      fontSize: 32,
      paddingLeft: 24,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}


export default Screen;
