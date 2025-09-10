const imageWrapper = document.querySelector(".images"),
  searchInput = document.querySelector(".search input"),
  loadMoreBtn = document.querySelector(".gallery .load-more"),
  lightbox = document.querySelector(".lightbox"),
  downloadImgBtn = lightbox.querySelector(".uil-import"),
  closeImgBtn = lightbox.querySelector(".close-icon"),
  apiKey = "kQdIkN07IqZI7byq9g2H4GbRbYH7m5JCdGXjaYznNbh0ekFxadxE4wcW",
  perPage = 15;
let currentPage = 1,
  searchTerm = null;
const downloadImg = (e) => {
    fetch(e)
      .then((e) => e.blob())
      .then((e) => {
        const a = document.createElement("a");
        (a.href = URL.createObjectURL(e)),
          (a.download = new Date().getTime()),
          document.body.appendChild(a),
          a.click(),
          a.remove();
      })
      .catch(() => console.log("Failed to download image!"));
  },
  showLightbox = (e, a) => {
    (lightbox.querySelector("img").src = a),
      (lightbox.querySelector("span").innerText = e),
      downloadImgBtn.setAttribute("data-img", a),
      lightbox.classList.add("show"),
      (document.body.style.overflow = "hidden");
  },
  hideLightbox = () => {
    lightbox.classList.remove("show"), (document.body.style.overflow = "auto");
  },
  generateHTML = (e) => {
    imageWrapper.innerHTML += e
      .map(
        (e) =>
          `<li class="card">\n            <img onclick="showLightbox('${e.photographer}', '${e.src.large2x}')" src="${e.src.large2x}" alt="img">\n            <div class="details">\n                <div class="photographer">\n                    <i class="uil uil-camera"></i>\n                    <span>${e.photographer}</span>\n                </div>\n                <button onclick="downloadImg('${e.src.large2x}');">\n                    <i class="uil uil-import"></i>\n                </button>\n            </div>\n        </li>`
      )
      .join("");
  },
  getImages = (e) => {
    searchInput.blur(),
      (loadMoreBtn.innerText = "Loading..."),
      loadMoreBtn.classList.add("disabled"),
      fetch(e, { headers: { Authorization: apiKey } })
        .then((e) => e.json())
        .then((e) => {
          var a;
          (a = e.photos),
            (imageWrapper.innerHTML += a
              .map(
                (e) =>
                  `<li class="card">\n            <img onclick="showLightbox('${e.photographer}', '${e.src.large2x}')" src="${e.src.large2x}" alt="img">\n            <div class="details">\n                <div class="photographer">\n                    <i class="uil uil-camera"></i>\n                    <span>${e.photographer}</span>\n                </div>\n                <button onclick="downloadImg('${e.src.large2x}');">\n                    <i class="uil uil-import"></i>\n                </button>\n            </div>\n        </li>`
              )
              .join("")),
            (loadMoreBtn.innerText = "Load More"),
            loadMoreBtn.classList.remove("disabled");
        })
        .catch(() => console.log("Failed to load images!"));
  },
  loadMoreImages = () => {
    currentPage++;
    let e = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=15`;
    (e = searchTerm
      ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=15`
      : e),
      getImages(e);
  },
  loadSearchImages = (e) => {
    if ("" === e.target.value) return (searchTerm = null);
    "Enter" === e.key &&
      ((currentPage = 1),
      (searchTerm = e.target.value),
      (imageWrapper.innerHTML = ""),
      getImages(
        `https://api.pexels.com/v1/search?query=${searchTerm}&page=1&per_page=15`
      ));
  };
getImages(`https://api.pexels.com/v1/curated?page=${currentPage}&per_page=15`),
  loadMoreBtn.addEventListener("click", loadMoreImages),
  searchInput.addEventListener("keyup", loadSearchImages),
  closeImgBtn.addEventListener("click", hideLightbox),
  downloadImgBtn.addEventListener("click", (e) => {
    return (
      (a = e.target.dataset.img),
      void fetch(a)
        .then((e) => e.blob())
        .then((e) => {
          const a = document.createElement("a");
          (a.href = URL.createObjectURL(e)),
            (a.download = new Date().getTime()),
            document.body.appendChild(a),
            a.click(),
            a.remove();
        })
        .catch(() => console.log("Failed to download image!"))
    );
    var a;
  });
