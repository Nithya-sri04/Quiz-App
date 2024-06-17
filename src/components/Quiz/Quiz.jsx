import React, { useState, useRef, useEffect } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

// Function to shuffle an array
const shuffleArray = (array) => {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Quiz = () => {
  const getInitialQuestions = () => shuffleArray(data).slice(0, 10);

  const [questions, setQuestions] = useState(getInitialQuestions);
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(questions[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const optionArray = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    setQuestion(questions[index]);
  }, [index, questions]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add('wrong');
        optionArray[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === questions.length - 1) {
        setResult(true);
      } else {
        setIndex(prevIndex => prevIndex + 1);
        setLock(false);
        optionArray.forEach(option => {
          option.current.classList.remove('wrong');
          option.current.classList.remove('correct');
        });
      }
    }
  };

  const reset = () => {
    const newQuestions = getInitialQuestions();
    setQuestions(newQuestions);
    setIndex(0);
    setQuestion(newQuestions[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>You scored {score} out of {questions.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {questions.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
