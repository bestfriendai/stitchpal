// StitchPal Theme - Warm, craft-inspired design
// Brand: Terracotta (#C45D3E) - warm, earthy, craft-appropriate

export const colors = {
  // Primary brand - terracotta/coral
  brand: '#C45D3E',
  brandLight: '#E8A08C',
  brandDark: '#9E3D24',
  
  // Backgrounds - warm whites
  background: '#FDF8F3',
  surface: '#FFFFFF',
  surfaceSecondary: '#FAF3ED',
  surfaceTertiary: '#F5EBE3',
  
  // Text
  text: '#2D2A26',
  textSecondary: 'rgba(45,42,38,0.55)',
  textTertiary: 'rgba(45,42,38,0.35)',
  
  // Borders
  border: '#E8E2DA',
  borderLight: '#F0EBE4',
  
  // Semantic
  destructive: '#D94432',
  success: '#3D8C5C',
  warning: '#D9A232',
  info: '#4A7FB5',
  
  // Dark mode
  dark: {
    background: '#1A1714',
    surface: '#252220',
    surfaceSecondary: '#2F2B28',
    surfaceTertiary: '#3A3532',
    text: '#F5F1EC',
    textSecondary: 'rgba(245,241,236,0.55)',
    textTertiary: 'rgba(245,241,236,0.35)',
    border: 'rgba(255,255,255,0.08)',
    borderLight: 'rgba(255,255,255,0.05)',
    brand: '#E88B6A',
    brandLight: '#C45D3E',
    brandDark: '#FFAD90',
  }
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const fontSize = {
  caption: 13,
  body: 15,
  bodyLarge: 17,
  title3: 20,
  title2: 22,
  largeTitle: 34,
};

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
};
