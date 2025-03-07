import React, { useState, useRef, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Animated, Image 
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../services/authService"; 
import { auth } from "../Utility/firebaseConfig";
import { Button } from "react-native-paper";

export default function LoginFormPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); 

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate("Home"); 
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const userInfo = await authService.signInWithGoogleAuth();
      Alert.alert("Success", "Logged in with Google successfully!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.loginBox, { opacity: fadeAnim }]}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Log In</Text>

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* Log In Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            icon="login"
            uppercase={false}
            contentStyle={{ height: 50, backgroundColor: "#213555" }}
            style={styles.paperButton}
            labelStyle={{ fontWeight: "700", fontSize: 16 }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            Log In
          </Button>
        </Animated.View>

        <Text style={styles.orText}>Or</Text>
        
        {/* Google Button with Logo */}
        <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButton}>
          <Image 
            source={require('../assets/google-logo.png')} // Add your Google logo image here
            style={styles.googleLogo}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
  },
  loginBox: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#182952",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F1F1F1",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F1F1F1",
    color: "#000",
    borderRadius: 8,
    width: "100%",
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  paperButton: {
    width: "100%", 
    borderRadius: 25,
    marginBottom: 15,
    elevation: 8,
    marginTop: 10,
    alignSelf: 'center',  
  },
  orText: {
    marginVertical: 10,
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: 8,
  },
  backButtonText: {
    color: "#F1F1F1",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    width: '80%',
    alignSelf: 'center',
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: "#fff", 
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 24,
    height: 24,
  }
});
