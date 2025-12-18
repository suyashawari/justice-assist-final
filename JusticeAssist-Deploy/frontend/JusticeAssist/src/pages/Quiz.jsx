import React, { useState } from "react";
import "./Quiz.css"; // import CSS file

const Quiz = () => {
  const questions = [
    {
      question: "What should you do if you receive a suspicious email link?",
      options: [
        "Do not click, report as phishing",
        "Forward it to friends",
        "Enter your details to check",
      ],
      answer: 0,
    },
    {
      question: "Which is the safest type of password?",
      options: ["Your birthdate", "123456", "A long, unique mix of characters"],
      answer: 2,
    },
    {
      question: "What is the best way to verify if a website is genuine?",
      options: [
        "Check the URL carefully (https, spelling)",
        "Click any pop-up ad",
        "Trust if it looks professional",
      ],
      answer: 0,
    },
    {
      question: "If someone asks for your OTP over phone, what should you do?",
      options: [
        "Share it if they claim to be from the bank",
        "Never share OTP with anyone",
        "Ask them to call back later",
      ],
      answer: 1,
    },
    {
      question: "Which of these is a strong security practice?",
      options: [
        "Using the same password everywhere",
        "Two-Factor Authentication (2FA)",
        "Writing passwords on paper",
      ],
      answer: 1,
    },
    {
      question: "You receive a job offer asking for an advance fee. What is this?",
      options: ["Genuine offer", "Advance fee scam", "Survey request"],
      answer: 1,
    },
    {
      question: "Which of these files is most suspicious to open?",
      options: ["invoice.pdf", "holiday.jpg", "bonus_offer.exe"],
      answer: 2,
    },
    {
      question: "Public Wi-Fi is unsafe because?",
      options: [
        "Hackers can intercept your data",
        "It has slow internet speed",
        "It doesn’t need a password",
      ],
      answer: 0,
    },
    {
      question: "Which of these is the safest way to shop online?",
      options: [
        "Using secure websites with HTTPS",
        "Clicking on random ads for offers",
        "Sharing card details on WhatsApp",
      ],
      answer: 0,
    },
    {
      question: "What should you do if your social media account is hacked?",
      options: [
        "Ignore it",
        "Report and reset password immediately",
        "Tell friends to message the hacker",
      ],
      answer: 1,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);

    if (index === questions[current].answer) {
      setScore(score + 1);
    }

    // Delay so user sees feedback
    setTimeout(() => {
      const next = current + 1;
      if (next < questions.length) {
        setCurrent(next);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <p className="quiz-question">
            Q{current + 1}. {questions[current].question}
          </p>
          <div className="quiz-options">
            {questions[current].options.map((option, index) => {
              let optionClass = "quiz-option";
              if (selected !== null) {
                if (index === questions[current].answer) {
                  optionClass += " correct";
                } else if (index === selected) {
                  optionClass += " wrong";
                } else {
                  optionClass += " neutral";
                }
              }
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selected !== null}
                  className={optionClass}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="quiz-progress">
            Question {current + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="quiz-result">
          <h3>🎉 Quiz Completed!</h3>
          <p>
            Your Score: {score} / {questions.length}
          </p>
          <button
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setShowResult(false);
              setSelected(null);
            }}
            className="quiz-restart"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
