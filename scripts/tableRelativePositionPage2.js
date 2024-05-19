function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  function updateTable() {
    for (let i = 1; i <= 9; i++) {
      document.getElementById(`cell-${i}`).textContent = generateRandomNumber();
    }
  }
  
  function checkAnswer() {
    const cell2Value = parseInt(document.getElementById('cell-4').textContent);
    const cell3Value = parseInt(document.getElementById('cell-3').textContent);
    const multiplication = cell2Value * cell3Value;
    const userAnswer = parseInt(document.getElementById('result').value);
    
    if (userAnswer === multiplication) {
      document.getElementById('error-message').textContent = "Correct";
    } else {
      document.getElementById('error-message').textContent = "Incorrect. Try Again!";
    }
  }
  
  window.onload = updateTable;
  