import { Text } from '@/components/ui/text';
import { useFonts } from "expo-font";
import React from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    View
} from "react-native";

const logoImage = require("@/assets/images/tr-playground.png");

interface LayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
    title,
    description,
    children
}) => {
    const [fontsLoaded] = useFonts({
        Inter: require("../../assets/fonts/Inter_18pt-Regular.ttf"),
        InterBold: require("../../assets/fonts/Inter_18pt-Bold.ttf"),
        InterBlack: require("../../assets/fonts/Inter_18pt-Black.ttf"),
        OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
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
                        {title}
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
                        {description}
                    </Text>
                </View>
                <View>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Layout;