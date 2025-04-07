const monthNumber = () => {
  // Получаем значение из поля ввода
  let userNumber = document.getElementById("monthInput").value;
  let number = Number(userNumber);

  // Получаем элемент для вывода результата
  const resultElement = document.getElementById("season-result");

  // Проверка на недопустимые значения
  if (isNaN(number) || number < 1 || number > 12) {
    resultElement.textContent =
      "Вы ввели недопустимое значение. Введите число от 1 до 12.";
    resultElement.style.color = "#9c0332";
  } else {
    let season;
    let reactions = [];

    if (number === 12 || number === 1 || number === 2) {
      season = "Зима";
      reactions = [
        "А вот и сугробы — пошли лепить снеговика!",
        "Зима пришла, а Game of Thrones закончился...",
        "Шапку надел? А то уши отморозишь.",
        "Время пить какао и смотреть сериалы под пледиком.",
      ];
    } else if (number >= 3 && number <= 5) {
      season = "Весна";
      reactions = [
        "Весна! Всё цветёт, и ты тоже расцветай!",
        "Пора обновить гардероб и улыбку 😄",
        "Ощущаешь этот запах свободы и тополиного пуха?",
        "Весна — как новое обновление для души!",
      ];
    } else if (number >= 6 && number <= 8) {
      season = "Лето";
      reactions = [
        "Лето! Миссия: найти тень и мороженое 🍦",
        "Жара, пляж и сандалии — ты готов?",
        "Солнце шпарит — пора в отпуск!",
        "Сезон комаров официально открыт!",
      ];
    } else {
      season = "Осень";
      reactions = [
        "Осень — самое время для уютных игр и чая ☕",
        "Шуршание листьев под ногами — музыка осени.",
        "Тыквенный суп, плед и новый сериал — идеальный план!",
        "Осень — багфиксы для лета 🛠️",
      ];
    }

    const randomReaction =
      reactions[Math.floor(Math.random() * reactions.length)];

    resultElement.textContent = `Месяц ${number} — это ${season}! ${randomReaction}`;
    resultElement.style.color = "white";
  }
};
// Привязка функции к кнопке
document.getElementById("seasonButton").addEventListener("click", monthNumber);

const fruits = [
  "Яблоко",
  "Груша",
  "Дыня",
  "Виноград",
  "Персик",
  "Апельсин",
  "Мандарин",
];
let shuffledWords;
let wordIndexes = [];
let currentScore = 0;

// Перемешивание массива
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Начало игры
const startGame = () => {
  document.getElementById("memory-result").textContent = "";
  document.getElementById("memory-result").style.color = "";
  document.getElementById("input-container").style.display = "none";
  document.getElementById("word-list").style.display = "block";

  shuffledWords = shuffleArray([...fruits]);

  // Случайные два индекса, не одинаковые
  let firstIndex = Math.floor(Math.random() * shuffledWords.length);
  let secondIndex;
  do {
    secondIndex = Math.floor(Math.random() * shuffledWords.length);
  } while (secondIndex === firstIndex);
  wordIndexes = [firstIndex, secondIndex];

  // Показ слов
  const wordList = document.getElementById("word-list");
  wordList.textContent = shuffledWords.join(", ");
  wordList.classList.remove("show");
  void wordList.offsetWidth;
  wordList.classList.add("show");

  setTimeout(() => {
    wordList.style.display = "none";

    // Показ инпутов
    const labelOne = document.getElementById("labelInputOne");
    const labelTwo = document.getElementById("labelInputTwo");
    const inputOne = document.getElementById("userInputOne");
    const inputTwo = document.getElementById("userInputTwo");

    labelOne.textContent = `Введите ${wordIndexes[0] + 1}-е слово:`;
    labelTwo.textContent = `Введите ${wordIndexes[1] + 1}-е слово:`;
    inputOne.value = "";
    inputTwo.value = "";

    document.getElementById("input-container").style.display = "block";
  }, 9000);
};

let isChecked = false; // Добавляем переменную для отслеживания состояния проверки

// Проверка
const checkWords = () => {
  if (isChecked) return; // Если проверка уже была выполнена, не выполняем её снова
  const inputOne = document
    .getElementById("userInputOne")
    .value.trim()
    .toLowerCase();
  const inputTwo = document
    .getElementById("userInputTwo")
    .value.trim()
    .toLowerCase();
  const correctOne = shuffledWords[wordIndexes[0]].toLowerCase();
  const correctTwo = shuffledWords[wordIndexes[1]].toLowerCase();

  let correctCount = 0;
  if (inputOne === correctOne) correctCount++;
  if (inputTwo === correctTwo) correctCount++;

  let result = "";
  const resultElem = document.getElementById("memory-result");

  if (correctCount === 2) {
    result = "Отлично! Вы запомнили оба слова!";
    resultElem.style.color = "white";
    currentScore += 2;
  } else if (correctCount === 1) {
    result = "Почти! Одно слово угадано.";
    resultElem.style.color = "orange";
    currentScore += 1;
  } else {
    result = "Увы, ни одно слово не совпало.";
    resultElem.style.color = "#9c0332";
  }

  resultElem.textContent = result;
  document.getElementById("score").textContent = `Очки: ${currentScore}`;

  isChecked = true; // Устанавливаем флаг в true, чтобы избежать повторной проверки

  setTimeout(() => {
    startGame(); // Запуск новой игры после 2 секунд
    isChecked = false; // Сбрасываем флаг, чтобы можно было снова проверять
  }, 6000);
};

