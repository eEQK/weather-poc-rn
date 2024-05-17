import { City } from "@/api/cities/cities";
import { ConditionsHourly, WeatherApi } from "@/api/weather/weather";
import AppBar from "@/components/AppBar";
import Body from "@/components/Body";
import Screen from "@/components/Screen";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base"
import { Chart } from "chart.js/auto";
import moment from "moment";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const CityView = ({ city }: { city: City }) => {
  const [hourlyConditions, setHourlyConditions] = useState<ConditionsHourly>();

  useEffect(() => {
    WeatherApi
      .fetchHourlyConditions(city)
      .then(conditions => {
        setHourlyConditions(conditions);
      });
  }, [])

  function addLineChart(canvasId: string, label: string, data?: Float32Array) {
    if (!hourlyConditions) return;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    Chart.getChart(ctx)?.destroy();

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: hourlyConditions.time.map(e => moment(e).format('HH:mm Do MMM')),
        datasets: [{
          label: label,
          normalized: true,
          data: Object.values(data ?? Float32Array.from([])),
          tension: 0.1
        }]
      }
    });
  }

  function addBarChart(canvasId: string, label: string, data?: Float32Array) {
    if (!hourlyConditions) return;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    Chart.getChart(ctx)?.destroy();

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: hourlyConditions.time.map(e => moment(e).format('HH:mm Do MMM')),
        datasets: [{
          label: label,
          normalized: true,
          data: Object.values(data ?? Float32Array.from([])),
        }]
      }
    });
  }

  useEffect(() => {
    if (!hourlyConditions) return;
    addLineChart('temp', 'Temperature', hourlyConditions?.temp);
    addLineChart('apparentTemp', 'Apparent temperature', hourlyConditions?.apparentTemp);
    addBarChart('precipitation', 'Precipitation', hourlyConditions?.precipitation);
    addLineChart('windSpeed', 'Wind speed', hourlyConditions?.windSpeed);
    addLineChart('pressure', 'Pressure', hourlyConditions?.pressure);
  }, [hourlyConditions])

  return (
    <ScrollView>
      <canvas id="temp"></canvas>
      <canvas id="apparentTemp"></canvas>
      <canvas id="precipitation"></canvas>
      <canvas id="windSpeed"></canvas>
      <canvas id="pressure"></canvas>
    </ScrollView>
  )
}

const CityScreen = ({ route }: { route: any }) => {
  const { city }: { city: City } = route.params;
  const navigation = useNavigation();

  return (
    <Screen>
      <AppBar title={city.name} leading={
        <Button
          type="clear"
          onPress={navigation.goBack}>
          <FontAwesome6 name='arrow-left' size={20} />
        </Button>} />
      <Body>
        <CityView city={city} />
      </Body>
    </Screen>
  )
}

export default CityScreen
