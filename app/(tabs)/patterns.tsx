import { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const STORAGE_KEY = '@stitchpal_patterns';

export default function PatternsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPatterns = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPatterns(JSON.parse(stored));
      } else {
        // Sample patterns for demo
        setPatterns([
          {
            id: '1',
            name: 'Cozy Cable Knit Scarf',
            category: 'knitting',
            difficulty: 'intermediate',
            description: 'A warm winter scarf with classic cable patterns',
            materials: ['Worsted weight yarn', 'Size 8 needles', 'Cable needle'],
            instructions: [
              'Cast on 40 stitches',
              'Row 1-5: Knit 2, Purl 2 rib',
              'Row 6: C4F, P2, K2, P2',
              'Repeat pattern until desired length',
              'Bind off loosely',
            ],
            imageUrl: '🧣',
          },
          {
            id: '2',
            name: 'Basic Single Crochet Beanie',
            category: 'crochet',
            difficulty: 'beginner',
            description: 'Simple beanie hat perfect for beginners',
            materials: ['Chunky yarn', 'Size J hook', 'Stitch marker'],
            instructions: [
              'Make magic ring',
              'Sc 6 into ring',
              'Increase each round',
              'Work 4 rows even',
              'Decrease for crown',
              'Fasten off',
            ],
            imageUrl: '🧢',
          },
          {
            id: '3',
            name: 'Textured Moss Stitch Blanket',
            category: 'knitting',
            difficulty: 'intermediate',
            description: 'Soft baby blanket with beautiful texture',
            materials: ['DK weight yarn', 'Size 6 needles', 'Tapestry needle'],
            instructions: [
              'Cast on multiple of 4 + 2',
              'Row 1: K2, *P2, K2*',
              'Row 2: K1, P1, K2, P1, K1',
              'Repeat rows 1-2',
              'Bind off in pattern',
            ],
            imageUrl: '🟣',
          },
          {
            id: '4',
            name: 'Amigurumi Bear',
            category: 'crochet',
            difficulty: 'intermediate',
            description: 'Cute crocheted teddy bear',
            materials: ['Worsted yarn', 'Size G hook', 'Safety eyes', 'Stuffing'],
            instructions: [
              'Start with magic ring',
              'Work body in rounds',
              'Make head larger',
              'Add arms and legs',
              'Attach safety eyes',
              'Sew all pieces',
            ],
            imageUrl: '🧸',
          },
        ]);
      }
    } catch (e) {
      console.error('Failed to load patterns:', e);
    }
  }, []);

  useEffect(() => {
    loadPatterns();
  }, [loadPatterns]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPatterns();
    setRefreshing(false);
  }, [loadPatterns]);

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

  const renderPattern = ({ item }: { item: Pattern }) => (
    <TouchableOpacity
      style={[styles.patternCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => router.push(`/pattern/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={[styles.patternIcon, { backgroundColor: theme.surfaceSecondary }]}>
        <Text style={{ fontSize: 32 }}>{item.imageUrl}</Text>
      </View>
      <View style={styles.patternInfo}>
        <Text style={[styles.patternName, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.patternDesc, { color: theme.textSecondary }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.patternMeta}>
          <View style={[styles.categoryBadge, { backgroundColor: theme.surfaceTertiary }]}>
            <Text style={[styles.categoryText, { color: theme.textSecondary }]}>
              {getCategoryLabel(item.category)}
            </Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) + '20' }]}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(item.difficulty) }]}>
              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>No patterns yet</Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Add your first pattern to start a new project
      </Text>
      <TouchableOpacity 
        style={[styles.emptyButton, { backgroundColor: theme.brand }]}
        onPress={() => router.push('/pattern/new')}
      >
        <Text style={styles.emptyButtonText}>Add Pattern</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={[styles.title, { color: theme.text }]}>Patterns</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.brand }]}
          onPress={() => router.push('/pattern/new')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={patterns}
        renderItem={renderPattern}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          patterns.length === 0 && styles.listEmpty
        ]}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={theme.brand}
          />
        }
        showsVerticalScrollIndicator={false}
      />
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
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.4,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: fontWeight.medium,
    marginTop: -2,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  listEmpty: {
    flex: 1,
  },
  patternCard: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  patternIcon: {
    width: 72,
    height: 72,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  patternName: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
    marginBottom: 4,
  },
  patternDesc: {
    fontSize: fontSize.body,
    marginBottom: spacing.sm,
    lineHeight: 20,
  },
  patternMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.title2,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: fontSize.body,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  emptyButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
});
