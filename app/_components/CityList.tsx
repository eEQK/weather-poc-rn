import { CitiesApi, City } from "@/api/cities/cities";
import { ConditionsCurrent, WeatherApi } from "@/api/weather/weather";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Skeleton, Text } from "@rneui/base";
import { useTheme } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const WeatherChip = ({ icon, label }: { icon: string, label: string }) => {
  const colors = useTheme().theme.colors;

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: colors.primary + '15',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: colors.grey3
      }}
    >
      <Text style={{ color: colors.grey1 }}>
        <FontAwesome6 name={icon} size={20} /> &nbsp;
        {label}
      </Text>
    </View>
  )
}

const CurrentConditions = ({ city }: { city: City }) => {
  const [conditions, setConditions] = useState<ConditionsCurrent>();

  useEffect(() => {
    WeatherApi
      .fetchCurrentConditions(city)
      .then(conditions => {
        setConditions(conditions);
      });
  }, [])

  return (
    <View style={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
      {
        conditions ?
          <>
            <WeatherChip icon="temperature-high" label={`${conditions.temp.toFixed(0)} °C`} />
            <WeatherChip icon="child-reaching" label={`${conditions.apparentTemp.toFixed(0)} °C`} />
            <WeatherChip icon="temperature-high" label={`${conditions.precipitation.toFixed(1)} mm`} />
            <WeatherChip icon="wind" label={`${conditions.windSpeed.toFixed(1)} m/s`} />
            <WeatherChip icon="gauge" label={`${conditions.pressure.toFixed(0)} hPa`} />
          </>
          :
          <>
            <Skeleton width={80} height={26} style={{ borderRadius: 26 }} />
            <Skeleton width={80} height={26} style={{ borderRadius: 26 }} />
            <Skeleton width={80} height={26} style={{ borderRadius: 26 }} />
            <Skeleton width={80} height={26} style={{ borderRadius: 26 }} />
            <Skeleton width={80} height={26} style={{ borderRadius: 26 }} />
          </>
      }
    </View>

  )
}

const CityList = () => {
  const theme = useTheme().theme;
  const navigation = useNavigation();

  function navigateToCity(city: City) {
    navigation.navigate("City", { city });
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={CitiesApi.list}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => (
          <ListItem onPress={() => navigateToCity(item)}>
            <ListItem.Content>
              <ListItem.Title style={{ fontSize: 20, paddingBottom: 4 }}>
                {item.name}

                <Text style={{
                  paddingLeft: 8,
                  fontSize: 12,
                  color: theme.colors.grey2
                }}>
                  {item.voivodeship}
                </Text>
              </ListItem.Title>
              <ListItem.Subtitle>
                <CurrentConditions city={item} />
              </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron onPress={() => navigateToCity(item)} color={0} />
          </ListItem>
        )}
      />
    </View>
  );
};

export default CityList;
