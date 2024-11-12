import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import TypingIndicator from '../components/TypingIndicator/TypingIndicator';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './ChatWindow.css';

function ChatWindow({ isSpeechEnabled, messages, setMessages, selectedLang }) {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Store the assistant's last response for quick replies
  const [previousResponse, setPreviousResponse] = useState(null);

  // Function to send user message
  const handleSend = async (userMessage) => {
    const userMessageObject = { text: userMessage, sender: 'user' };
    setMessages((prev) => [...prev, userMessageObject]);

    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://10.10.1.136:3001/generate-prompt',
        { 
          query: userMessage, 
          previous_response: previousResponse,
          lang: selectedLang.toLowerCase()
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessageObject = {
        text: response.data.response,
        sender: 'assistant',
      };

      setMessages((prev) => [...prev, botMessageObject]);
      setPreviousResponse(response.data.response); // Update the previousResponse
    } catch (error) {
      const errorMessages = {
        en: 'Sorry, something went wrong. Please try again later.',
        fr: 'Désolé, quelque chose a mal tourné. Veuillez réessayer plus tard.',
      };
      const errorMessage = {
        text: errorMessages[selectedLang.toLowerCase()] || errorMessages.en,
        sender: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  // Function to handle quick replies
  const handleQuickReply = (replyText) => {
    handleSend(replyText);
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
                  isLastMessage={index === messages.length - 1}
                  onQuickReply={handleQuickReply}
                />
              ))}
              {isLoading && <TypingIndicator />}
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
