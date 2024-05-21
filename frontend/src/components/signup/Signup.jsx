import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation
import "./signup.css";

const Signup = () => {
  const [quote, setQuote] = useState("");

  const quotes = useMemo(
    () => [
      "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
      "The only way to do great work is to love what you do. - Steve Jobs",
      "In the middle of difficulty lies opportunity. - Albert Einstein",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "It does not matter how slowly you go as long as you do not stop. - Confucius",
      "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
      "The way to get started is to quit talking and begin doing. - Walt Disney",
      "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
      "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    ],
    []
  );

  useEffect(() => {
    const initialQuoteIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[initialQuoteIndex]);
  }, [quotes]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="signup-form">
              <h1 className="sign-up-heading">Sign Up</h1>
              <div className="input-group mb-3">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="form-control"
                  name="email"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  placeholder="Type your username"
                  className="form-control"
                  name="username"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  name="password"
                />
              </div>
              <button className="btn btn-primary w-100">Sign Up</button>
              <p className="mt-3">Already have an account? <Link to="/signin">Sign in</Link></p>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="quote-container">
              <p className="quote">{quote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
