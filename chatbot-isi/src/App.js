import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);  // This will store the selected chat messages
  const [currentLanguage, setCurrentLanguage] = useState('FR');  // Default language set to French (FR)

  const toggleSpeech = () => setIsSpeechEnabled(!isSpeechEnabled);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Function to handle when a user selects a chat and update currentMessages
  const handleSelectChat = (messages) => {
    setCurrentMessages(messages);  // Update the current chat messages
  };
  // Function to handle language change
  const setLanguage = (language) => {
    if (language === 'FR' || language === 'EN') {
      setCurrentLanguage(language);  // Only allow FR or EN
    }
  };
  // Filter messages to exclude the ones sent by the user (sent by the assistant)
  const filteredMessages = messages
    .filter((message) => message.sender === 'assistant')
    .map((message) => message.text);  // Only extract the text of the assistant's messages
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} toggleSpeech={toggleSpeech} isSpeechEnabled={isSpeechEnabled} setLanguage={setLanguage} 
        currentLanguage={currentLanguage} />
      <ChatWindow isSpeechEnabled={isSpeechEnabled} messages={messages} setMessages={setMessages} selectedLang={currentLanguage}/>
      <Sidebar 
        chatHistory={[]}  // Pass filtered messages (excluding sent ones)
        currentChat={filteredMessages} 
        show={showSidebar} 
        handleClose={toggleSidebar} 
        onSelectChat={handleSelectChat} 
        setCurrentChat={setMessages}
      /> 
    </div>
  );
}

export default App;
