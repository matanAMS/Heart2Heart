import React, { useEffect } from "react";
import { View, Text } from "react-native";

export default function Regions() {
  const [data, setData] = React.useState([]);
  const loadData = async () => {
    let city = "hadera";

    let response = await fetch(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=1bf27e56-364c-4b61-8b6b-efa9933da677&q=${city}`
    );
    let data = await response.json();
    setData(data);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text>{Json.parse(data)}</Text>
    </View>
  );
}
