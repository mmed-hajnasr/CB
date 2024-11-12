import React, { useState, useEffect } from 'react';
import './ChatInput.css';
import { IoSend } from "react-icons/io5";
import { FaMicrophoneLines } from "react-icons/fa6";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function ChatInput({ onSend, isLoading, selectedLang }) {
  const [input, setInput] = useState('');
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Start or stop listening based on the microphone button click
  const handleMicrophoneClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      // Start listening with the language passed from props (either "en-US" or "fr-FR")
      SpeechRecognition.startListening({ continuous: true, language: selectedLang.toLowerCase() });
    }
  };

  // Handle sending the message
  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
      resetTranscript(); // Reset transcript after sending
    }
  };

  // Update the input field with real-time transcript
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  // Automatically send the message when speech recognition stops listening
  useEffect(() => {
    if (!listening && transcript.trim()) {
      // Delay the handleSend call to ensure `input` is updated
      const delaySend = setTimeout(handleSend, 200);
      return () => clearTimeout(delaySend);
    }
  }, [listening, transcript]);

  // Update the input field for typed messages
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle pressing Enter to send the message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-input">
      {/* Microphone Icon for Voice-to-Text */}
      <button onClick={handleMicrophoneClick} className="send-button" disabled={isLoading}>
        <FaMicrophoneLines className={listening ? "listening" : ""} />
      </button>

      {/* Input field for typing messages */}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading} // Disable input while loading
      />

      {/* Send Icon to send the typed message */}
      <button onClick={handleSend} className="send-button" disabled={isLoading}>
        <IoSend />
      </button>
    </div>
  );
}

export default ChatInput;
