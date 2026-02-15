import { Tabs } from 'expo-router';
import { useColorScheme, View, Text } from 'react-native';
import { colors, fontSize } from '../../src/theme';

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const theme = useColorScheme() === 'dark' ? colors.dark : colors;
  
  const icons: Record<string, string> = {
    projects: '▣',
    patterns: '≡',
    stats: '◉',
  };
  
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ 
        fontSize: 22, 
        color: focused ? theme.brand : theme.textTertiary,
      }}>
        {icons[name] || '●'}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          borderTopWidth: 0.5,
          height: 84,
          paddingTop: 8,
          paddingBottom: 28,
        },
        tabBarActiveTintColor: theme.brand,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarLabelStyle: {
          fontSize: fontSize.caption,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Projects',
          tabBarIcon: ({ focused }) => <TabIcon name="projects" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="patterns"
        options={{
          title: 'Patterns',
          tabBarIcon: ({ focused }) => <TabIcon name="patterns" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ focused }) => <TabIcon name="stats" focused={focused} />,
        }}
      />
    </Tabs>
  );
}
