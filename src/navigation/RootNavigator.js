import { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AddEntryScreen from '../screens/AddEntryScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import LoadingOverlay from '../components/LoadingOverlay';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

function GradientHeader({ title, rightComponent }) {
  return (
    <LinearGradient
      colors={[colors.surface, colors.surfaceAlt]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
        {rightComponent && <View>{rightComponent}</View>}
      </View>
    </LinearGradient>
  );
}

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const simulateLoading = () => {
    setIsLoading(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 160,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setIsLoading(false));
    }, 320);
  };

  return (
    <>
      <Tab.Navigator
        screenListeners={{
          tabPress: () => simulateLoading(),
        }}
        screenOptions={({ route }) => ({
          header: ({ options }) => <GradientHeader title={options.title || ''} />,
          sceneStyle: { backgroundColor: colors.background },
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,

          tabBarIcon: ({ focused, color }) => {
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
                      color="#fff"
                      style={{ textShadowColor: '#000', textShadowRadius: 8 }}
                    />
                  </LinearGradient>
                </View>
              );
            }

            return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Daily Tracker' }} />
        <Tab.Screen name="Add" component={AddEntryScreen} options={{ title: 'Add Entry' }} />
        <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
        <Tab.Screen name="Stats" component={StatsScreen} options={{ title: 'Stats' }} />
      </Tab.Navigator>

      <Animated.View
        pointerEvents={isLoading ? 'auto' : 'none'}
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'rgba(17, 25, 59, 0.6)',
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 18,
  },
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: 'transparent',
    height: 70,
    position: 'absolute',
    bottom: 10,
    left: 15,
    right: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
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
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
});
