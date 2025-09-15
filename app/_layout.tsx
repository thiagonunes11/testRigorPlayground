import { Stack } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="light">
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="demos/audioValidation" options={{ headerShown: false }} />
      <Stack.Screen name="demos/clickButton" options={{ headerShown: false }} />
    </Stack>
    </GluestackUIProvider>
  
  );
}
