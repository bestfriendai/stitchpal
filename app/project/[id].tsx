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
  notes: string;
  currentRow: number;
  totalRows: number;
}

const SAMPLE_PROJECT: Project = {
  id: '1',
  name: 'Winter Scarf',
  patternName: 'Cozy Cable Knit',
  yarnType: 'Merino Wool',
  status: 'active',
  progress: 65,
  startDate: '2026-01-15',
  lastWorked: '2026-02-13',
  thumbnail: '🧣',
  notes: 'Working on the second ball of yarn. Need to track cable twist frequency.',
  currentRow: 78,
  totalRows: 120,
};

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    setProject(SAMPLE_PROJECT);
  }, [id]);

  if (!project) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return theme.success;
      case 'paused': return theme.warning;
      case 'completed': return theme.brand;
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Project',
      'Are you sure you want to delete this project? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => router.back() },
      ]
    );
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
        <TouchableOpacity 
          style={[styles.moreButton, { backgroundColor: theme.surface }]}
          onPress={handleDelete}
        >
          <Text style={[styles.moreText, { color: theme.destructive }]}>🗑</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={[styles.heroSection, { backgroundColor: theme.surfaceSecondary }]}>
          <Text style={styles.heroEmoji}>{project.thumbnail}</Text>
          <Text style={[styles.projectName, { color: theme.text }]}>{project.name}</Text>
          <Text style={[styles.patternName, { color: theme.textSecondary }]}>{project.patternName}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(project.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(project.status) }]}>
              {project.status === 'active' ? 'In Progress' : project.status === 'paused' ? 'Paused' : 'Completed'}
            </Text>
          </View>
        </View>

        {/* Progress */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Progress</Text>
          <View style={styles.progressSection}>
            <View style={[styles.progressBar, { backgroundColor: theme.surfaceSecondary }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${project.progress}%`,
                    backgroundColor: project.status === 'completed' ? theme.success : theme.brand 
                  }
                ]} 
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                {project.progress}% complete
              </Text>
              <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                {project.currentRow} / {project.totalRows} rows
              </Text>
            </View>
          </View>
          
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.brand }]}
            >
              <Text style={styles.actionButtonText}>+ Row</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.surfaceSecondary, borderColor: theme.border, borderWidth: 1 }]}
            >
              <Text style={[styles.actionButtonTextAlt, { color: theme.text }]}>- Row</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Details */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Yarn</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{project.yarnType}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Started</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{project.startDate}</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Last Worked</Text>
            <Text style={[styles.detailValue, { color: theme.text }]}>{project.lastWorked}</Text>
          </View>
        </View>

        {/* Notes */}
        <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Notes</Text>
          <Text style={[styles.notesText, { color: theme.textSecondary }]}>
            {project.notes || 'No notes yet. Tap to add notes about your project.'}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {project.status === 'active' && (
            <TouchableOpacity 
              style={[styles.pauseButton, { borderColor: theme.warning }]}
            >
              <Text style={[styles.pauseButtonText, { color: theme.warning }]}>Pause Project</Text>
            </TouchableOpacity>
          )}
          {project.status === 'completed' && (
            <TouchableOpacity 
              style={[styles.pauseButton, { borderColor: theme.brand }]}
            >
              <Text style={[styles.pauseButtonText, { color: theme.brand }]}>View Pattern</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={[styles.deleteButton, { borderColor: theme.destructive }]}
            onPress={handleDelete}
          >
            <Text style={[styles.deleteButtonText, { color: theme.destructive }]}>Delete Project</Text>
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
  projectName: {
    fontSize: fontSize.title2,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  patternName: {
    fontSize: fontSize.body,
    marginBottom: spacing.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
  },
  statusText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.semibold,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: fontSize.title3,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  progressSection: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: fontSize.caption,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  actionButtonTextAlt: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    fontSize: fontSize.body,
  },
  detailValue: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  divider: {
    height: 0.5,
  },
  notesText: {
    fontSize: fontSize.body,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  pauseButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  pauseButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  deleteButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
});
