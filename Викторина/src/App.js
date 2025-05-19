import React, { useState } from 'react';
import './App.css'; // Импорт файла стилей

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      text: 'Что такое переменная в программировании?',
      options: [
        { text: 'Место в памяти для хранения данных', isCorrect: true },
        { text: 'Команда для вывода текста на экран', isCorrect: false },
        { text: 'Тип данных', isCorrect: false },
        { text: 'Название функции', isCorrect: false },
      ],
    },
    {
      text: 'Что такое цикл в программировании?',
      options: [
        { text: 'Блок кода, который выполняется только один раз', isCorrect: false },
        { text: 'Инструкция для остановки программы', isCorrect: false },
        { text: 'Блок кода, который выполняется несколько раз', isCorrect: true },
        { text: 'Функция для преобразования данных', isCorrect: false },
      ],
    },
    {
      text: 'Что такое функция в программировании?',
      options: [
        { text: 'Переменная, которая хранит число', isCorrect: false },
        { text: 'Блок кода, который выполняет определенную задачу', isCorrect: true },
        { text: 'Инструкция для присваивания значения переменной', isCorrect: false },
        { text: 'Способ описания внешнего вида сайта', isCorrect: false },
      ],
    },
    {
      text: 'Что такое условный оператор?',
      options: [
        { text: 'Оператор для сложения чисел', isCorrect: false },
        { text: 'Оператор для умножения чисел', isCorrect: false },
        { text: 'Оператор, который выполняет код в зависимости от условия', isCorrect: true },
        { text: 'Оператор для вывода текста', isCorrect: false },
      ],
    },
    {
      text: 'Что такое массив в программировании?',
      options: [
        { text: 'Переменная для хранения одного значения', isCorrect: false },
        { text: 'Функция для сортировки данных', isCorrect: false },
        { text: 'Структура данных для хранения коллекции элементов', isCorrect: true },
        { text: 'Тип данных для работы с текстом', isCorrect: false },
      ],
    },
  ];

  const handleAnswerClick = (isCorrect, selectedOption) => {
    setAnswers([...answers, {
      question: currentQuestion,
      isCorrect,
      selectedOption
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result-section">
          <h2>Викторина завершена!</h2>
          <p>Правильных ответов: {score}</p>
          <p>Неправильных ответов: {questions.length - score}</p>
          <p>Всего вопросов: {questions.length}</p>

          <h3>Детали:</h3>
          <ul className="result-list">
            {questions.map((question, index) => {
              const userAnswer = answers[index] ? questions[index].options.find(opt => opt.text === answers[index].selectedOption) : null;
              const correctAnswer = question.options.find(opt => opt.isCorrect);
              const isCorrect = answers[index] ? answers[index].isCorrect : false;

              return (
                <li key={index} className="result-item">
                  <b>Вопрос {index + 1}:</b> {question.text}<br />
                  <b>Ваш ответ:</b> {userAnswer ? userAnswer.text : 'Не отвечено'}<br />
                  <b>Правильный ответ:</b> {correctAnswer.text}<br />
                  <b>Результат:</b> <span className={isCorrect ? 'correct-answer' : 'incorrect-answer'}>{isCorrect ? 'Правильно' : 'Неправильно'}</span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <>
          <div className="question-section">
            <h2>Вопрос {currentQuestion + 1} из {questions.length}</h2>
            <p>{questions[currentQuestion].text}</p>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option.isCorrect, option.text)}>
                {option.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;