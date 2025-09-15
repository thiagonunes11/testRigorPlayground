// AudioValidation.native.tsx
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Linking, StyleSheet, View } from "react-native";

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import Layout from "../components/Layout";

const audioA = require("../../assets/audio/344211_giomilko_c-major-9-bossa-nova-guitar.wav");
const audioB = require("../../assets/audio/53704_reinsamba_samba-batucada1.wav");

type AudioCardProps = {
  title: string;
  source: any; // require(...)
  url: string;
  attribution: string;
};

function AudioCard({ title, source, url, attribution }: AudioCardProps) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationMs, setDurationMs] = useState<number | null>(null);
  const [positionMs, setPositionMs] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { sound } = await Audio.Sound.createAsync(source, { shouldPlay: false });
      soundRef.current = sound as any;

      const status = (await sound.getStatusAsync()) as AVPlaybackStatusSuccess;
      if (isMounted && status.isLoaded) {
        setDurationMs(status.durationMillis ?? null);
      }

      sound.setOnPlaybackStatusUpdate((s) => {
        if (!s.isLoaded) return;
        setIsPlaying(s.isPlaying);
        setPositionMs(s.positionMillis ?? 0);
        if (s.didJustFinish) {
          setIsPlaying(false);
          setPositionMs(0);
        }
      });
    })();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, [source]);

  const togglePlay = async () => {
    if (!soundRef.current) return;
    const status = (await soundRef.current.getStatusAsync()) as AVPlaybackStatusSuccess;
    if (!status.isLoaded) return;
    if (status.isPlaying) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.playAsync();
    }
  };

  const fmt = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
    };

  return (
    <Box style={styles.card}>
      <Text className="text-xl font-semibold mb-2">{title}</Text>

      <View style={styles.controls}>
        <Button onPress={togglePlay}>
          <ButtonText>{isPlaying ? "Pause" : "Play"}</ButtonText>
        </Button>

        <Text className="ml-3 opacity-70">
          {fmt(positionMs)} {durationMs ? `/ ${fmt(durationMs)}` : ""}
        </Text>
      </View>

      <View style={styles.links}>
        <Button onPress={() => Linking.openURL(url)} variant="link">
          <ButtonText>Audio URL</ButtonText>
        </Button>
        <Text className="mx-2">|</Text>
        <Button onPress={() => Linking.openURL(attribution)} variant="link">
          <ButtonText>Attribution</ButtonText>
        </Button>
      </View>
    </Box>
  );
}

export default function AudioValidation() {
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      allowsRecordingIOS: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
    });
  }, []);

  return (
    <DemoLikeLayout>
      <Box className="border p-4 rounded-md w-full">
        <Text className="text-2xl font-bold text-center mb-2">Audio Validation</Text>
        <Text className="opacity-70 text-center">
          Both audios have URLs that can be saved. Each audio can be recorded through playback
          controls and validated against saved files or other recordings.
        </Text>
      </Box>

      <View style={styles.grid}>
        <AudioCard
          title="Audio A"
          source={audioA}
          url="https://raw.githubusercontent.com/your-org/your-repo/main/assets/344211_giomilko_c-major-9-bossa-nova-guitar.wav"
          attribution="https://commons.wikimedia.org/wiki/File:344211_giomilko_c-major-9-bossa-nova-guitar.wav"
        />
        <AudioCard
          title="Audio B"
          source={audioB}
          url="https://raw.githubusercontent.com/your-org/your-repo/main/assets/53704_reinsamba_samba-batucada1.wav"
          attribution="https://commons.wikimedia.org/wiki/File:53704_reinsamba_samba-batucada1.wav"
        />
      </View>
    </DemoLikeLayout>
  );
}

/**
 * Substitui o <Demo> do web por um container simples compatível com RN.
 * Se você já tiver um Layout padrão (como no restante do app), pode trocar aqui.
 */
function DemoLikeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout
      title="Audio Validation"
      description="Record and check if the audios match."
    >
      <View style={styles.container}>{children}</View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  grid: {
    width: "100%",
    gap: 16,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  controls: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  links: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
