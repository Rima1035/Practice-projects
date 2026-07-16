 const score = {
        win: 0,
        loss: 0,
        tie: 0,
      };
      
     
      document.body.addEventListener('keydown', (event) => {
       if(event.key === 'r'){
        playgame('rock');
       }
       else if(event.key === 'p'){
        playgame('paper');
       }
       else if(event.key === 's'){
        playgame('scissors');
       }
       else if(event.key === 'a'){
        Autoplay();
       }
       else if(event.key === 'Enter'){
        resetscore();
       }
      });

     function resetscore(){
      score.win = 0;
      score.loss = 0;
      score.tie = 0;
        updatescore();
     }

      function playgame(game) {
        const ComputerMove = pickComputerMove();
        let result = "";
        if (game === "rock") {
          if (ComputerMove === "rock") {
            result = "tie";
          } else if (ComputerMove === "paper") {
            result = "loss";
          } else if (ComputerMove === "scissors") {
            result = "win";
          }
        } else if (game === "paper") {
          if (ComputerMove === "paper") {
            result = "tie";
          } else if (ComputerMove === "scissors") {
            result = "loss";
          } else if (ComputerMove === "rock") {
            result = "win";
          }
        } else if (game === "scissors") {
          if (ComputerMove === "scissors") {
            result = "tie";
          } else if (ComputerMove === "rock") {
            result = "loss";
          } else if (ComputerMove === "paper") {
            result = "win";
          }
        }

        if (result === "win") {
          score.win += 1;
        } else if (result === "loss") {
          score.loss += 1;
        } else if (result === "tie") {
          score.tie += 1;
        }
        updatescore();
         document.querySelector('.js-result').innerHTML = `You ${result} `;

       document.querySelector('.js-move').innerHTML = `You <img src="image/${game}-emoji.png" height="50px" />computer<img src="image/${ComputerMove}-emoji.png" height="50px"/>`;
      };
       // console.log(
        //  `you picked ${game}. computer picked ${ComputerMove}. `,
       //); 
       function updatescore(){
         
       document.querySelector('.js-score').innerHTML = `the score is win = ${score.win}, loss = ${score.loss}, tie = ${score.tie}`;
         
       };


       
       // console.log(
        //   `you picked ${game}. computer picked ${ComputerMove}. you ${result}. the score is win = ${score.win} loss = ${score.loss} tie = ${score.tie}`,
        // );
        //localStorage.setItem('score', JSON.stringify(score));
        //console.log(localStorage.getItem('score'));

      function pickComputerMove() {
        const RandomNumber = Math.random();
        let ComputerMove = "";
        if (RandomNumber >= 0 && RandomNumber < 1 / 3) {
          ComputerMove = "rock";
        } else if (RandomNumber >= 1 / 3 && RandomNumber < 2 / 3) {
          ComputerMove = "paper";
        } else if (RandomNumber >= 2 / 3 && RandomNumber < 1) {
          ComputerMove = "scissors";
        }
        return ComputerMove;
      };

      // function Autoplay(){
      //  setInterval(function(){
      //   const move = pickComputerMove();
      //   playgame(move);     
      //  }, 3000);

     

      let check = false;
      let Intervalid;
       function Autoplay(){
        if(!check){
       Intervalid = setInterval(function(){
        const move = pickComputerMove();
         playgame(move);
       }, 300);
       check = true;
       document.querySelector('.js-autoplay').innerHTML = 'Stop autoplay';
      }
      else{
        clearInterval(Intervalid);
        document.querySelector('.js-autoplay').innerHTML = 'Auto play';
        check = false;
      }
       }
