// client/src/components/Modal.jsx
import React from 'react';
import ReactModal from 'react-modal';
import './Modal.css';

ReactModal.setAppElement('#root');

const Modal = ({ user, onClose }) => {
  return (
    <ReactModal isOpen={!!user} onRequestClose={onClose} className="modal" overlayClassName="overlay">
      <div className="modal-content">
        <h2>Student Details</h2>
        <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
        <p> <strong>Program :</strong> {user.program}</p> 
         <p><strong>Start Year :</strong> {user.year}</p>
          <p><strong> Date Of Birth :</strong> {user.dob}</p>
                 
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </ReactModal>
  );
};

export default Modal;


// - {user.Previous_School} - {user.BECE_aggregrate} - {user.mothers_name} - {user.mothers_contact} - {user.fathers_name}
// - {student.fathers_contact}</p>