import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const features = [
  {
    icon: 'mic-outline',
    title: 'Audio Validation',
    subtitle: 'Record and check if the audios match.',
    route: '/audio-validation',
  },
  {
    icon: 'open-outline',
    title: 'Browser Prompt',
    subtitle: 'Enter values to prompts.',
    route: null,
  },
  {
    icon: 'checkmark-circle-outline',
    title: 'Button Click',
    subtitle: 'Click the button to reveal the hidden text.',
    route: null,
  },
  {
    icon: 'camera-outline',
    title: 'Camera',
    subtitle: 'Use your computer as if it were a camera',
    route: null,
  },
  {
    icon: 'checkbox-outline',
    title: 'Checkbox',
    subtitle: 'Click on any of the checkboxes.',
    route: null,
  },
  {
    icon: 'pencil-outline',
    title: 'Connect the Dots',
    subtitle: 'Click and drag in a canvas.',
    route: null,
  },
  {
    icon: 'add-circle-outline',
    title: 'Counter',
    subtitle: 'Simple Counter.',
    route: null,
  },
  {
    icon: 'calendar-outline',
    title: 'Date Picker',
    subtitle: 'Choose a date on a date picker.',
    route: null,
  },
  {
    icon: 'trash-outline',
    title: 'Delete Elements',
    subtitle: 'Remove elements from the page.',
    route: null,
  },
  {
    icon: 'grid-outline',
    title: 'Div Table',
    subtitle: 'Table built with divs.',
    route: null,
  },
  {
    icon: 'swap-vertical-outline',
    title: 'Drag Item',
    subtitle: 'Drag and drop items.',
    route: null,
  },
  {
    icon: 'arrow-down-outline',
    title: 'Dropdowns',
    subtitle: 'Select from dropdown menus.',
    route: null,
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header with logo and app name */}
        <View style={styles.headerRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>tR</Text>
          </View>
          <Text style={styles.brandName}>Playground</Text>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to testRigor Playground</Text>
          <Text style={styles.welcomeSubtitle}>
            Explore our collection of interactive demos designed to help you test various web elements and interactions.
          </Text>
        </View>

        {/* Feature Grid */}
        <View style={styles.grid}>
          {features.map((feature, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => feature.route ? router.push(feature.route as any) : null}
            >
              <Ionicons name={feature.icon as any} size={28} color="#2563eb" style={styles.cardIcon} />
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollViewContent: {
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  logoBox: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  logoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    letterSpacing: 1,
  },
  brandName: {
    color: '#1e293b',
    fontWeight: '700',
    fontSize: 22,
    letterSpacing: 0.5,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 48,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 20,
    margin: 8,
    width: '45%',
    minWidth: 150,
    maxWidth: 280,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 16,
    color: '#2563eb',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
}); 