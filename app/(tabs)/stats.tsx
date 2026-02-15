import { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  useColorScheme,
} from 'react-native';
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
  hoursWorked?: number;
}

interface Stats {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  totalHoursWorked: number;
  yarnUsed: number;
  patternsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  weeklyData: number[];
}

const PROJECTS_KEY = '@stitchpal_projects';
const STREAK_KEY = '@stitchpal_streak';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    completedProjects: 0,
    activeProjects: 0,
    totalHoursWorked: 0,
    yarnUsed: 0,
    patternsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyData: [0, 0, 0, 0, 0, 0, 0],
  });
  const [loading, setLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      // Load projects to calculate stats
      const stored = await AsyncStorage.getItem(PROJECTS_KEY);
      const projects: Project[] = stored ? JSON.parse(stored) : [];
      
      // Calculate basic stats from projects
      const completed = projects.filter(p => p.status === 'completed').length;
      const active = projects.filter(p => p.status === 'active').length;
      
      // Calculate total hours (sum of hoursWorked or estimate from progress)
      const totalHours = projects.reduce((sum, p) => {
        return sum + (p.hoursWorked || Math.round(p.progress * 0.5));
      }, 0);
      
      // Estimate yarn used based on completed projects and progress
      const yarnUsed = projects.reduce((sum, p) => {
        const progressFactor = p.progress / 100;
        return sum + Math.round(progressFactor * 2);
      }, 0);
      
      // Load streak data
      const streakData = await AsyncStorage.getItem(STREAK_KEY);
      let streak = { current: 0, longest: 0 };
      if (streakData) {
        streak = JSON.parse(streakData);
      }
      
      // Calculate weekly data (last 7 days of work)
      const weeklyData = [0, 0, 0, 0, 0, 0, 0];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Check if any project was worked on that day
        const minutes = projects.reduce((sum, p) => {
          if (p.lastWorked === dateStr) {
            return sum + 30;
          }
          return sum;
        }, 0);
        weeklyData[6 - i] = minutes;
      }
      
      setStats({
        totalProjects: projects.length,
        completedProjects: completed,
        activeProjects: active,
        totalHoursWorked: totalHours,
        yarnUsed: yarnUsed,
        patternsCompleted: completed,
        currentStreak: streak.current,
        longestStreak: streak.longest,
        weeklyData,
      });
    } catch (e) {
      console.error('Failed to load stats:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

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
