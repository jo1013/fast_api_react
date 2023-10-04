import React from 'react';
import SignupForm from '../component/SignupForm';
import './Signup.css';

function Signup() {
    const handleSignup = (formData) => {
        // TODO: 회원가입 로직 (API 호출 등)
        console.log('User registered:', formData);
    };

    return (
        <div className="signup-page">
            <h1>회원가입</h1>
            <SignupForm onSubmit={handleSignup} />
        </div>
    );
}

export default Signup;
