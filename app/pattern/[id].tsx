import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '../../src/theme';

interface Pattern {
  id: string;
  name: string;
  category: 'crochet' | 'knitting' | 'both';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  materials: string[];
  instructions: string[];
  imageUrl: string;
}

const SAMPLE_PATTERN: Pattern = {
  id: '1',
  name: 'Cozy Cable Knit Scarf',
  category: 'knitting',
  difficulty: 'intermediate',
  description: 'A warm winter scarf with classic cable patterns. Perfect for cold weather and makes a great gift.',
  materials: ['Worsted weight yarn (2 skeins)', 'Size 8 (5mm) needles', 'Cable needle', 'Tapestry needle', 'Scissors'],
  instructions: [
    'Cast on 40 stitches using long-tail cast on',
    'Work 5 rows of K2, P2 ribbing',
    'Begin cable pattern: Row 6 - C4F (cable 4 front), P2, K2, P2',
    'Continue repeating cable pattern until scarf measures 60 inches',
    'Work 5 rows of K2, P2 ribbing',
    'Bind off loosely in pattern',
    'Weave in all ends',
    'Block to finished dimensions',
  ],
  imageUrl: '🧣',
};

export default function PatternDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [pattern, setPattern] = useState<Pattern | null>(null);

  useEffect(() => {
    // In real app, load from storage
    setPattern(SAMPLE_PATTERN);
  }, [id]);

  if (!pattern) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const getCategoryLabel = (category: Pattern['category']) => {
    switch (category) {
      case 'crochet': return 'Crochet';
      case 'knitting': return 'Knitting';
      case 'both': return 'Crochet & Knit';
    }
  };

  const getDifficultyColor = (difficulty: Pattern['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return '#3D8C5C';
      case 'intermediate': return '#D9A232';
      case 'advanced': return '#D94432';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.surface }]}
          onPress={() => router.back()}
        >
          <Text style={[styles.backText, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.moreButton, { backgroundColor: theme.surface }]}>
          <Text style={[styles.moreText, { color: theme.text }]}>•••</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.heroSection, { backgroundColor: theme.surfaceSecondary }]}>
          <Text style={styles.heroEmoji}>{pattern.imageUrl}</Text>
          <Text style={[styles.patternName, { color: theme.text }]}>{pattern.name}</Text>
          <View style={styles.metaRow}>
            <View style={[styles.badge, { backgroundColor: theme.surface }]}>
              <Text style={[styles.badgeText, { color: theme.textSecondary }]}>
                {getCategoryLabel(pattern.category)}
              </Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(pattern.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(pattern.difficulty) }]}>
                {pattern.difficulty.charAt(0).toUpperCase() + pattern.difficulty.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {pattern.description}
          </Text>
        </View>

        {/* Materials */}
        <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Materials Needed</Text>
          {pattern.materials.map((material, index) => (
            <View key={index} style={styles.materialItem}>
              <View style={[styles.checkbox, { borderColor: theme.brand }]} />
              <Text style={[styles.materialText, { color: theme.text }]}>{material}</Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={[styles.section, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Instructions</Text>
          {pattern.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={[styles.stepNumber, { backgroundColor: theme.brand }]}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.instructionText, { color: theme.text }]}>{instruction}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.startButton, { backgroundColor: theme.brand }]}
            onPress={() => router.push('/project/new')}
          >
            <Text style={styles.startButtonText}>Start This Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 20,
    fontWeight: fontWeight.medium,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  heroSection: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroEmoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  patternName: {
    fontSize: fontSize.title2,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  badgeText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  difficultyText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
  },
  section: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  sectionTitle: {
    fontSize: fontSize.title3,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.body,
    lineHeight: 24,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    marginRight: spacing.md,
  },
  materialText: {
    fontSize: fontSize.body,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: fontWeight.bold,
  },
  instructionText: {
    flex: 1,
    fontSize: fontSize.body,
    lineHeight: 24,
  },
  actions: {
    marginTop: spacing.md,
  },
  startButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
});
