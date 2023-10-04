import React, { useState } from 'react';
import './SignupForm.css';

function SignupForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        username: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        let formErrors = {};

        if (!formData.username) formErrors.username = "이름을 입력하세요.";
        if (!formData.nickname) formErrors.nickname = "닉네임을 입력하세요.";
        if (!formData.email) formErrors.email = "이메일을 입력하세요.";
        if (!formData.password) formErrors.password = "비밀번호를 입력하세요.";
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="signup-form">
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>이름</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
                <div className="input-group">
                    <label>닉네임</label>
                    <input 
                        type="text" 
                        name="nickname" 
                        value={formData.nickname} 
                        onChange={handleChange} 
                        required
                    />
                    {errors.nickname && <p className="error">{errors.nickname}</p>}
                </div>
                <div className="input-group">
                    <label>이메일</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="input-group">
                    <label>비밀번호</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="input-group">
                    <label>비밀번호 확인</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <div className="input-group">
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;
