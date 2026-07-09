 let finalarray = [];
        function Enterdata(){
         const inputfield = document.querySelector('.js-inputfield');
         const datedata = document.querySelector('.js-date');
         const finaldata = {
          name1 : inputfield.value,
          date2 : datedata.value
         };
             finalarray.push(finaldata);
             Display();
              inputfield.value = '';
              datedata.value = '';
        }
        function Display(){
             let output = '';
        for(let i = 0; i < finalarray.length; i++){
          output += `<div class="todo-item"> <span class="display-result">${finalarray[i].name1}</span> <span class="display-result">${finalarray[i].date2}</span> <button class="delete-todo-button display-result" onclick="finalarray.splice(${i},1);
            Display();">Delete</button> </div>`
        }
          document.querySelector('.js-display').innerHTML = `${output}`;
         
      }