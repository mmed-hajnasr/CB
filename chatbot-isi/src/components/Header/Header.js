import React from 'react';
import { Navbar, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

function Header({ toggleSidebar, toggleSpeech, isSpeechEnabled, setLanguage, currentLanguage }) {
  // Only French (FR) and English (EN) are available
  const languages = ['FR', 'EN'];

  return (
    <Navbar bg="dark" variant="dark" fixed="top" className="px-3">
      <Button variant="outline-light" onClick={toggleSidebar} className="me-2">
        ☰
      </Button>
      <div className="d-flex justify-content-center w-100">
        <Navbar.Brand>ISI Chatbot</Navbar.Brand>
      </div>
      <div className="d-flex align-items-center">
        <Button variant="outline-light" onClick={toggleSpeech} className="me-2">
          {isSpeechEnabled ? <GiSpeaker size={30} /> : <GiSpeakerOff size={30} />} {/* Adjust the size here */}
        </Button>

        {/* Language selection dropdown */}
        <DropdownButton
          variant="outline-light"
          title={currentLanguage === 'FR' ? 'Français' : 'English'} 
          id="language-dropdown"
          className="me-2"
          onSelect={(lang) => setLanguage(lang)}  
        >
          {languages.map((lang, index) => (
            <Dropdown.Item key={index} eventKey={lang}>
              {lang === 'FR' ? 'Français' : 'English'} 
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
    </Navbar>
  );
}

export default Header;