let riddleAttempts = 0; // Счётчик попыток
let riddleAnswer = ""; // Правильный ответ
let currentRiddleIndex = 0; // Индекс текущей загадки
let correctAnswers = 0; // Количество угаданных загадок

// Список загадок
const riddles = [
  {
    question:
      "1. Что может путешествовать по свету, оставаясь в одном и том же углу?",
    answer: "марка",
    hints: [
      "Это что-то маленькое, что можно наклеить.",
      "Это используется для отправки писем.",
    ],
  },
  {
    question: "2. Что нельзя увидеть, но оно есть везде вокруг нас?",
    answer: "воздух",
    hints: ["Он невидим, но жизненно важен для нас.", "Мы дышим этим."],
  },
  {
    question: "3. Я всегда с тобой, но не могу тебя коснуться. Кто я?",
    answer: "тень",
    hints: ["Я не существую без света.", "Я исчезаю в темноте."],
  },
];

// Начало игры с загадкой
function startRiddleGame() {
  // Скрыть кнопку и показать форму игры
  document.querySelector(".header-button-three").style.display = "none";
  const riddleGame = document.getElementById("riddle-game");
  riddleGame.style.display = "block";

  // Начинаем первую загадку
  riddleAttempts = 0;
  const riddle = riddles[currentRiddleIndex]; // Выбираем текущую загадку
  riddleAnswer = riddle.answer;
  document.getElementById("riddle-question").textContent = riddle.question;
  document.getElementById("riddle-feedback").textContent = ""; // Очистить обратную связь
}

// Проверка ответа
function checkRiddleAnswer() {
  const userAnswer = document
    .getElementById("riddle-answer")
    .value.trim()
    .toLowerCase();
  const riddle = riddles[currentRiddleIndex]; // Текущая загадка

  if (userAnswer === "") {
    return;
  }

  // Проверка
  if (userAnswer === riddleAnswer) {
    document.getElementById("riddle-feedback").textContent =
      "Поздравляем! Вы угадали!";
    document.getElementById("riddle-feedback").style.color = "white";
    correctAnswers++; // Увеличиваем количество угаданных загадок
    setTimeout(nextRiddle, 1000); // Переход к следующей загадке
  } else {
    riddleAttempts++;
    if (riddleAttempts === 1) {
      document.getElementById("riddle-feedback").textContent = riddle.hints[0];
    } else if (riddleAttempts === 2) {
      document.getElementById("riddle-feedback").textContent = riddle.hints[1];
    } else {
      document.getElementById(
        "riddle-feedback"
      ).textContent = `Вы проиграли! Правильный ответ: ${riddleAnswer}`;
      document.getElementById("riddle-feedback").style.color = "white";
      setTimeout(nextRiddle, 1000); // Переход к следующей загадке
    }
  }
}

// Переход к следующей загадке
function nextRiddle() {
  currentRiddleIndex++;
  if (currentRiddleIndex >= riddles.length) {
    // Если загадки закончились, показываем количество угаданных загадок
    document.getElementById(
      "riddle-feedback"
    ).textContent = `Игра окончена! Вы угадали ${correctAnswers} загадки из ${riddles.length}.`;
    document.getElementById("riddle-feedback").style.color = "white";
    document.querySelector(".header-button-one").style.display = "block"; // Показываем кнопку "Играть!" снова
  } else {
    startRiddleGame(); // Переход к следующей загадке
  }
}

const smoothScrollTo = (element) => {
  element.scrollIntoView({ behavior: "smooth", block: "center" });
};

// Привязка события к кнопке "Поехали"
document.querySelector(".header-button").addEventListener("click", () => {
  const targetElement = document.querySelector(".image-game-one");
  smoothScrollTo(targetElement); // Плавно прокручиваем к первой картинке
});

// Привязка событий к картинкам для прокрутки к заголовкам
document.querySelector(".image-game-one").addEventListener("click", () => {
  const seasonTitle = document.querySelector(".season-subtitle");
  smoothScrollTo(seasonTitle); // Плавно прокручиваем к заголовку
});

document.querySelector(".image-game-two").addEventListener("click", () => {
  const seasonTitle = document.querySelector(".header-button-two");
  smoothScrollTo(seasonTitle); // Плавно прокручиваем к заголовку
});

document.querySelector(".image-game-three").addEventListener("click", () => {
  const seasonTitle = document.querySelector(".riddle-subtitle");
  smoothScrollTo(seasonTitle); // Плавно прокручиваем к заголовку
});
