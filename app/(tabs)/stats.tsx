import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '../../src/theme';

interface Stats {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  totalHoursWorked: number;
  yarnUsed: number; // in skeins
  patternsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: number[]; // Last 7 days
}

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [stats, setStats] = useState<Stats>({
    totalProjects: 4,
    completedProjects: 1,
    activeProjects: 3,
    totalHoursWorked: 42,
    yarnUsed: 12,
    patternsCompleted: 8,
    currentStreak: 5,
    longestStreak: 14,
    weeklyData: [45, 60, 30, 90, 45, 75, 20], // minutes per day
  });

  const maxWeekly = Math.max(...stats.weeklyData);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={[styles.title, { color: theme.text }]}>Statistics</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Streak Card */}
        <View style={[styles.streakCard, { backgroundColor: theme.brand }]}>
          <Text style={styles.streakLabel}>Current Streak</Text>
          <View style={styles.streakRow}>
            <Text style={styles.streakNumber}>{stats.currentStreak}</Text>
            <Text style={styles.streakUnit}>days</Text>
          </View>
          <Text style={styles.streakSubtext}>
            Best: {stats.longestStreak} days
          </Text>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>{stats.totalProjects}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Total Projects</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>{stats.completedProjects}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Completed</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>{stats.totalHoursWorked}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Hours</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Text style={[styles.statValue, { color: theme.text }]}>{stats.yarnUsed}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Skeins</Text>
          </View>
        </View>

        {/* Weekly Activity */}
        <View style={[styles.sectionCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>This Week</Text>
          <View style={styles.weeklyChart}>
            {stats.weeklyData.map((minutes, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: `${(minutes / maxWeekly) * 100}%`,
                        backgroundColor: theme.brand,
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.barLabel, { color: theme.textTertiary }]}>
                  {days[index]}
                </Text>
              </View>
            ))}
          </View>
          <Text style={[styles.weeklyTotal, { color: theme.textSecondary }]}>
            {stats.weeklyData.reduce((a, b) => a + b, 0)} minutes this week
          </Text>
        </View>

        {/* Achievements Preview */}
        <View style={[styles.achievementsCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Achievements</Text>
          <View style={styles.achievementsList}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🎯</Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementName, { color: theme.text }]}>First Project</Text>
                <Text style={[styles.achievementDesc, { color: theme.textSecondary }]}>
                  Complete your first project
                </Text>
              </View>
              <Text style={[styles.achievementCheck, { color: theme.success }]}>✓</Text>
            </View>
            <View style={[styles.achievementDivider, { backgroundColor: theme.border }]} />
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementName, { color: theme.text }]}>Week Warrior</Text>
                <Text style={[styles.achievementDesc, { color: theme.textSecondary }]}>
                  Work on projects 7 days in a row
                </Text>
              </View>
              <Text style={[styles.achievementCheck, { color: theme.success }]}>✓</Text>
            </View>
            <View style={[styles.achievementDivider, { backgroundColor: theme.border }]} />
            <View style={styles.achievementItem}>
              <Text style={styles.achievementIcon}>🧶</Text>
              <View style={styles.achievementInfo}>
                <Text style={[styles.achievementName, { color: theme.text }]}>Yarn Hoarder</Text>
                <Text style={[styles.achievementDesc, { color: theme.textSecondary }]}>
                  Use 10+ skeins of yarn
                </Text>
              </View>
              <Text style={[styles.achievementCheck, { color: theme.success }]}>✓</Text>
            </View>
          </View>
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
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.largeTitle,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.4,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  streakCard: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  streakLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    marginBottom: spacing.xs,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  streakNumber: {
    color: '#FFFFFF',
    fontSize: 56,
    fontWeight: fontWeight.bold,
    letterSpacing: -2,
  },
  streakUnit: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: fontSize.title3,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.xs,
  },
  streakSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: fontSize.caption,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statCard: {
    width: '48%',
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    ...shadows.sm,
  },
  statValue: {
    fontSize: fontSize.title2,
    fontWeight: fontWeight.bold,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSize.caption,
  },
  sectionCard: {
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
  weeklyChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: spacing.sm,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    width: 24,
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  bar: {
    width: '100%',
    borderRadius: radius.sm,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
  },
  weeklyTotal: {
    fontSize: fontSize.body,
    textAlign: 'center',
  },
  achievementsCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    ...shadows.sm,
  },
  achievementsList: {
    gap: spacing.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  achievementDesc: {
    fontSize: fontSize.caption,
  },
  achievementCheck: {
    fontSize: 20,
    fontWeight: fontWeight.bold,
  },
  achievementDivider: {
    height: 1,
    marginVertical: spacing.sm,
  },
});
