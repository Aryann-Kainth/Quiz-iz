let username=document.querySelector('#username');
let scobtn=document.querySelector('#saveScoreBtn');
let finalScore=document.querySelector('#finalScore');
let recentScore=localStorage.getItem('mostRecentScore');
let highScores=JSON.parse(localStorage.getItem('highScores'))||[];

finalScore.innerText=recentScore;
username.addEventListener('keyup',function(){
scobtn.disabled=!username.value;
});
saveHighScore =(e)=>{
    e.preventDefault();
    const score ={
        score:recentScore,
        name:username.value,
    
    };
    highScores.push(score);
    highScores.sort((a,b)=>b.score-a.score);
    highScores.splice(5);
    localStorage.setItem('highScores',JSON.stringify(highScores));
    window.location.assign("quiz.html");
}
