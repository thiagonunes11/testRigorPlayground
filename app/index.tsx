import { Box } from "@/components/ui/box";
import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import DemoButton from "./components/DemoButton";
import Layout from "./components/Layout";

export default function App() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // 1 column phones, 2 columns tablets+

  return (
    <Layout
      title="Welcome to testRigor Playground"
      description="Explore our collection of interactive demos designed to help you test various web elements and interactions."
    >
      <View style={[styles.grid, isTablet && styles.gridTablet]}>
        <Box style={[styles.item, isTablet && styles.itemTablet]}>
          <DemoButton
            icon="microphone"
            title="Audio Validation"
            description="Record and check if the audios match."
            page="demos/audioValidation" 
          />
        </Box>

        <Box style={[styles.item, isTablet && styles.itemTablet]}>
          <DemoButton
            icon="check-circle"
            title="Button Click"
            description="Click the button to reveal hidden text."
            page="demos/clickButton"    
          />
        </Box>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "column",
    width: "100%",
  },
  gridTablet: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "100%",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    marginBottom: 16,
  },
  itemTablet: {
    width: "48%",
  },
});
