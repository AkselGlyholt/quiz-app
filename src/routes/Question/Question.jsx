import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./question.css";
import { FaCheck } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

const Question = () => {
  const { category, difficulty } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [stats, setStats] = useState({
    correct: 0,
    wrong: 0,
  });
  const [answered, setAnswered] = useState(false);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function decodeHTMLEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  useEffect(() => {
    const fetch = async () => {
      let urlString = "https://opentdb.com/api.php?amount=10&type=multiple";

      if (category && difficulty) {
        urlString = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;
      } else {
        urlString = `https://opentdb.com/api.php?amount=10&type=multiple`;
      }

      const response = await axios.get(urlString).catch((error) => {
        console.log(error);
      });

      if (response) {
        console.log(response);
        const data = response.data;
        const decodedResults = data.results.map((question) => ({
          ...question,
          question: decodeHTMLEntities(question.question),
          correct_answer: decodeHTMLEntities(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((answer) =>
            decodeHTMLEntities(answer)
          ),
        }));
        setQuestions(decodedResults);
        setCurrentQuestion(data.results[currentNumber]);

        const answerArr = [
          ...data.results[currentNumber].incorrect_answers,
          data.results[currentNumber].correct_answer,
        ];
        const shuffledArr = shuffle(answerArr);
        setAnswers(shuffledArr);
      }
    };

    setCurrentNumber(0);
    setAnswered(false);
    fetch();
  }, [category, difficulty]);

  useEffect(() => {
    if (questions.length > 0 && currentQuestion) {
      if (currentNumber < 10) {
        const nextQuestion = questions[currentNumber];
        setCurrentQuestion(nextQuestion);

        const answerArr = [
          ...nextQuestion.incorrect_answers,
          nextQuestion.correct_answer,
        ];
        const shuffledArr = shuffle(answerArr);
        setAnswers(shuffledArr);
      }
    }
  }, [currentNumber, questions]);

  const submit = (clickedButton, answer) => {
    const correctAnswer = currentQuestion.correct_answer;
    setAnswered(true);
    
    if (correctAnswer === answer) {
      setStats((prevStats) => ({
        ...prevStats,
        correct: prevStats.correct + 1,
      }));
      clickedButton.classList.add("correct")
    } else {
      setStats((prevStats) => ({
        ...prevStats,
        wrong: prevStats.wrong + 1,
      }));
      document.getElementById(correctAnswer.replace(" ", "-")).classList.add("right-answer")
      clickedButton.classList.add("wrong")
    }
  };

  const nextQuestion = () => {
    const nextNumber = currentNumber + 1;

    if (currentNumber === questions.length) {
      return;
    }

    const wrong = document.querySelector(".wrong")
    const correct = document.querySelector(".correct")
    const rightAnswer = document.querySelector(".right-answer")

    if (wrong) {
      wrong.classList.remove("wrong")
    }

    if (correct) {
      correct.classList.remove("correct")
    }

    if (rightAnswer) {
      rightAnswer.classList.remove("right-answer")
    }

    setAnswered(false);

    if (nextNumber < questions.length) {
      setCurrentNumber(nextNumber);
    } else {
      // Handle end of questions, maybe show a summary or navigate to another page
      setCurrentNumber(questions.length);
      console.log("Quiz completed");
      return;
    }
  };

  return (
    <div className="container">
      <div className="row-center">
        <div className="progress-bar--container">
          <div
            className="progress-bar"
            style={{
              width: `${(currentNumber / 10) * 100}%`,
            }}
          ></div>
        </div>
        {questions && questions.length !== currentNumber ? (
          <>
            <h1 className="question--title">Question</h1>
            <p className="sub-title question--question">
              {currentQuestion.question || "Loading..."}
            </p>
            <div className="question__info--container">
              <p className="question__info">
                <b>Category:</b>{" "}
                {category || decodeHTMLEntities(currentQuestion.category)}
              </p>
              <p className="question__info">
                <b>Difficulty: </b>
                {difficulty || decodeHTMLEntities(currentQuestion.difficulty)}
              </p>
            </div>
            <div className="answers--container">
              {answers.map((answer, index) => (
                <button
                  onClick={(event) => submit(event.target, answer)}
                  key={index}
                  className="answer"
                  disabled={answered}
                  id={answer.replace(" ", "-")}
                >
                  {answer}
                </button>
              ))}
            </div>
            {answered && (
              <button onClick={nextQuestion} className="click">
                Next Question
              </button>
            )}
          </>
        ) : (
          <>
            <h1 className="question--title">Completed</h1>
          </>
        )}
        <div className="stats--container">
          <div className="stat">
            <FaCheck></FaCheck>
            {stats.correct}
          </div>
          <div className="stat">
            <IoMdCloseCircle />
            {stats.wrong}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
