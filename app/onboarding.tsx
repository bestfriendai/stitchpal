import { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, radius, fontSize, fontWeight } from '../src/theme';

const { width } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    emoji: '🧶',
    title: 'Track Your Projects',
    subtitle: 'Keep all your crochet and knitting projects organized in one beautiful place',
  },
  {
    id: '2',
    emoji: '📋',
    title: 'Save Patterns',
    subtitle: 'Store your favorite patterns with materials lists and step-by-step instructions',
  },
  {
    id: '3',
    emoji: '📊',
    title: 'See Your Progress',
    subtitle: 'Track your streak, yarn usage, and celebrate your completed masterpieces',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = async () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem('@stitchpal_onboarding', 'complete');
      router.replace('/(tabs)');
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('@stitchpal_onboarding', 'complete');
    router.replace('/(tabs)');
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={styles.slide}>
      <View style={[styles.emojiContainer, { backgroundColor: theme.surfaceSecondary }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>{item.subtitle}</Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dots}>
      {SLIDES.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { backgroundColor: index === currentIndex ? theme.brand : theme.border }
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        {currentIndex < SLIDES.length - 1 ? (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={[styles.skipText, { color: theme.textSecondary }]}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 50 }} />
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      {renderDots()}

      <View style={[styles.footer, { paddingBottom: insets.bottom + spacing.lg }]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.brand }]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.md,
  },
  skipText: {
    fontSize: fontSize.body,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  emojiContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    fontSize: fontSize.title2,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: fontSize.bodyLarge,
    textAlign: 'center',
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginVertical: spacing.xl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    paddingHorizontal: spacing.md,
  },
  button: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
});
