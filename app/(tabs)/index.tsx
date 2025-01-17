import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // استخدم مكتبة FontAwesome للأيقونات

// تعريف الواجهات
interface Verse {
  text: string;
}

interface Surah {
  name: string;
  verses: Verse[];
}

// الكود الرئيسي
const QuranApp = () => {
  const [quran, setQuran] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // تحميل البيانات من JSON المحلي
  useEffect(() => {
    const loadQuranData = async () => {
      try {
        const data = require("../../assets/quran.json"); // تأكد من المسار الصحيح
        setQuran(data);
      } catch (error) {
        console.error("Error loading Quran data:", error);
      }
    };

    loadQuranData();
  }, []);

  // عرض السور
  const displaySurahs = () => {
    const filteredSurahs = quran.filter((surah) =>
      surah.name.includes(search)
    );
    return filteredSurahs.length > 0 ? (
      filteredSurahs.map((surah, index) => (
        <View key={index} style={styles.surah}>
          <TouchableOpacity style={styles.surahHeader}>
            <FontAwesome name="book" size={20} color="#007bff" />
            <Text style={styles.surahTitle}>{surah.name}</Text>
          </TouchableOpacity>
          <ScrollView style={styles.verses}>
            {surah.verses.map((verse, i) => (
              <Text key={i} style={styles.verseText}>
                {verse.text}
              </Text>
            ))}
          </ScrollView>
        </View>
      ))
    ) : (
      <Text style={styles.noResults}>لا توجد نتائج مطابقة</Text>
    );
  };

  // تبديل الوضع الداكن
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // إظهار رقم الدعم الفني
  const showSupportNumber = () => {
    Alert.alert("الدعم الفني", "رقم الدعم الفني: 01144365046", [
      { text: "موافق" },
    ]);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkModeContainer]}>
      <Text style={styles.title}>تطبيق القرآن الكريم</Text>
      <TouchableOpacity
        style={[styles.button, styles.darkModeButton]}
        onPress={toggleDarkMode}
      >
        <Text style={styles.buttonText}>
          {darkMode ? "إيقاف الوضع الداكن" : "تشغيل الوضع الداكن"}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="ابحث عن سورة..."
        onChangeText={setSearch}
        value={search}
      />
      <ScrollView style={styles.surahList}>{displaySurahs()}</ScrollView>
      <TouchableOpacity style={styles.supportButton} onPress={showSupportNumber}>
        <FontAwesome name="phone" size={20} color="#fff" />
        <Text style={styles.supportButtonText}>تواصل مع الدعم الفني</Text>
      </TouchableOpacity>
    </View>
  );
};

// الأنماط
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f4f6",
  },
  darkModeContainer: {
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#3b3a3a",
  },
  input: {
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  surahList: {
    marginTop: 10,
  },
  surah: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  surahHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  surahTitle: {
    fontSize: 18,
    color: "#007bff",
    marginLeft: 10,
  },
  verses: {
    maxHeight: 200,
  },
  verseText: {
    fontSize: 16,
    marginBottom: 5,
  },
  noResults: {
    textAlign: "center",
    color: "#ff0000",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  darkModeButton: {
    backgroundColor: "#444",
  },
  supportButton: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  supportButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default QuranApp;
