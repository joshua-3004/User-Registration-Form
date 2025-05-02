// src/components/RegistrationForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for form errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State for form submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State for password strength
  const [passwordStrength, setPasswordStrength] = useState('');
  
  // Ref for focusing input
  const nameInputRef = useRef(null);
  
  // Focus on name input when component mounts
  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  // Check if all form fields are valid
  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      errors.name === '' &&
      errors.email === '' &&
      errors.password === '' &&
      errors.confirmPassword === ''
    );
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    validateField(name, value);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        errorMessage = value.trim() === '' ? 'Name is required' : '';
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errorMessage = !emailRegex.test(value) ? 'Please enter a valid email address' : '';
        break;
        
      case 'password':
        errorMessage = value.length < 6 ? 'Password must be at least 6 characters' : '';
        // Check password strength
        if (value.length === 0) {
          setPasswordStrength('');
        } else if (value.length < 6) {
          setPasswordStrength('weak');
        } else if (value.length < 10) {
          setPasswordStrength('medium');
        } else {
          setPasswordStrength('strong');
        }
        
        // If confirm password is not empty, validate it again
        if (formData.confirmPassword) {
          setErrors(prev => ({
            ...prev,
            confirmPassword: formData.confirmPassword !== value ? 'Passwords do not match' : ''
          }));
        }
        break;
        
      case 'confirmPassword':
        errorMessage = value !== formData.password ? 'Passwords do not match' : '';
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Final validation check
    const fieldNames = Object.keys(formData);
    fieldNames.forEach(field => validateField(field, formData[field]));
    
    if (isFormValid()) {
      console.log('Form submitted successfully:', formData);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setPasswordStrength('');
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>
      
      {isSubmitted && (
        <div className="success-message">
          Registration successful! Thank you for registering.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameInputRef}
            className={`form-control ${errors.name ? 'error' : ''}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {passwordStrength && (
            <div className={`password-strength strength-${passwordStrength}`}></div>
          )}
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        
        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid()}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;