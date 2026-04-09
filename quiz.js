const quizData = {
    html: [
        { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Tool Multi Language", "Hyperlink Text Markup Language"], correct: 0 },
        { id: 2, question: "Which HTML5 element is used to specify a footer?", options: ["<bottom>", "<footer>", "<section>", "<aside>"], correct: 1 },
        { id: 3, question: "What is the correct HTML element for playing video files?", options: ["<video>", "<movie>", "<media>", "<play>"], correct: 0 },
        { id: 4, question: "Which attribute is used to provide a unique identifier for an element?", options: ["class", "id", "type", "name"], correct: 1 },
        { id: 5, question: "Which tag is used to create a hyperlink?", options: ["<link>", "<a>", "<href>", "<url>"], correct: 1 },
        { id: 6, question: "Which HTML element is used to define important text?", options: ["<important>", "<strong>", "<b>", "<i>"], correct: 1 },
        { id: 7, question: "How can you make a numbered list?", options: ["<ul>", "<list>", "<ol>", "<dl>"], correct: 2 },
        { id: 8, question: "Which input type is used for a slider control?", options: ["search", "range", "slider", "controls"], correct: 1 },
        { id: 9, question: "What is the correct HTML for inserting an image?", options: ["<img alt='MyImage'>image.gif</img>", "<img href='image.gif'>", "<image src='image.gif'>", "<img src='image.gif'>"], correct: 3 },
        { id: 10, question: "Which HTML5 element is used to display a measurement within a range?", options: ["<range>", "<meter>", "<gauge>", "<measure>"], correct: 1 }
    ],
    css: [
        { id: 1, question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1 },
        { id: 2, question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "bg-style"], correct: 2 },
        { id: 3, question: "How do you add a background color for all <h1> elements?", options: ["all.h1 {bg-color:#FFF;}", "h1 {background-color:#FFF;}", "h1.all {color:#FFF;}", "h1 {color:#FFF;}"], correct: 1 },
        { id: 4, question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], correct: 2 },
        { id: 5, question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], correct: 3 },
        { id: 6, question: "How do you display a border like this: Top=10px, Bottom=5px, Left=20px, Right=1px?", options: ["border-width:10px 5px 20px 1px;", "border-width:10px 1px 5px 20px;", "border-width:5px 20px 10px 1px;", "border-width:10px 20px 5px 1px;"], correct: 1 },
        { id: 7, question: "Which property is used to change the left margin of an element?", options: ["padding-left", "margin-left", "indent", "spacing-left"], correct: 1 },
        { id: 8, question: "How do you select an element with id 'demo'?", options: [".demo", "demo", "#demo", "*demo"], correct: 2 },
        { id: 9, question: "Which property is used to change the font of an element?", options: ["font-style", "font-weight", "font-family", "font-type"], correct: 2 },
        { id: 10, question: "How do you make the text bold?", options: ["font:bold;", "style:bold;", "font-weight:bold;", "text-bold:true;"], correct: 2 }
    ],
    javascript: [
        { id: 1, question: "Inside which HTML element do we put the JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], correct: 2 },
        { id: 2, question: "How do you write 'Hello World' in an alert box?", options: ["msg('Hello World');", "alert('Hello World');", "alertBox('Hello World');", "console('Hello World');"], correct: 1 },
        { id: 3, question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "new function()"], correct: 0 },
        { id: 4, question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "exec myFunction()"], correct: 1 },
        { id: 5, question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], correct: 1 },
        { id: 6, question: "How does a FOR loop start?", options: ["for (i = 0; i <= 5; i++)", "for (i <= 5; i++)", "for i = 1 to 5", "for (i = 0; i <= 5)"], correct: 0 },
        { id: 7, question: "How can you add a comment in JavaScript?", options: ["'This is a comment", "//This is a comment", "///This", "*This is a comment*"], correct: 1 },
        { id: 8, question: "What is the correct way to write a JavaScript array?", options: ["var colors = 1:('red'), 2:('blue')", "var colors = ['red', 'blue', 'green']", "var colors = (1:'red', 2:'blue')", "var colors = 'red', 'blue', 'green'"], correct: 1 },
        { id: 9, question: "Which operator is used to assign a value to a variable?", options: ["*", "-", "=", "x"], correct: 2 },
        { id: 10, question: "What will `typeof []` return in JavaScript?", options: ["array", "list", "object", "undefined"], correct: 2 }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    const questionTitle = document.getElementById('question');
    const optionDivs = document.querySelectorAll('.option');
    const nextBtn = document.getElementById('next-btn');
    const timeDisplay = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');

    if (!questionTitle || !nextBtn) return;

    const category = localStorage.getItem('userChoice') || 'html';
    let currentQuestionIndex = 0;
    let score = 0;
    let totalSeconds = 300;

    const countdown = setInterval(() => {
        let min = Math.floor(totalSeconds / 60);
        let sec = totalSeconds % 60;
        if (timeDisplay) timeDisplay.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        if (totalSeconds <= 0) { clearInterval(countdown); showResult(); }
        totalSeconds--;
    }, 1000);

    function loadQuiz() {
        const data = quizData[category][currentQuestionIndex];
        questionTitle.innerText = data.question;
        optionDivs.forEach((div, i) => {
            div.innerText = data.options[i];
            div.classList.remove('active');
            div.onclick = () => {
                optionDivs.forEach(d => d.classList.remove('active'));
                div.classList.add('active');
            };
        });
        if (progressBar) progressBar.style.width = `${((currentQuestionIndex + 1) / quizData[category].length) * 100}%`;
    }

    nextBtn.onclick = () => {
        const active = document.querySelector('.option.active');
        if (!active) return Swal.fire("Select an answer");
        if (active.innerText === quizData[category][currentQuestionIndex].options[quizData[category][currentQuestionIndex].correct]) score++;
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData[category].length) loadQuiz();
        else { clearInterval(countdown); showResult(); }
    };

    function showResult() {
        const quizWrapper = document.getElementById('quiz-text');
        const total = quizData[category].length;
        const percentage = Math.round((score / total) * 100);
        
        const circumference = 283;
        const offset = circumference - (percentage / 100) * circumference;

        document.querySelector('.quiz-header').style.display = "none";
        document.getElementById('quiz-content').style.display = "none";
        document.querySelector('.quiz-footer').style.display = "none";
        document.querySelector('.progress-wrapper').style.display = "none";

        quizWrapper.innerHTML = `
            <div class="result-card-premium">
                <div class="mastery-container">
                    <svg class="progress-ring" width="120" height="120">
                        <circle class="progress-ring__background" stroke="#f1f5f9" stroke-width="8" fill="transparent" r="45" cx="60" cy="60"/>
                        <circle class="progress-ring__circle" stroke="#4f46e5" stroke-width="8" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round" fill="transparent" r="45" cx="60" cy="60"/>
                    </svg>
                    <div class="mastery-text">
                        <span class="m-percent">${percentage}%</span>
                        <span class="m-label">MASTERY</span>
                    </div>
                </div>
                <h2 class="result-title">${percentage >= 70 ? 'Excellent Work!' : percentage >= 50 ? 'Good Effort!' : 'Keep Learning!'}</h2>
                <div class="stats-grid">
                    <div class="stat-box">
                        <span class="s-label">TOTAL</span>
                        <span class="s-val">${total}</span>
                    </div>
                    <div class="stat-box highlight">
                        <span class="s-label">CORRECT</span>
                        <span class="s-val">${score}</span>
                    </div>
                    <div class="stat-box">
                        <span class="s-label">SCORE</span>
                        <span class="s-val">${percentage}%</span>
                    </div>
                </div>
                <div class="result-actions-vertical">
                    <button class="btn-primary-long" onclick="location.reload()">Restart Quiz</button>
                    <button class="btn-outline-text" onclick="location.href='dashboard.html'">Back to Dashboard</button>
                </div>
            </div>
        `;
    }

    loadQuiz();

    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            nextBtn.click();
        }
    });
});