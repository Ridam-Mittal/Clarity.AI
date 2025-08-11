import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';

// --- API and Model Setup ---
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction:
    "You are a highly intelligent and helpful AI assistant designed to explain and clarify concepts across all domains of knowledge — including science, mathematics, technology, humanities, economics, medicine, law, and more. Your responses should be accurate, concise, and tailored to the user’s level of understanding. Use simple language, analogies, and examples to aid comprehension. For programming-related queries, you may write or fix code using clear, well-commented snippets, and always format code in markdown. Do not engage with unrelated or inappropriate topics. Focus only on helping users learn, understand, and solve knowledge-based doubts."
});

// --- App Component ---

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) {
      Alert.alert('Error', 'Please enter a prompt to get a response.');
      return;
    }
    setLoading(true);
    setResult('');

    try {
      const res = await model.generateContent(prompt);
      const text = res.response.text();
      setResult(text);
      setPrompt('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred. Please check your network and API key.');
      setResult('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setPrompt('');
    setResult('');
  };

  return (
    <KeyboardAvoidingView
      style={darkStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={darkStyles.header}>
        <View style={darkStyles.headerLeft}>
          <Text style={darkStyles.title}>Clarity.AI</Text>
          <Text style={darkStyles.subtitle}>Smart AI Powered Concepts Explainer</Text>
        </View>
        <TouchableOpacity style={darkStyles.logoContainer}>
          <Text style={darkStyles.logoText}>AI</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={darkStyles.resultContainer} contentContainerStyle={darkStyles.resultContent}>
        {loading ? (
          <View style={darkStyles.loader}>
            <ActivityIndicator size="large" color="#64B5F6" />
          </View>
        ) : result ? (
          <View style={darkStyles.chatBubble}>
            <Markdown style={darkMarkdownStyles}>{result}</Markdown>
          </View>
        ) : (
          <Text style={darkStyles.placeholderText}>Ask Clarity to explain a concept or write code...</Text>
        )}
      </ScrollView>

      <View style={darkStyles.inputContainer}>
        <TextInput
          style={darkStyles.input}
          placeholder="Type your question..."
          value={prompt}
          onChangeText={setPrompt}
          editable={!loading}
          multiline={true}
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity
          style={[darkStyles.button, (loading || !prompt) && darkStyles.buttonDisabled]}
          onPress={handleGenerate}
          disabled={loading || !prompt}
        >
          <Text style={darkStyles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>

      <View style={darkStyles.actionButtons}>
        <TouchableOpacity style={darkStyles.actionButton} onPress={() => setPrompt('')}>
          <Text style={darkStyles.actionButtonText}>Clear Input</Text>
        </TouchableOpacity>
        <TouchableOpacity style={darkStyles.actionButton} onPress={handleClearChat}>
          <Text style={darkStyles.actionButtonText}>Clear Chat</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// --- Dark Mode Styles ---

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#1E1E1E',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerLeft: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 4,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  logoText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    padding: 15,
  },
  resultContent: {
    paddingBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  chatBubble: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333333',
    elevation: 3,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 120,
    fontSize: 16,
    backgroundColor: '#2D2D2D',
    color: '#E0E0E0',
  },
  button: {
    backgroundColor: '#64B5F6',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#444444',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  actionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#333333',
  },
  actionButtonText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const darkMarkdownStyles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#E0E0E0',
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#E0E0E0',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    color: '#E0E0E0',
  },
  code_block: {
  backgroundColor: '#1E1E1E',
  color: '#00FF95',
  padding: 12,
  borderRadius: 8,
  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  marginTop: 10,
  marginBottom: 10,
},
fence: {
  backgroundColor: '#1E1E1E',
  color: '#00FF95',
  padding: 12,
  borderRadius: 8,
  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  marginTop: 10,
  marginBottom: 10,
},
code_inline: {
  backgroundColor: '#1E1E1E',
  color: '#64D8CB', // or any bright color you prefer
  padding: 4,
  borderRadius: 4,
  fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
},
  list_item: {
    marginBottom: 5,
    color: '#E0E0E0',
  },
  bullet_list_icon: {
    color: '#64B5F6',
    fontSize: 16,
  },
});
