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
        OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
        OpenSansBold: require("../../assets/fonts/OpenSans-Bold.ttf"),
    });
    return (
        <SafeAreaView className="flex-1 justify-start bg-white">
            <ScrollView contentContainerStyle={{ gap: 10 }}>
                <View className="border-b border-slate-200 px-20 py-5 w-full bg-white">
                    <View>
                        <Image
                            source={logoImage}
                            style={{ width: 300, height: 40 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
                <View className="md:px-32 px-16 pt-6 items-center w-full">
                    <Text className="text-4xl text-slate-800 text-center mb-5 font-bold">
                        {title}
                    </Text>
                    <Text className="text-lg text-gray-500 text-center font-helvetica font-normal">
                        {description}
                    </Text>
                    <View className="w-full items-center pt-4 mt-8">
                        {children}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Layout;