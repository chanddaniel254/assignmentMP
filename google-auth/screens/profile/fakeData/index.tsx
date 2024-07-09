import { ActivityIndicator, View, Dimensions, Image } from "react-native";
import { useGetFakeProductsQuery } from "../../../redux/fakeApi";
import { Chip } from "react-native-paper";
import { COLOR } from "../../../constants";
import Carousel from "react-native-reanimated-carousel";

const width = Dimensions.get("window").width;
const FakeDataDisplay = () => {
  const { data: fakeProductData, isLoading, error } = useGetFakeProductsQuery();
  const formatFakeProductData = fakeProductData || [];

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      {isLoading ? (
        <ActivityIndicator color={COLOR.ROYAL_BLUE} size={50} />
      ) : error ? (
        <Chip icon="information">Error Occurred!!</Chip>
      ) : (
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={formatFakeProductData}
          scrollAnimationDuration={1000}
          mode="parallax"
          renderItem={({ index }) => (
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                width={width}
                height={width}
                resizeMode="cover"
                source={{ uri: formatFakeProductData[index].image }}
              ></Image>
            </View>
          )}
        />
      )}
    </View>
  );
};
export default FakeDataDisplay;
