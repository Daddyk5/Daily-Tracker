import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import colors from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';

const Tab = createBottomTabNavigator();

function GradientHeader({ title }) {
  return (
    <LinearGradient
      colors={[colors.surface, colors.surfaceAlt]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <Text style={styles.headerTitle}>{title}</Text>
    </LinearGradient>
  );
}

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ⚡ smoother loading fade animation
  const simulateLoading = () => {
    setIsLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsLoading(false));
    }, 300);
  };

  return (
    <>
      <Tab.Navigator
        screenListeners={{
          tabPress: () => simulateLoading(),
        }}
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: 'transparent',
            height: 70,
            position: 'absolute',
            bottom: 10,
            left: 15,
            right: 15,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          header: ({ options }) => <GradientHeader title={options.title || ''} />,
          sceneStyle: { backgroundColor: colors.background },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Add':
                iconName = focused ? 'add' : 'add-outline';
                break;
              case 'History':
                iconName = focused ? 'time' : 'time-outline';
                break;
              case 'Stats':
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
                break;
              default:
                iconName = 'ellipse';
            }

            // floating center Add button
            if (route.name === 'Add') {
              return (
                <View style={styles.fabContainer}>
                  <LinearGradient
                    colors={[colors.primary, colors.accent]}
                    style={styles.fabGradient}
                  >
                    <Ionicons
                      name="add"
                      size={32}
                      color="white"
                      style={{ textShadowColor: '#000', textShadowRadius: 6 }}
                    />
                  </LinearGradient>
                </View>
              );
            }

            // normal icons for other tabs
            return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Daily Tracker' }} />
        <Tab.Screen name="Add" component={AddEntryScreen} options={{ title: 'Add Entry' }} />
        <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
        <Tab.Screen name="Stats" component={StatsScreen} options={{ title: 'Stats' }} />
      </Tab.Navigator>

      {/* 🧠 Fixed loading overlay — clean fade, centered, no clipping */}
      <Animated.View
        pointerEvents={isLoading ? 'auto' : 'none'}
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'rgba(0,0,0,0.25)',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: fadeAnim,
          },
        ]}
      >
        {isLoading && <LoadingOverlay label="Loading..." />}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 92,
    paddingTop: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
  },
  fabContainer: {
    position: 'absolute',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
});
