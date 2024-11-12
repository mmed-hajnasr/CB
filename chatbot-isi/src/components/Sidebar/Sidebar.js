import React, { useEffect, useState } from 'react';
import { ListGroup, Card, Button, Offcanvas } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider, signInWithPopup } from '../FireBase/firebase'; 
import { signOut } from 'firebase/auth'; 
import Web3 from 'web3';
import chatHistoryABI from './contractABI';  // Import the ABI for your smart contract

function Sidebar({ show, handleClose, onSelectChat , currentChat , setCurrentChat}) {
  const [user, loading, error] = useAuthState(auth);
  const [chatHistory, setChatHistory] = useState([]);
  const [isSavingChat, setIsSavingChat] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Initialize Web3 and contract
  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(chatHistoryABI, '0x4ADC74e57162B4a8B4A335C7bbea28cA318AEc7B'); // Replace with your contract address
      setContract(contractInstance);
    } else {
      console.error('Please install MetaMask or an Ethereum-compatible browser extension.');
    }
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider); // Trigger Google login
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out
      setChatHistory([])
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const startNewChat = () => {
    setCurrentChat([]);  // Clear the selected messages as well
  };
  // Function to fetch chat history
  const fetchChatHistory = async () => {
    setIsLoadingHistory(true);
    if (web3 && contract && user) {
      try {
        const accounts = await web3.eth.getAccounts();
        const history = await contract.methods.getChatHistory(user.uid).call({ from: accounts[0] });
        setChatHistory(history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    }
  };

  // Function to save the chat history
  const saveChatHistory = async (chatMessages) => {
    if (web3 && contract && user) {
      setIsSavingChat(true);
      try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addChatBlock(user.uid, chatMessages).send({ from: accounts[0] });
        alert("Chat saved successfully!");
      } catch (error) {
        console.error("Error saving chat:", error);
      } finally {
        setIsSavingChat(false);
      }
  }
};

  const handleChatHistoryClick = (messages) => {
    onSelectChat(messages);  // Pass the selected messages to the parent component
  };

  // Fetch chat history when the user is logged in
  useEffect(() => {
    if (user && web3 && contract) {
      fetchChatHistory();
    }
  }, [user, web3, contract]);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>ISI Chatbot</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* New Chat Button */}
        <div className="d-flex justify-content-center">
          <Button variant="secondary" onClick={startNewChat} className="mb-3">
            Start New Chat
          </Button>
        </div>

        <hr />
        <Card.Title>Chat History</Card.Title>
        {user && currentChat.length > 0 && (
          <div className="d-flex justify-content-center mb-3">
            <Button
              variant="success"
              onClick={() => saveChatHistory(currentChat)}  // Replace with actual chat messages
              disabled={isSavingChat}
              className='mt-2'
            >
              {isSavingChat ? "Saving..." : "Save Current Chat"}
            </Button>
          </div>
        )}
        {/* Show login button if user is not logged in */}
        {!user && (
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleLogin} className="m-3">
              Login
            </Button>
          </div>
        )}

        <br />
        

        {/* Display Chat History or Message */}
        {user && isLoadingHistory ? (
          <div className="d-flex justify-content-center">
            <p>Loading chat history...</p>
          </div>
        ) : (
          <>
            {chatHistory.length > 0 ? (
              <ListGroup>
                <ListGroup.Item><strong>Saved Chats:</strong></ListGroup.Item>
                {chatHistory.map((block, index) => (
                  <ListGroup.Item key={index} onClick={() => handleChatHistoryClick(block.messages)}>
                    <strong>Timestamp:</strong> {new Date(Number(block.timestamp) * 1000).toLocaleString()}
                    <ul>
                      {block.messages.map((message, idx) => (
                        <li key={idx}>{message}</li>
                      ))}
                    </ul>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <div className="d-flex justify-content-center">
                <p>No saved chats found</p>
              </div>
            )}
          </>
        )}

        {/* Sign-Out Button (only show if logged in) */}
        {user && (
          <div className="d-flex justify-content-center">
            <hr />
            <Button variant="danger" onClick={handleLogout} className="mt-3">
              Sign Out
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Sidebar;
