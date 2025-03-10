import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import { signIn, signOut } from "../../lib/appwrite";
import { getCurrentUser } from "../../lib/appwrite";
import { useGlobalContext } from "./../context/GlobalProvider";

const gotoHome = () => {
  console.log("going to home");

  router.push("/home");
};

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const Submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the required fields");
    }
    setisSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      console.log(`email: ${form.email} password: ${form.password}`);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Storie
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <CustomButton
            title="Sign In"
            handlePress={Submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          {/* <CustomButton
            title="Delete Session"
            handlePress={signOut}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <CustomButton
            title="Go to Home"
            handlePress={gotoHome}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          /> */}
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
