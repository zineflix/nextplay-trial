const apiKey = "cd70bcb6c58d1e7c3a5324eafa6de36a";
const baseURL = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/w500";

// Function to fetch and set a random trending movie/TV show as a banner
const bannerTitle = document.getElementById("banner-title");
const bannerGenre = document.getElementById("banner-genre");
const bannerDescription = document.getElementById("banner-description");
const banner = document.querySelector(".banner");

async function fetchBanner() {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    const randomItem = data.results[Math.floor(Math.random() * data.results.length)];

    banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${randomItem.backdrop_path})`;
    bannerTitle.textContent = randomItem.title || randomItem.name;
    bannerDescription.textContent = randomItem.overview || "No description available.";

    // Fetch genres
    const genresResponse = await fetch(`${baseURL}/genre/movie/list?api_key=${apiKey}&language=en-US`);
    const genresData = await genresResponse.json();
    const genreMap = Object.fromEntries(genresData.genres.map(g => [g.id, g.name]));
    const genreNames = (randomItem.genre_ids || []).map(id => genreMap[id]).join(", ");

    bannerGenre.textContent = `Genre: ${genreNames || "Unknown"}`;

    // Attach click event to banner play button
    const playButton = document.getElementById("banner-play-button");
    playButton.onclick = () => {
        const isMovie = randomItem.media_type === "movie";
        const id = randomItem.id;
        window.location.href = isMovie
            ? `movie-details.html?movie_id=${id}`
            : `tvshows-details.html?id=${id}`;
    };
}


fetchBanner();

// Fetch Media Rows
async function fetchMedia(url, containerId, type, pages = 3) {
    const container = document.getElementById(containerId);

    for (let page = 1; page <= pages; page++) {
        const response = await fetch(`${url}&page=${page}`);
        const data = await response.json();

        data.results.forEach(item => {
            const mediaItem = document.createElement("div");
            mediaItem.classList.add("media-item");

            const rating = item.vote_average.toFixed(1);
            mediaItem.innerHTML = `
                <div class="poster-title" title="${item.title || item.name}">
                    ${item.title || item.name}
                </div>
                <div class="poster-card">
                    <div class="rating">
                        <span class="star"><i class="fas fa-star"></i></span> 
                        <span class="rating-number">${rating}</span>
                    </div>
                    <img src="${imgURL + item.poster_path}" alt="${item.title || item.name}">
                    <div class="play-button"><i class="fas fa-play"></i></div>
                </div>
            `;

            mediaItem.addEventListener("click", () => {
                window.location.href = type === "movie" 
                    ? `movie-details.html?movie_id=${item.id}`
                    : `tvshows-details.html?id=${item.id}`;
            });

            container.appendChild(mediaItem);
        });
    }
}


// Load Data
fetchBanner();
fetchMedia(`${baseURL}/discover/movie?api_key=${apiKey}&vote_count.gte=500&vote_average=10`, "popular-movies", "movie", 5);
fetchMedia(`${baseURL}/discover/tv?api_key=${apiKey}&vote_count.gte=5000&vote_average=10`, "popular-tv-shows", "tv", 5);
fetchMedia(`${baseURL}/discover/tv?api_key=${apiKey}&with_origin_country=KR&vote_count.gte=300`, "korean-tv-shows", "tv", 5);
fetchMedia(`${baseURL}/discover/tv?api_key=${apiKey}&with_origin_country=JP&with_genres=16&vote_count.gte=500`, "japanese-animations", "tv", 5);
fetchMedia(`${baseURL}/discover/movie?api_key=${apiKey}&with_companies=149142`, "philippine-movies", "movie", 5);


// Ensure the function is globally accessible
document.addEventListener("DOMContentLoaded", function () {
    function scrollLeft(containerId) {
        let container = document.getElementById(containerId);
        if (container) {
            container.scrollBy({ left: -300, behavior: "smooth" });
        } else {
            console.error("Container not found:", containerId);
        }
    }

    function scrollRight(containerId) {
        let container = document.getElementById(containerId);
        if (container) {
            container.scrollBy({ left: 300, behavior: "smooth" });
        } else {
            console.error("Container not found:", containerId);
        }
    }

    // Attach event listeners to buttons (instead of inline HTML)
    document.querySelectorAll(".scroll-left").forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.nextElementSibling.id;
            scrollLeft(targetId);
        });
    });

    document.querySelectorAll(".scroll-right").forEach(button => {
        button.addEventListener("click", function () {
            let targetId = this.previousElementSibling.id;
            scrollRight(targetId);
        });
    });
});



// For Responsive Header
window.addEventListener("scroll", function () {
    let nav = document.querySelector("nav");
    if (window.scrollY > 50) {
        nav.classList.add("nav-solid"); // Solid color after scrolling down
    } else {
        nav.classList.remove("nav-solid"); // Transparent at the top
    }
});

// For sticky header when scrolling
    window.addEventListener("scroll", function () {
      let nav = document.querySelector("nav");
      if (window.scrollY > 50) {
        nav.classList.add("nav-solid"); // Add solid background when scrolled
      } else {
        nav.classList.remove("nav-solid"); // Remove solid background at top
      }
    });

    // Toggle menu visibility when menu button is clicked
document.getElementById("menu-btn").addEventListener("click", function() {
    document.getElementById("menu").classList.toggle("active");
});


// For Floating Message Close Function Start
function closeMessage() {
        document.getElementById("floating-message").style.display = "none";
    }
// For Floating Message Close Function End

// For Dropdown More Button Function Start
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");

    dropdown.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});
// For Dropdown More Button Function End

// Example: Track page views and unique visitors

// Function to increment page view count
function incrementPageView() {
  const pageViewRef = database.ref('pageViews');
  pageViewRef.transaction((currentValue) => (currentValue || 0) + 1);
}

// Function to store unique visitors (using sessionStorage for simplicity)
function trackUniqueVisitor() {
  const visitorId = sessionStorage.getItem('visitorId');
  if (!visitorId) {
    // Generate a unique ID (or use a library like UUID)
    const newVisitorId = 'visitor_' + Date.now();
    sessionStorage.setItem('visitorId', newVisitorId);

    // Store unique visitor in the database
    const visitorsRef = database.ref('uniqueVisitors');
    visitorsRef.child(newVisitorId).set(true);
  }
}

// Call the tracking functions
incrementPageView();
trackUniqueVisitor();

// Function to update the widget with current stats
function updateStatsWidget() {
  const pageViewRef = database.ref('pageViews');
  pageViewRef.once('value', (snapshot) => {
    document.getElementById('page-view-count').innerText = snapshot.val() || 0;
  });

  const uniqueVisitorsRef = database.ref('uniqueVisitors');
  uniqueVisitorsRef.once('value', (snapshot) => {
    document.getElementById('unique-visitors-count').innerText = snapshot.numChildren() || 0;
  });
}

// Update stats when the page loads
window.onload = updateStatsWidget;
