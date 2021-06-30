let highscoreslist=document.querySelector('#highScoresList');
let highScores=JSON.parse(localStorage.getItem('highScores')||[]);
//NEEDS REVIEW
highScoresList.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");