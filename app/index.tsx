import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput as RNTextInput,
} from "react-native";
import { TextInput } from "react-native-paper";
import tw from "@/lib/tailwind";
import { fbDB } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { debounce } from "lodash";

export default function Index() {
  const [query, setQuery] = useState<string>("");
  const [pendingUpdate, setPendingUpdate] = useState<string | undefined>(
    undefined
  );

  const inputRef = useRef<RNTextInput | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const docRef = doc(fbDB, "notes", "tab1");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.content) {
            setQuery(data.content.replace(/\\n/g, "\n"));
          }
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (pendingUpdate !== undefined) {
      debouncedSaveContent(pendingUpdate);
      setPendingUpdate(undefined);
    }
  }, [pendingUpdate]);

  function handleOnChangeText(text: string): void {
    setQuery(text);
    setPendingUpdate(text);
  }

  const debouncedSaveContent = useCallback(
    debounce(async (text: string) => {
      try {
        const docRef = doc(fbDB, "notes", "tab1");
        await setDoc(docRef, {
          content: text.replace(/\n/g, "\\n"),
          timestamp: new Date(),
        });
      } catch (error: any) {
        console.error(error);
      }
    }, 1000),
    []
  );

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
          onChangeText={handleOnChangeText}
          keyboardAppearance={tw.color("dark-name")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
