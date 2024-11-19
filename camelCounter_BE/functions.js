// Calculate the user's camelworth  
function calculateCamels(answers) {
    let camels = 0;
  
     // Question 1
    if (answers.q1 > 15) {
      camels += 10;
    } else if (answers.q1 > 10) {
      camels += 8;
    } else if (answers.q1 > 5) {
      camels += 5;
    } else if (answers.q1 > 0) {
      camels += 2;
    }
  
    // Question 2
    if (answers.q2 === 10) {
      camels += 10;
    } else if (answers.q2 > 6) {
      camels += 7;
    } else if (answers.q2 > 3) {
      camels += 4;
    } else if (answers.q2 > 0) {
      camels += 2;
    }
  
    // Question 3
    switch (answers.q3) {
      case "A":
        camels += 6;
        break;
      case "B":
        camels += 4;
        break;
      case "C":
        camels += 10;
        break;
      default:
        camels += 0;
    }
  
    // Question 4
    if (answers.q4 > 15) {
      camels += 10;
    } else if (answers.q4 > 10) {
      camels += 8;
    } else if (answers.q4 > 5) {
      camels += 6;
    } else if (answers.q4 > 0) {
      camels += 4;
    }
  
    // Question 5
    switch (answers.q5) {
      case "A":
        camels += 4;
        break;
      case "B":
        camels += 6;
        break;
      case "C":
        camels += 10;
        break;
      default:
        camels += 0;
    }
  
    // Question 6
    switch (answers.q6) {
      case "A":
        camels += 10;
        break;
      case "B":
        camels += 6;
        break;
      case "C":
        camels += 4;
        break;
      default:
        camels += 0;
    }
  
    // Question 7
    switch (answers.q7) {
      case "A":
        camels += 6;
        break;
      case "B":
        camels += 4;
        break;
      case "C":
        camels += 10;
        break;
      default:
        camels += 0;
    }
  
    // Question 8
    switch (answers.q8) {
      case "A":
        camels += 4;
        break;
      case "B":
        camels += 10;
        break;
      case "C":
        camels += 6;
        break;
      default:
        camels += 0;
    }
  
    // Question 9
    switch (answers.q9) {
      case "A":
        camels += 10;
        break;
      case "B":
        camels += 6;
        break;
      case "C":
        camels += 4;
        break;
      default:
        camels += 0;
    }
  
    // Question 10
    if (answers.q10 > 15) {
      camels += 10;
    } else if (answers.q10 > 10) {
      camels += 8;
    } else if (answers.q10 > 5) {
      camels += 6;
    } else if (answers.q10 > 3) {
      camels += 4;
    } else if (answers.q10 > 0) {
      camels += 2;
    }
  
    // Question 11
    switch (answers.q11) {
      case "A":
        camels += 10;
        break;
      case "B":
        camels += 6;
        break;
      case "C":
        camels += 4;
        break;
      default:
        camels += 0;
    }
  
    // Question 12
    switch (answers.q12) {
      case "A":
        camels += 6;
        break;
      case "B":
        camels += 4;
        break;
      case "C":
        camels += 10;
        break;
      default:
        camels += 0;
    }
  
    // Question 13
    switch (answers.q13) {
      case "A":
        camels += 4;
        break;
      case "B":
        camels += 6;
        break;
      case "C":
        camels += 10;
        break;
      default:
        camels += 0;
    }
  
    // Question 14
    switch (answers.q14) {
      case "A":
        camels += 10;
        break;
      case "B":
        camels += 6;
        break;
      case "C":
        camels += 4;
        break;
      default:
        camels += 0;
    }
  
    // Question 15
    if (answers.q15 > 15) {
      camels += 10;
    } else if (answers.q15 > 10) {
      camels += 8;
    } else if (answers.q15 > 5) {
      camels += 6;
    } else if (answers.q15 > 3) {
      camels += 4;
    } else if (answers.q15 > 0) {
      camels += 2;
    }

    const chaos = Math.floor(Math.random() * 100) + 1;
    if (chaos === 33) {
      camels = 0;
    } else if (chaos === 34) {
      camels = 199;
    } else if (chaos === 35) {
      camels = -199;
    }
      
    return camels;
  }

  module.exports = calculateCamels;