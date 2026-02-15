import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius, fontSize, fontWeight, shadows } from '../src/theme';

// RevenueCat integration stub
// In production: import { Purchases } from '@react-native-purchases/purchases';

interface Entitlement {
  id: string;
  name: string;
  description: string;
}

const ENTITLEMENTS: Entitlement[] = [
  { id: '1', name: 'Unlimited Projects', description: 'No limits on projects & patterns' },
  { id: '2', name: 'Advanced Stats', description: 'Detailed analytics & insights' },
  { id: '3', name: 'Cloud Backup', description: 'Sync across devices' },
  { id: '4', name: 'Premium Patterns', description: 'Exclusive pattern library' },
  { id: '5', name: 'No Ads', description: 'Completely ad-free experience' },
];

const MONTHLY_PRICE = '$4.99/mo';
const ANNUAL_PRICE = '$39.99/yr';
const ANNUAL_SAVINGS = '40%';

export default function PaywallScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;
  
  const [selected, setSelected] = useState<'monthly' | 'annual'>('annual');

  const handleSubscribe = async () => {
    // In production: Use RevenueCat to handle subscription
    Alert.alert(
      'Coming Soon',
      'Subscription feature will be available soon. Thanks for your interest in StitchPal Premium!',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const handleRestore = () => {
    Alert.alert('Restore Purchases', 'Looking for existing subscriptions...');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity onPress={handleClose}>
          <Text style={[styles.closeText, { color: theme.textSecondary }]}>✕</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>StitchPal Premium</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: theme.brand + '20' }]}>
            <Text style={{ fontSize: 48 }}>🧶</Text>
          </View>
          <Text style={[styles.heroTitle, { color: theme.text }]}>Unlock Everything</Text>
          <Text style={[styles.heroSubtitle, { color: theme.textSecondary }]}>
            Get unlimited projects, advanced analytics, and more
          </Text>
        </View>

        {/* Plans */}
        <View style={styles.plans}>
          <TouchableOpacity
            style={[
              styles.planCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
              selected === 'annual' && { borderColor: theme.brand, borderWidth: 2 }
            ]}
            onPress={() => setSelected('annual')}
          >
            {selected === 'annual' && (
              <View style={[styles.recommendedBadge, { backgroundColor: theme.brand }]}>
                <Text style={styles.recommendedText}>BEST VALUE</Text>
              </View>
            )}
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: theme.text }]}>Annual</Text>
              <Text style={[styles.planPrice, { color: theme.text }]}>{ANNUAL_PRICE}</Text>
            </View>
            <View style={[styles.savingsBadge, { backgroundColor: theme.success + '20' }]}>
              <Text style={[styles.savingsText, { color: theme.success }]}>Save {ANNUAL_SAVINGS}</Text>
            </View>
            <View style={styles.checkmark}>
              <Text style={[styles.checkmarkText, { color: theme.success }]}>✓</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
              selected === 'monthly' && { borderColor: theme.brand, borderWidth: 2 }
            ]}
            onPress={() => setSelected('monthly')}
          >
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: theme.text }]}>Monthly</Text>
              <Text style={[styles.planPrice, { color: theme.text }]}>{MONTHLY_PRICE}</Text>
            </View>
            <View style={styles.checkmark}>
              <Text style={[styles.checkmarkText, { color: theme.success }]}>✓</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {ENTITLEMENTS.map((entitlement) => (
            <View key={entitlement.id} style={styles.featureRow}>
              <Text style={styles.featureCheck}>✓</Text>
              <View style={styles.featureInfo}>
                <Text style={[styles.featureName, { color: theme.text }]}>{entitlement.name}</Text>
                <Text style={[styles.featureDesc, { color: theme.textSecondary }]}>{entitlement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.subscribeButton, { backgroundColor: theme.brand }]}
          onPress={handleSubscribe}
        >
          <Text style={styles.subscribeButtonText}>
            {selected === 'annual' ? 'Start Free Trial' : 'Subscribe'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={[styles.restoreText, { color: theme.textSecondary }]}>Restore Purchases</Text>
        </TouchableOpacity>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={[styles.termsText, { color: theme.textTertiary }]}>
            Subscriptions automatically renew unless canceled. By subscribing, you agree to our Terms of Service and Privacy Policy.
          </Text>
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
  closeText: {
    fontSize: 20,
  },
  headerTitle: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: fontSize.title2,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    fontSize: fontSize.body,
    textAlign: 'center',
  },
  plans: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  planCard: {
    borderRadius: radius.lg,
    borderWidth: 1,
    padding: spacing.md,
    position: 'relative',
    ...shadows.sm,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    right: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  recommendedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: fontWeight.bold,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  planName: {
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
  planPrice: {
    fontSize: fontSize.title3,
    fontWeight: fontWeight.bold,
  },
  savingsBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  savingsText: {
    fontSize: 12,
    fontWeight: fontWeight.semibold,
  },
  checkmark: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  checkmarkText: {
    fontSize: 18,
    fontWeight: fontWeight.bold,
  },
  features: {
    marginBottom: spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  featureCheck: {
    fontSize: 16,
    color: '#3D8C5C',
    marginRight: spacing.md,
    marginTop: 2,
  },
  featureInfo: {
    flex: 1,
  },
  featureName: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.medium,
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: fontSize.caption,
  },
  subscribeButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.semibold,
  },
  restoreButton: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  restoreText: {
    fontSize: fontSize.body,
  },
  terms: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 11,
    textAlign: 'center',
    lineHeight: 16,
  },
});
