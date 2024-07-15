import { View, Text, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

interface FaceIDAuthProps {
  onAuthenticate: () => void;
}

export default function FaceIDAuth({ onAuthenticate }: FaceIDAuthProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authFailed, setAuthFailed] = useState(false);

  useEffect(() => {
    authenticate();
  }, []);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      setAuthFailed(true);
      setIsAuthenticating(false);
      return;
    }

    const supported =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (supported.length === 0) {
      setAuthFailed(true);
      setIsAuthenticating(false);
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      await handleSignInAnonymously();
      onAuthenticate();
    } else {
      setAuthFailed(true);
    }
    setIsAuthenticating(false);
  };

  const handleSignInAnonymously = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Error signing in anonymously:", error.message);
    }
  };

  if (isAuthenticating) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      {authFailed ? (
        <Text>Authentication Failed</Text>
      ) : (
        <Button title="Try Again" onPress={authenticate} />
      )}
    </View>
  );
}
