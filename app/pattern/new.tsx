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

export default function NewPatternScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'crochet' | 'knitting' | 'both'>('knitting');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [materials, setMaterials] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter a pattern name');
      return;
    }
    // In real app, save to AsyncStorage
    Alert.alert('Saved!', 'Pattern saved successfully', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const categories = [
    { value: 'knitting', label: 'Knitting' },
    { value: 'crochet', label: 'Crochet' },
    { value: 'both', label: 'Both' },
  ];

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

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
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Pattern</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[styles.saveText, { color: theme.brand }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Name */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Pattern Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="e.g., Cozy Cable Scarf"
            placeholderTextColor={theme.textTertiary}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Category */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>
          <View style={styles.segmentedControl}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.segment,
                  { borderColor: theme.border },
                  category === cat.value && { backgroundColor: theme.brand, borderColor: theme.brand }
                ]}
                onPress={() => setCategory(cat.value as any)}
              >
                <Text style={[
                  styles.segmentText,
                  { color: category === cat.value ? '#FFFFFF' : theme.textSecondary }
                ]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Difficulty */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Difficulty</Text>
          <View style={styles.segmentedControl}>
            {difficulties.map((diff) => (
              <TouchableOpacity
                key={diff.value}
                style={[
                  styles.segment,
                  { borderColor: theme.border },
                  difficulty === diff.value && { backgroundColor: theme.brand, borderColor: theme.brand }
                ]}
                onPress={() => setDifficulty(diff.value as any)}
              >
                <Text style={[
                  styles.segmentText,
                  { color: difficulty === diff.value ? '#FFFFFF' : theme.textSecondary }
                ]}>
                  {diff.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="Describe your pattern..."
            placeholderTextColor={theme.textTertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Materials */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Materials (one per line)</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="Worsted yarn&#10;Size 8 needles&#10;Cable needle"
            placeholderTextColor={theme.textTertiary}
            value={materials}
            onChangeText={setMaterials}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Instructions */}
        <View style={styles.field}>
          <Text style={[styles.label, { color: theme.textSecondary }]}>Instructions (one step per line)</Text>
          <TextInput
            style={[styles.input, styles.textArea, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="Cast on 40 stitches&#10;Work ribbing for 5 rows&#10;Begin cable pattern..."
            placeholderTextColor={theme.textTertiary}
            value={instructions}
            onChangeText={setInstructions}
            multiline
            numberOfLines={6}
          />
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
    minHeight: 100,
    textAlignVertical: 'top',
  },
  segmentedControl: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRightWidth: 1,
  },
  segmentText: {
    fontSize: fontSize.caption,
    fontWeight: fontWeight.medium,
  },
});
