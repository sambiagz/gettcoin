function openMe(){
  document.getElementById('navs').style.display = "flex";
  document.querySelector(".fas.fa-times").style.display = "flex";
  document.querySelector(".fas.fa-bars").style.display = "none";
}
function closeMe(){
  document.querySelector(".fas.fa-times").style.display = "none";
  document.querySelector(".fas.fa-bars").style.display = "flex";
  document.getElementById('navs').style.display = "none"; 
}