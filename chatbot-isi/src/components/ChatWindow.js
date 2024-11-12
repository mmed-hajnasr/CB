import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import TypingIndicator from '../components/TypingIndicator/TypingIndicator';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // For making HTTP requests
import './ChatWindow.css';

function ChatWindow({ isSpeechEnabled , messages , setMessages , selectedLang }) {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null); // Ref for the end of the messages container

  const handleSend = async (userMessage) => {
    const userMessageObject = { text: userMessage, sender: 'user' };
    setMessages((prev) => [...prev, userMessageObject]);

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://10.10.1.136:3001/generate-prompt',
        { 
          query: userMessage, 
          previous_response: null 
        },
        { 
          headers: { "Content-Type": "application/json" } // Explicitly set JSON content type
        }
      );

      const botMessageObject = {
        text: response.data.response,
        sender: 'assistant',
      };

      setMessages((prev) => [...prev, botMessageObject]);
      console.log(messages)
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessages = {
        en: 'Sorry, something went wrong. Please try again later.',
        fr: 'Désolé, quelque chose a mal tourné. Veuillez réessayer plus tard.',
      };
      
      // Use the selected language to get the appropriate error message
      const errorMessage = {
        text: errorMessages[selectedLang.toLowerCase()] || errorMessages.en, // Default to English if the selected language is not found
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
    console.log(messages)

    setIsLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  text={message.text}
                  sender={message.sender}
                  isSpeechEnabled={isSpeechEnabled}
                  currentLang={selectedLang}
                  isLastMessage={index === messages.length - 1} // Mark the last message
                />
              ))}
              {isLoading && <TypingIndicator />} {/* Display typing indicator when loading */}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput onSend={handleSend} isLoading={isLoading} selectedLang={selectedLang} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ChatWindow;
