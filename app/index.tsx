import { useFonts } from "expo-font";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from "react-native";

import { Grid, GridItem } from '@/components/ui/grid';

import DemoButton from "./components/DemoButton";


const logoImageInverted = require("../assets/images/tr-playground-inverted.png");
const logoImage = require("../assets/images/tr-playground.png");

export default function App() {
    const [fontsLoaded] = useFonts({
        OpenSans: require("../assets/fonts/OpenSans-Regular.ttf"),
        OpenSansBold: require("../assets/fonts/OpenSans-Bold.ttf"),
    });

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "flex-start",
                backgroundColor: "white",
            }}
        >
            <ScrollView contentContainerStyle={{ gap: 10 }}>
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: "#e2e8f0",
                        paddingHorizontal: 80,
                        paddingVertical: 20,
                        width: "100%",
                        backgroundColor: "white",
                    }}
                >
                    <View>
                        <Image
                            source={logoImage}
                            style={{ width: 300, height: 40 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View style={{ padding: 10 }}>
                    <Text
                        style={{
                            fontSize: 40,
                            color: "#1e293b",
                            textAlign: "center",
                            marginBottom: 20,
                            fontFamily: "OpenSansBold",
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
                <Grid className="gap-4" _extra={{ className: 'grid-cols-10' }}>
                    <GridItem
                        className="p-6 rounded-md"
                        _extra={{ className: 'col-span-3' }}
                    >
                        <DemoButton icon="microphone" title="Audio Validation" description="Record and check if the audios match." />
                    </GridItem>
                    <GridItem
                        className="p-6 rounded-md"
                        _extra={{ className: 'col-span-3' }}
                    >
                        <DemoButton icon="check-circle" title="Button Click" description="Click the button to reveal hidden text." />
                    </GridItem>
                </Grid>
            </ScrollView>
        </SafeAreaView>
    );
}
