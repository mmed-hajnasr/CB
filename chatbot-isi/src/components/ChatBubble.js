import React, { useEffect } from 'react';
import './ChatBubble.css'; // You can keep the CSS minimal if needed
import { AiOutlineRobot } from 'react-icons/ai'; // Assistant Icon

function ChatBubble({ text, sender, isSpeechEnabled, isLastMessage, currentLang }) {
  useEffect(() => {
    if (isSpeechEnabled && sender === 'assistant' && text && isLastMessage) {
      // Cancel any ongoing speech to prevent duplicate reads
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      utterance.lang = currentLang === 'FR' ? 'fr-FR' : 'en-US'; 
      
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === utterance.lang) || speechSynthesis.getVoices()[0];
      utterance.rate = 1;
      utterance.pitch = 1;
      
      console.log(text, sender);
      speechSynthesis.speak(utterance);
    }
  }, [text, sender, isSpeechEnabled, isLastMessage, currentLang]);

  return (
    <div className={`d-flex ${sender === 'assistant' ? 'align-items-start' : 'justify-content-end'}`}>
      {sender === 'assistant' && (
        <div className="me-2">
          <AiOutlineRobot size={30} />
        </div>
      )}
      <div className={`chat-bubble ${sender}`}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChatBubble;
