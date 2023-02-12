/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.querySelector('#generate').addEventListener('click', async () => {
    let zip = document.querySelector('#zip').value
    if(zip){
      await fetch('/getApi',{
        method:'POST',
        headers:{
          'content-type': 'application/json',
        },
        body:JSON.stringify({
          zip:zip
      })}).then(res => res.json()).then(res => {
        fetch(res.url).then(response => response.json()).then(async (res) =>{
          await fetch('/getData',{
            method:'POST',
            headers:{
              'content-type': 'application/json',
            },
            body:JSON.stringify({
              date:newDate,
              temp:res.main.temp,
              feelings:document.querySelector('#feelings').value
            })
          }).then(async () =>
          await fetch('/getProjectData').then(res => res.json()).then(res => updateUi(res)))
        } )
      })
    }else{
        alert('please enter Zip Code')
    }
  
  })
function updateUi(projectData){
  projectData.forEach(x => {
    document.querySelector('#date').innerHTML=`date : ${x.date}`
    document.querySelector('#temp').innerHTML=`temperature : ${Math.round(x.temp)} degrees`
    document.querySelector('#content').innerHTML=`Your Feelings : ${x.feelings}`
    
  });
}