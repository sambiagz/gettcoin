document.getElementById('btnPosts').addEventListener('click',fetchPost);
document.getElementById('btnPhotos').addEventListener('click', fetchPhoto);
document.getElementById('btnText').addEventListener('click', fetchText);


async function fetchText(){
  const Text=await fetch('sample.txt');
  const result=await Text.text();
  // output+= is necessary to allow for the content to be added to existing content and not overide
  output.innerHTML+=` 
   <p class='m-4'>${result}</p>
  `;
}

function fetchPost(){
  fetch('https://jsonplaceholder.typicode.com/posts').then((res)=>{
  return res.json();
}).then((data)=>{

  data.forEach(user => {

    if(user.id<=5){
    output.innerHTML+=`
      <div class='card p-2 m-2 bg-secondary text-white'>
      <h3 class='m-2'>Title: ${user.id}</h3>
      <p class='m-2'>${user.body}</p>
      </div>
    `;
    // console.log(`User: ${user.id}  Title: ${user.title}`)
    }
  });
}).catch((error)=>{
  console.log(error);
});
};

var output = document.querySelector('#output');
async function fetchPhoto(){
  const photos = await fetch('https://jsonplaceholder.typicode.com/photos');
  const photo=await photos.json();
  var count=1;
  photo.forEach(exactPhoto=>{
    
    if(exactPhoto.id<=6){
    var img=document.createElement('IMG');
    img.classList.add('image');
    img.src=exactPhoto.url;
    output.prepend(img);
    console.log(`Created Image ${count}`);
    count++;
    }

    // console.log(exactPhoto.url);
  });

}
