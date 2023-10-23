import React, { useState } from 'react';
import axios from 'axios';
import SignupForm from '../../component/UserForm/SignupForm';
import { CircularProgress, Snackbar, Alert } from '@mui/material';
import './Signup.css';

function Signup() {
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [feedbackMsg, setFeedbackMsg] = useState(null); // 피드백 메시지
    const [alertType, setAlertType] = useState("success"); // Alert type for feedback message

    const handleSignup = async (formData) => {
        setIsLoading(true);
        
        // TODO: 실제 회원가입 로직 (API 호출 등)
        // Example: 
        // const response = await signUpApi(formData);
        
        // For demo:
        axios.post(`http://localhost:8001/auth/signup`, formData)
        setTimeout(() => {
            setIsLoading(false);
            setAlertType("success");
            setFeedbackMsg('성공적으로 등록되었습니다.');
        }, 1500);
    };

    const closeFeedback = () => {
        setFeedbackMsg(null);
    };

    return (
        <div className="signup-page">
            <h1>회원가입</h1>
            {isLoading ? (
                <CircularProgress /> // 로딩 인디케이터
            ) : (
                <SignupForm onSubmit={handleSignup} />
            )}
            
            {/* Feedback Snackbar */}
            {feedbackMsg && (
                <Snackbar open autoHideDuration={6000} onClose={closeFeedback}>
                    <Alert onClose={closeFeedback} severity={alertType}>
                        {feedbackMsg}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default Signup;
