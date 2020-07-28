const YOUR_ACCESS_KEY ='58KboDv8625lvVRjl7VvylgVnn8ITdvL8STn6ewgask';
var output=document.querySelector('#output');

function getImages(){
  fetch(`https://api.unsplash.com/photos/?client_id=${YOUR_ACCESS_KEY}`).then((res)=>{
      return res.json();
    }).then(data=>{
      data.forEach((dataPic)=>{
        output.setAttribute('class','d-flex flex-wrap');
        output.innerHTML+=`
         <div class='card w-25 p-3 m-2'>
          <h5>${dataPic.user.first_name}</h5>
          <img src='${dataPic.links.download}'width="100%"'></img>
          <p>${dataPic.alt_description}</p>
          <div class=' d-flex'>
          <button class='btn btn-primary'>${dataPic.likes} Likes</button>
          </div>
         </div>
        `
      });
      });
  }

