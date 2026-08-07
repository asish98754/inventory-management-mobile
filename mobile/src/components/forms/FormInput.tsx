import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  ...props
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        {...props}
        style={[
          styles.input,
          error && styles.inputError,
        ]}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },

  inputError: {
    borderColor: "#F44336",
  },

  error: {
    color: "#F44336",
    fontSize: 13,
    marginTop: 5,
  },
});