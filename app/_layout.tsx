import { FontAwesome } from "@expo/vector-icons";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./home";
import { ThemeProvider, createTheme, useTheme } from "@rneui/themed";
import CityScreen from "./city";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

const Stack = createStackNavigator();

const theme = createTheme({
  lightColors: {
    primary: "#2196f3",
  },
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

function RootLayoutNav() {
  const theme = useTheme().theme;


  return (
    <NavigationContainer
      theme={{
        dark: DefaultTheme.dark,
        fonts: DefaultTheme.fonts,
        colors: {
          primary: theme.colors.primary,
          card: theme.colors.background,
          background: theme.colors.background,
          text: theme.colors.black,
          border: theme.colors.divider,
          notification: theme.colors.searchBg,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          cardStyle: { flex: 1 }
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="City"
          component={CityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
