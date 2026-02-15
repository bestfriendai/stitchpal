import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Switch,
  useColorScheme,
  Alert,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [haptics, setHaptics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleExport = () => {
    Alert.alert('Export Data', 'Your projects and patterns will be exported as JSON');
  };

  const handleImport = () => {
    Alert.alert('Import Data', 'Select a JSON file to import');
  };

  const handlePrivacy = () => {
    Linking.openURL('https://example.com/privacy');
  };

  const handleTerms = () => {
    Linking.openURL('https://example.com/terms');
  };

  const handleSupport = () => {
    Linking.openURL('mailto:support@stitchpal.app');
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
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>PREFERENCES</Text>
          <View style={[styles.sectionContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Haptic Feedback</Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Vibration on interactions
                </Text>
              </View>
              <Switch
                value={haptics}
                onValueChange={setHaptics}
                trackColor={{ false: theme.border, true: theme.brand + '60' }}
                thumbColor={haptics ? theme.brand : '#f4f3f4'}
              />
            </View>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Mode</Text>
                <Text style={[styles.settingDesc, { color: theme.textSecondary }]}>
                  Use dark color scheme
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: theme.border, true: theme.brand + '60' }}
                thumbColor={darkMode ? theme.brand : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Data */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>DATA</Text>
          <View style={[styles.sectionContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <TouchableOpacity style={[styles.menuRow, { borderBottomColor: theme.border }]} onPress={handleExport}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Export Data</Text>
              <Text style={[styles.chevron, { color: theme.textTertiary }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow} onPress={handleImport}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Import Data</Text>
              <Text style={[styles.chevron, { color: theme.textTertiary }]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Premium */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>PREMIUM</Text>
          <View style={[styles.sectionContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <TouchableOpacity style={[styles.menuRow, { borderBottomColor: theme.border }]} onPress={() => router.push('/paywall')}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Upgrade to Premium</Text>
              <View style={[styles.premiumBadge, { backgroundColor: theme.brand + '20' }]}>
                <Text style={[styles.premiumText, { color: theme.brand }]}>PRO</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Restore Purchases</Text>
              <Text style={[styles.chevron, { color: theme.textTertiary }]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionHeader, { color: theme.textSecondary }]}>ABOUT</Text>
          <View style={[styles.sectionContent, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <TouchableOpacity style={[styles.menuRow, { borderBottomColor: theme.border }]} onPress={handleSupport}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Contact Support</Text>
              <Text style={[styles.chevron, { color: theme.textTertiary }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuRow, { borderBottomColor: theme.border }]} onPress={handlePrivacy}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Privacy Policy</Text>
              <Text style={[styles.chevron, { color: theme.textTertiary }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuRow} onPress={handleTerms}>
              <Text style={[styles.menuLabel, { color: theme.text }]}>Terms of Service</Text>
              <Text style={[styles.chevron, { color: theme.textTertiary }]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Version */}
        <View style={styles.version}>
          <Text style={[styles.versionText, { color: theme.textTertiary }]}>StitchPal v1.0.0</Text>
          <Text style={[styles.versionText, { color: theme.textTertiary }]}>Build 1</Text>
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
    paddingBottom: spacing.md,
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
  headerTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionContent: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 0.5,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
  },
  settingDesc: {
    fontSize: fontSize.caption,
    marginTop: 2,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 0.5,
  },
  menuLabel: {
    fontSize: fontSize.body,
  },
  chevron: {
    fontSize: 24,
    fontWeight: fontWeight.medium,
  },
  premiumBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: fontWeight.bold,
  },
  version: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.caption,
  },
});
