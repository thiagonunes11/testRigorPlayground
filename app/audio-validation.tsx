import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AudioFile {
  name: string;
  file: any;
}

const audioFiles: AudioFile[] = [
  {
    name: 'Sample A',
    file: require('../assets/audio/344211_giomilko_c-major-9-bossa-nova-guitar.wav'),
  },
  {
    name: 'Sample B',
    file: require('../assets/audio/53704_reinsamba_samba-batucada1.wav'),
  },
];

export default function AudioValidationPage() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState<any>(null);

  useEffect(() => {
    return () => {
      // Clean up the sound when the component unmounts
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playAudio = async (index: number) => {
    if (sound && currentAudioIndex === index) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } else {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioFiles[index].file,
        { shouldPlay: true },
        (status) => setPlaybackStatus(status)
      );
      setSound(newSound);
      setCurrentAudioIndex(index);
      setIsPlaying(true);
    }
  };

  const getPlaybackPosition = () => {
    if (playbackStatus?.isLoaded) {
      const position = playbackStatus.positionMillis || 0;
      const duration = playbackStatus.durationMillis || 0;
      return `${formatTime(position)} / ${formatTime(duration)}`;
    }
    return '';
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const secondsNum = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${secondsNum < 10 ? '0' : ''}${secondsNum}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.pageTitle}>Audio Validation</Text>
        <Text style={styles.pageSubtitle}>Play the audio samples below.</Text>

        <View style={styles.audioList}>
          {audioFiles.map((audio, index) => (
            <View key={index} style={styles.audioItem}>
              <Text style={styles.audioName}>{audio.name}</Text>
              <TouchableOpacity onPress={() => playAudio(index)} style={styles.playButton}>
                <Ionicons
                  name={currentAudioIndex === index && isPlaying ? 'pause-circle' : 'play-circle'}
                  size={40}
                  color="#007AFF"
                />
              </TouchableOpacity>
              {currentAudioIndex === index && playbackStatus?.isLoaded && (
                <Text style={styles.playbackStatus}>{getPlaybackPosition()}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  audioList: {
    marginTop: 20,
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  audioInfo: {
    flex: 1,
    marginRight: 10,
  },
  audioName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  playButton: {
    padding: 5,
  },
  playbackStatus: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
  },
}); 