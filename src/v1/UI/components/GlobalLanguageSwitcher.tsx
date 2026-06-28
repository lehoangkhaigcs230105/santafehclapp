import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  getAppLanguage,
  setAppLanguage,
} from "@/v1/logics/services/LanguageService";

const LANGUAGE_OPTIONS = [
  ["en", "English"],
  ["vi", "Vietnamese"],
  ["zh", "Chinese"],
  ["kr", "Korean"],
  ["es", "Spanish"],
] as const;

export default function GlobalLanguageSwitcher() {
  const insets = useSafeAreaInsets();
  const [selectedLang, setSelectedLang] = useState("en");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    (async () => {
      const language = await getAppLanguage();
      setSelectedLang(language);
    })();
  }, []);

  useEffect(() => {
    position.setValue({
      x: 0,
      y: -(Math.max(insets.bottom + 16, 24)),
    });
  }, [insets.bottom, position]);

  const currentLanguageLabel = useMemo(
    () =>
      LANGUAGE_OPTIONS.find(([code]) => code === selectedLang)?.[1] ?? "English",
    [selectedLang]
  );

  const handleChangeLanguage = async (language: string) => {
    const nextLanguage = await setAppLanguage(language);
    setSelectedLang(nextLanguage);
    setOpen(false);
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > 4 || Math.abs(gestureState.dy) > 4,
        onPanResponderGrant: () => {
          position.stopAnimation((value) => {
            dragOffset.current = value;
          });
        },
        onPanResponderMove: (_, gestureState) => {
          position.setValue({
            x: dragOffset.current.x + gestureState.dx,
            y: dragOffset.current.y + gestureState.dy,
          });
        },
        onPanResponderRelease: (_, gestureState) => {
          dragOffset.current = {
            x: dragOffset.current.x + gestureState.dx,
            y: dragOffset.current.y + gestureState.dy,
          };
        },
      }),
    [position]
  );

  return (
    <View pointerEvents="box-none" style={styles.portal}>
      {open && <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />}

      <Animated.View
        style={[
          styles.anchor,
          {
            transform: position.getTranslateTransform(),
            bottom: 0,
          },
        ]}
        {...panResponder.panHandlers}
      >
        {hidden ? (
          <TouchableOpacity
            activeOpacity={0.92}
            onPress={() => setHidden(false)}
            style={styles.reopenButton}
          >
            <Ionicons name="language-outline" size={18} color="#143d60" />
          </TouchableOpacity>
        ) : (
          <View style={styles.controlsRow}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setOpen((value) => !value)}
              style={styles.trigger}
            >
              <Ionicons name="language-outline" size={18} color="#143d60" />
              <Text style={styles.triggerText}>{currentLanguageLabel}</Text>
              <Ionicons
                name={open ? "chevron-down" : "chevron-up"}
                size={14}
                color="#143d60"
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setOpen(false);
                setHidden(true);
              }}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={14} color="#143d60" />
            </TouchableOpacity>
          </View>
        )}

        {open && (
          <View style={styles.dropdown}>
            {LANGUAGE_OPTIONS.map(([code, label]) => {
              const active = selectedLang === code;

              return (
                <TouchableOpacity
                  key={code}
                  activeOpacity={0.88}
                  onPress={() => handleChangeLanguage(code)}
                  style={styles.option}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {label}
                  </Text>
                  {active && <Ionicons name="checkmark" size={16} color="#174d52" />}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  portal: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    pointerEvents: "box-none",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  anchor: {
    position: "absolute",
    right: 14,
    alignItems: "flex-end",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trigger: {
    minHeight: 40,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderWidth: 1,
    borderColor: "#d9e4ec",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    shadowColor: "#173c63",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderWidth: 1,
    borderColor: "#d9e4ec",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#173c63",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  reopenButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderWidth: 1,
    borderColor: "#d9e4ec",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#173c63",
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#143d60",
  },
  dropdown: {
    marginTop: 8,
    minWidth: 170,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d9e4ec",
    paddingVertical: 6,
    shadowColor: "#173c63",
    shadowOpacity: 0.14,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  option: {
    minHeight: 42,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: {
    fontSize: 14,
    color: "#334a5f",
    fontWeight: "500",
  },
  optionTextActive: {
    color: "#174d52",
    fontWeight: "700",
  },
});
