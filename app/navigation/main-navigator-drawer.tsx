import React from "react";

// Import external libraries
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// Import components, function, screens & utils
import { TABS } from "@app/constants";
import { CustomDrawer } from "./CustomDrawer/CustomDrawer";
import styleConfig from "@app/theme/styleConfig";
import { AnimatedWrapper } from "./AnimatedWrapper";
import { content } from "@app/utils/string";
import { useRedux } from "@app/redux/hooks";
import { DRAWER_SCREEN_MAP } from "@app/utils/NavigationConfigJson";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export function DrawerNavigator() {
  const { groups } = content;
  const { dynamic_tab } = useRedux([groups.dynamicTab]);
  const enabledTabs = dynamic_tab?.drawer_menu?.filter((tab) => tab.enable);

  return (
    <Drawer.Navigator
      id={"drawer-navigator"}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        overlayColor: "transparent",
        drawerStyle: { width: styleConfig.width * 0.65 },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {enabledTabs.map((tab) => {
        const ScreenComponent = DRAWER_SCREEN_MAP[tab.name];

        if (!ScreenComponent) return null;

        return (
          <Drawer.Screen key={tab.name} name={`drawer_${tab.name}`}>
            {(props) => (
              <AnimatedWrapper>
                <Stack.Navigator
                  id={`drawer_stack_${tab.name}`}
                  initialRouteName={`stack_${tab.name}`}   
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen
                    name={`stack_${tab.name}`}
                    component={ScreenComponent}
                  />
                </Stack.Navigator>
              </AnimatedWrapper>
            )}
          </Drawer.Screen>
        );
      })}
    </Drawer.Navigator>
  );
}

const exitRoutes = [`drawer_${TABS.MyGroups}`];
export const canExit = (routeName: any) => exitRoutes.includes(routeName);
