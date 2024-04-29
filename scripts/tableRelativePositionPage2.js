// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  // Update the table cells with random numbers
  function updateTable() {
    for (let i = 1; i <= 9; i++) {
      document.getElementById(`cell-${i}`).textContent = generateRandomNumber();
    }
  }
  
  // Function to check the user's answer on the multiplication page
  function checkAnswer() {
    const cell2Value = parseInt(document.getElementById('cell-4').textContent);
    const cell3Value = parseInt(document.getElementById('cell-3').textContent);
    const multiplication = cell2Value * cell3Value;
    const userAnswer = parseInt(document.getElementById('result').value);
    
    if (userAnswer === multiplication) {
      // If the answer is correct, redirect to the next page
      document.getElementById('error-message').textContent = "Correct";
    } else {
      // If the answer is incorrect, display an error message on the page
      document.getElementById('error-message').textContent = "Incorrect. Try Again!";
    }
  }
  
  // Call the function to update the table when the page is loaded
  window.onload = updateTable;
  