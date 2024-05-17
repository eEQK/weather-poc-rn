import AppBar from "@/components/AppBar";
import { Text } from "@rneui/base";
import Body from "@/components/Body";
import CityList from "./_components/CityList";
import Screen from "@/components/Screen";

export default function HomeScreen() {

  return (
    <Screen>
      <AppBar
        title="Weather app"
        leading={<Text style={{ fontSize: 32 }}>⛅</Text>}
      />
      <Body>
        <CityList />
      </Body>
    </Screen>
  );
}

