import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";

function AndroidPrompt(props, ref) {
  const { onCancelProps } = props;
  const [_visible, _setVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hintText, setHintText] = useState("");
  const animValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (ref) {
      ref.current = {
        setVisible: _setVisible,
        setHintText,
      };
    }
  }, [ref]);
  useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 300,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        setHintText("");
      });
    }
  }, [_visible, animValue]);

  const backdropAnimStyle = {
    opacity: animValue,
  };
  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0],
        }),
      },
    ],
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <Animated.View
          style={[styles.backdrop, StyleSheet.absoluteFill, backdropAnimStyle]}
        />
        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <Text style={styles.hint}>{hintText || "Ready to scan NFC"}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              _setVisible(false);
              onCancelProps();
            }}
          >
            <Text>CANCEL</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  prompt: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: Dimensions.get("window").width - 2 * 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    fontSize: 24,
    marginBottom: 20,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
  },
  innerView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "pink",
  },
});

export default React.forwardRef(AndroidPrompt);
