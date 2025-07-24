import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const logoImageInverted = require("../assets/images/tr-playground-inverted.png");
const logoImage =
  "https://testrigorplayground.netlify.app/assets/tr-playground-CdNjylXW.png";

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
          }}
        >
          <Image
            source={{ uri: logoImage }}
            style={{ width: 150, height: 40 }}
            resizeMode="contain"
          />
        </View>
        <View style={{ borderWidth: 1, borderColor: "black", padding: 10 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              color: "black",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Welcome to testRigor Playground
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "gray",
              textAlign: "center",
              fontFamily: "Helvetica",
              fontWeight: "400",
            }}
          >
            Explore our collection of interactive demos designed to help you
            test various web elements and interactions.
          </Text>
        </View>
        <Pressable onPress={() => console.log("pressed")}>
          <View style={{ borderWidth: 1, borderColor: "black", padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Icon
                name="microphone"
                size={24}
                color="#4285f4"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Audio Validation
              </Text>
            </View>
            <Text>Record and check if the audios match.</Text>
          </View>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
