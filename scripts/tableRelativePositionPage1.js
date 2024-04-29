function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  function updateTable() {
    for (let i = 1; i <= 9; i++) {
      document.getElementById(`cell-${i}`).textContent = generateRandomNumber();
    }
  }
  

  function checkAnswer() {
    const cell2Value = parseInt(document.getElementById('cell-2').textContent);
    const cell9Value = parseInt(document.getElementById('cell-9').textContent);
    const sum = cell2Value + cell9Value;
    const userAnswer = parseInt(document.getElementById('result').value);
    
    if (userAnswer === sum) {
      window.location.href = "secondPage.html";
    } else {
      document.getElementById('error-message').textContent = "Incorrect. Try again";
    }
  }
  

  window.onload = updateTable;
  