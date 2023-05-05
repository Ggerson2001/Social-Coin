import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '8px', // added rounded corners to the modal
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)', // added a box shadow for depth
        width: '450px', // increase the width of the modal
        maxWidth: '600px', // set a max width to prevent the modal from becoming too large
        maxHeight: '80%', // set a max height to prevent the modal from extending beyond the viewport
        overflow: 'auto' // add scrollbars if the content overflows the modal's height
      }
};

function MyModal(props) {
  const { isOpen, closeModal, type, message } = props;

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2>{type.toUpperCase()}</h2>
      <p>{message}</p>
      <button style={{ 
  backgroundColor: '#4CAF50', 
  border: 'none', 
  color: 'white', 
  padding: '8px 16px', 
  textAlign: 'center', 
  textDecoration: 'none', 
  display: 'inline-block', 
  fontSize: '16px', 
  marginTop: '16px', 
  cursor: 'pointer',
  borderRadius: '8px'  }}
  className="modal-button" onClick={closeModal}>Close Modal</button>
    </Modal>
  );
}

export default MyModal;

