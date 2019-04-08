const el = document.getElementById("featured-films");
//Clear main view for different purposes
function clearScreen() {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
//Show movie by id
function showMovieById(id) {
  let uri = `https://api.themoviedb.org/3/movie/${id}?api_key=89c7d7d9e7a3de86e27a4d871fb88384&language=en-US`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", uri);
  xhr.send();
  xhr.onreadystatechange = e => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const ob = JSON.parse(xhr.response);
      var p = document.createElement("p");
      var h3 = document.createElement("h3");
      var img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/original/${ob.poster_path}`
      );

      h3.innerText = ob.title;
      p.innerText = ob.overview;
      clearScreen();
      document.getElementById("details").innerText = "Movie Details";
      el.appendChild(img);
      el.appendChild(h3);
      el.appendChild(document.createElement("hr"));
      el.appendChild(p);
      var r = document.createElement("h3");
      r.innerHTML = "Recomended";
      el.appendChild(r);
      el.appendChild(document.createElement("hr"));
      uri = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=89c7d7d9e7a3de86e27a4d871fb88384&language=en-US&page=1`;
      xhr.open("GET", uri);
      xhr.send();
      xhr.onreadystatechange = e => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          const ob = JSON.parse(xhr.response);
          var resAr = Array.from(ob.results);
          createListOfFilms(resAr, 4);
        }
      };
    }
  };
}
//Create  list of films by id and number of result if presented
function createListOfFilms(resAr, id = resAr.length) {
  var ul = document.createElement("ol");
  var len = id;
  for (let index = 0; index < len; index++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("key", resAr[index].id);
    a.addEventListener("click", function() {
      console.log("cliked:" + this.getAttribute("key"));
      showMovieById(this.getAttribute("key"));
    });
    a.innerText = resAr[index].title;
    //li.innerHTML = `"<a  key=${resAr[index].id}>${resAr[index].title}"</a>"`;
    li.appendChild(a);
    ul.appendChild(li);
  }

  el.appendChild(ul);
}
function populateHome() {
  var ul = document.createElement("ol");
  const uri =
    "https://api.themoviedb.org/3/discover/movie?api_key=89c7d7d9e7a3de86e27a4d871fb88384";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", uri);
  xhr.send();
  xhr.onreadystatechange = e => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      const ob = JSON.parse(xhr.response);
      var resAr = Array.from(ob.results);
      console.log(resAr.length);
      clearScreen();
      createListOfFilms(resAr);
    }
  };
}
//Search movie function
function searcMovie() {
  const st = document.getElementById("search-box").value;
  if (!st.length) {
    alert("String is empty or not defined");
  } else {
    const uri = `https://api.themoviedb.org/3/search/movie?api_key=89c7d7d9e7a3de86e27a4d871fb88384&language=en-US&query=${st}&include_adult=false`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri);
    xhr.send();
    xhr.onreadystatechange = e => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const ob = JSON.parse(xhr.response);
        var resAr = Array.from(ob.results);
        clearScreen();
        createListOfFilms(resAr);
      }
    };
    document.getElementById("details").innerText = "Search Results";
  }
}

//Initialize app
document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("search").addEventListener("click", function(e) {
    searcMovie();
  });
  populateHome();
});
