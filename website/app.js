/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
document.querySelector('#generate').addEventListener('click', async () => {
    let zip = document.querySelector('#zip').value
    if(zip){
        await fetch("/getData", {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          body:JSON.stringify({
              zip:zip,
              date:newDate,
              feel:document.querySelector('#feelings').value
          })
        }).then((data) => data.json()).then(x=> updateUi(x))
    }else{
        alert('please enter Zip Code')
    }
  
  })
function updateUi(x){
    document.querySelector('#date').innerHTML=`date : ${x.date}`
    document.querySelector('#temp').innerHTML=`temperature : ${Math.round(x.temp)} degrees`
    document.querySelector('#content').innerHTML=`Your Feelings : ${x.feel}`
}