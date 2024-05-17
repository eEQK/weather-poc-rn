import { useTheme } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AppBar = ({ title, contentWidth, leading }: {
  title: string;
  contentWidth?: number;
  leading?: React.ReactNode;
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    appBar: {
      width: "100%",
      borderBottomWidth: 1,
      backgroundColor: theme.theme.colors.background,
      borderBottomColor: theme.theme.colors.divider,
      padding: 16,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      maxWidth: contentWidth || 768,
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    title: {
      paddingHorizontal: 16,
      fontSize: 24,
      fontWeight: "normal",
    },
  });

  return (
    <View style={styles.appBar}>
      <View style={styles.content}>
        {leading}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};


export default AppBar;
