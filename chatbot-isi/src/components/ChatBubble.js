import React, { useEffect } from 'react';
import './ChatBubble.css';
import { AiOutlineRobot } from 'react-icons/ai';

function ChatBubble({ text, sender, isSpeechEnabled, isLastMessage, currentLang, onQuickReply }) {
  useEffect(() => {
    if (isSpeechEnabled && sender === 'assistant' && text && isLastMessage) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = currentLang === 'FR' ? 'fr-FR' : 'en-US';
      utterance.voice = speechSynthesis.getVoices().find(voice => voice.lang === utterance.lang) || speechSynthesis.getVoices()[0];
      speechSynthesis.speak(utterance);
    }
  }, [text, sender, isSpeechEnabled, isLastMessage, currentLang]);

  // Translated button labels based on current language
  const translateButton = (label) => {
    const translations = {
      yes: currentLang === 'FR' ? 'Oui' : 'Yes',
      no: currentLang === 'FR' ? 'Non' : 'No',
      moreInfo: currentLang === 'FR' ? 'Plus d\'information' : 'More information'
    };
    return translations[label];
  };

  // Check if the assistant's message is a question
  const isQuestion = text.trim().endsWith('?');

  return (
    <div className={`d-flex ${sender === 'assistant' ? 'align-items-start' : 'justify-content-end'}`}>
{sender === 'assistant' && (
        <div className="me-2">
          <iframe
            src="https://lottie.host/embed/e1c4aeb2-8d33-43d1-a0d7-d5e44450a53a/2I9RNdinHH.json"
            style={{
              width: '50px', 
              height: '50px', 
              border: 'none',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
            title="Assistant Animation"
          ></iframe>
        </div>
      )}
      <div className={`chat-bubble ${sender}`}>
        <p>{text}</p>
        {sender === 'assistant' && isLastMessage && isQuestion && (
          <div className="button-group mt-2">
            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => onQuickReply(translateButton('yes'))}>
              {translateButton('yes')}
            </button>
            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => onQuickReply(translateButton('no'))}>
              {translateButton('no')}
            </button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => onQuickReply(translateButton('moreInfo'))}>
              {translateButton('moreInfo')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
