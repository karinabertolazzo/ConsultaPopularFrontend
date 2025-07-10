import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`;

const ToastMessage = styled.div`
  padding: 12px 24px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: white;
  background-color: ${props => 
    props.$type === 'success' ? '#28a745' : 
    props.$type === 'error' ? '#dc3545' : '#007bff'};
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export function Toast({ message, type, duration = 5000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? (
    <ToastMessage $type={type}>{message}</ToastMessage>
  ) : null;
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type, duration) => {
    const id = Date.now();
    setToasts(current => [...current, { id, message, type, duration }]);

    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id));
    }, duration || 5000);
  };

  // Aqui o useEffect escuta o evento 'show-toast' e chama showToast
  useEffect(() => {
    const handleToastEvent = (event) => {
      const { message, type, duration } = event.detail;
      showToast(message, type, duration);
    };

    window.addEventListener('show-toast', handleToastEvent);

    return () => {
      window.removeEventListener('show-toast', handleToastEvent);
    };
  }, []);

  return (
    <>
      {children}
      <ToastContainer>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </ToastContainer>
    </>
  );
}

export function useToast() {
  const showToast = (message, type, duration) => {
    const event = new CustomEvent('show-toast', {
      detail: { message, type, duration }
    });
    window.dispatchEvent(event);
  };

  return { showToast };
}
