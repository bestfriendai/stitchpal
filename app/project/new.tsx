import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '../../src/theme';

const THUMBNAILS = ['🧣', '🧤', '🧶', '🧢', '👕', '🟣', '🧸', '👜', '🧦', '🧺'];

export default function NewProjectScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [name, setName] = useState('');
  const [patternName, setPatternName] = useState('');
  const [yarnType, setYarnType] = useState('');
  const [thumbnail, setThumbnail] = useState('🧣');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter a project name');
      return;
    }
    if (!patternName.trim()) {
      Alert.alert('Missing Pattern', 'Please enter a pattern name');
      return;
    }
    // In real app, save to AsyncStorage
    Alert.alert('Project Started!', 'Your new project has been created', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.cancelText, { color: theme.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Project</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveText, { color: theme.brand }]}>Start</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Thumbnail Picker */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Choose an Icon</Text>
          <View style={styles.thumbnailGrid}>
            {THUMBNAILS.map((thumb) => (
              <TouchableOpacity
                key={thumb}
                style={[
                  styles.thumbnailOption,
                  { backgroundColor: theme.surfaceSecondary },
                  thumbnail === thumb && { backgroundColor: theme.brand + '30', borderColor: theme.brand, borderWidth: 2 }
                ]}
                onPress={() => setThumbnail(thumb)}
              >
                <Text style={{ fontSize: 28 }}>{thumb}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Project Name */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Project Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="e.g., Winter Scarf for Mom"
            placeholderTextColor={theme.textTertiary}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Pattern Name */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Pattern Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="e.g., Cozy Cable Knit"
            placeholderTextColor={theme.textTertiary}
            value={patternName}
            onChangeText={setPatternName}
          />
        </View>

        {/* Yarn Type */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Yarn Type</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="e.g., Merino Wool"
            placeholderTextColor={theme.textTertiary}
            value={yarnType}
            onChangeText={setYarnType}
          />
        </View>

        {/* Notes */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="Any notes about this project..."
            placeholderTextColor={theme.textTertiary}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Preview */}
        <View style={[styles.previewCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.previewTitle, { color: theme.textSecondary }]}>Preview</Text>
          <View style={styles.previewContent}>
            <View style={[styles.previewIcon, { backgroundColor: theme.surfaceSecondary }]}>
              <Text style={{ fontSize: 32 }}>{thumbnail}</Text>
            </View>
            <View style={styles.previewInfo}>
              <Text style={[styles.previewName, { color: theme.text }]}>
                {name || 'Project Name'}
              </Text>
              <Text style={[styles.previewPattern, { color: theme.textSecondary }]}>
                {patternName || 'Pattern Name'}
              </Text>
              {yarnType ? (
                <Text style={[styles.previewYarn, { color: theme.textTertiary }]}>{yarnType}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  cancelText: {
    fontSize: fontSize.body,
  },
  headerTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
  saveText: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: fontSize.body,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  thumbnailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  thumbnailOption: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    ...shadows.sm,
  },
  previewTitle: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  previewContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  previewName: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
  previewPattern: {
    fontSize: fontSize.body,
    marginTop: 2,
  },
  previewYarn: {
    fontSize: fontSize.caption,
    marginTop: 2,
  },
});
