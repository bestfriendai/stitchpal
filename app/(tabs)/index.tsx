import { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  useColorScheme,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '../../src/theme';

interface Project {
  id: string;
  name: string;
  patternName: string;
  yarnType: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  startDate: string;
  lastWorked: string;
  thumbnail: string;
}

const STORAGE_KEY = '@stitchpal_projects';

export default function ProjectsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        // Sample data for demo
        setProjects([
          {
            id: '1',
            name: 'Winter Scarf',
            patternName: 'Cozy Cable Knit',
            yarnType: 'Merino Wool',
            status: 'active',
            progress: 65,
            startDate: '2026-01-15',
            lastWorked: '2026-02-13',
            thumbnail: '🧣',
          },
          {
            id: '2',
            name: 'Baby Blanket',
            patternName: 'Soft Cloud',
            yarnType: 'Cotton',
            status: 'active',
            progress: 30,
            startDate: '2026-02-01',
            lastWorked: '2026-02-12',
            thumbnail: '🟣',
          },
          {
            id: '3',
            name: 'Summer Top',
            patternName: 'Breezy Tank',
            yarnType: 'Linen Blend',
            status: 'paused',
            progress: 10,
            startDate: '2026-01-20',
            lastWorked: '2026-02-08',
            thumbnail: '👕',
          },
          {
            id: '4',
            name: 'Cozy Mittens',
            patternName: 'Basic Mittens',
            yarnType: 'Acrylic',
            status: 'completed',
            progress: 100,
            startDate: '2026-01-05',
            lastWorked: '2026-01-25',
            thumbnail: '🧤',
          },
        ]);
      }
    } catch (e) {
      console.error('Failed to load projects:', e);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProjects();
    setRefreshing(false);
  }, [loadProjects]);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return theme.success;
      case 'paused': return theme.warning;
      case 'completed': return theme.brand;
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'In Progress';
      case 'paused': return 'Paused';
      case 'completed': return 'Done';
    }
  };

  const renderProject = ({ item }: { item: Project }) => (
    <TouchableOpacity
      style={[styles.projectCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => router.push(`/project/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.projectHeader}>
        <View style={[styles.projectIcon, { backgroundColor: theme.surfaceSecondary }]}>
          <Text style={{ fontSize: 28 }}>{item.thumbnail}</Text>
        </View>
        <View style={styles.projectInfo}>
          <Text style={[styles.projectName, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.patternName, { color: theme.textSecondary }]}>
            {item.patternName}
          </Text>
          <Text style={[styles.yarnType, { color: theme.textTertiary }]}>
            {item.yarnType}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={[styles.progressBar, { backgroundColor: theme.surfaceSecondary }]}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${item.progress}%`,
                backgroundColor: item.status === 'completed' ? theme.success : theme.brand 
              }
            ]} 
          />
        </View>
        <Text style={[styles.progressText, { color: theme.textSecondary }]}>
          {item.progress}% complete
        </Text>
      </View>
      
      <View style={[styles.projectFooter, { borderTopColor: theme.borderLight }]}>
        <Text style={[styles.dateText, { color: theme.textTertiary }]}>
          Started {item.startDate}
        </Text>
        <Text style={[styles.dateText, { color: theme.textTertiary }]}>
          Last worked {item.lastWorked}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🧶</Text>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>No projects yet</Text>
      <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
        Start your first project to track your crochet & knitting progress
      </Text>
      <TouchableOpacity 
        style={[styles.emptyButton, { backgroundColor: theme.brand }]}
        onPress={() => router.push('/project/new')}
      >
        <Text style={styles.emptyButtonText}>Start a Project</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={[styles.title, { color: theme.text }]}>My Projects</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: theme.brand }]}
          onPress={() => router.push('/project/new')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.list,
          projects.length === 0 && styles.listEmpty
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
  projectCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  projectIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectInfo: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  projectName: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
    marginBottom: 2,
  },
  patternName: {
    fontSize: fontSize.body,
    marginBottom: 2,
  },
  yarnType: {
    fontSize: fontSize.caption,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
  },
  progressSection: {
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: fontSize.caption,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 0.5,
  },
  dateText: {
    fontSize: 12,
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
