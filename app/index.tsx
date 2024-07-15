import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RNTextInput,
} from "react-native";
import { TextInput } from "react-native-paper";
import tw from "@/lib/tailwind";

export default function Index() {
  const [query, setQuery] = useState<string>("");

  const inputRef = useRef<RNTextInput | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={tw`flex-1 p-8 bg-light-base-100 dark:bg-dark-base-100`}>
        <TextInput
          ref={inputRef}
          style={tw`flex-1 bg-light-base-200 dark:bg-dark-base-200 text-lg`}
          underlineStyle={tw`w-0`}
          textColor={tw.color("dark-base-text")}
          theme={{
            colors: {
              primary: tw.color("dark-base-text"),
              onSurfaceVariant: tw.color("dark-base-text"),
            },
          }}
          label="..."
          value={query}
          multiline
          onChangeText={(text) => setQuery(text)}
          keyboardAppearance={tw.color("dark-name")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
