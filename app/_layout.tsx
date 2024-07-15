import { useState } from "react";
import { Stack } from "expo-router";
import tw from "@/lib/tailwind";
import { useDeviceContext } from "twrnc";
import FaceIDAuth from "@/components/FaceIDAuth";

export default function RootLayout() {
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: "dark",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <FaceIDAuth onAuthenticate={handleAuthenticate} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: tw.color("dark-base-100"),
          },
        }}
      />
    </Stack>
  );
}
