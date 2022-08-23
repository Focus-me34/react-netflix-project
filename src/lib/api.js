// ? NOT USED AT ALL. WE USE THE REDUX STORE CUSTOM ACTION INSTEAD
// ? NOT DELETING IT FOR FUTURE REFERENCES

// const api_key = `${process.env.REACT_APP_TMDB_API_KEY}`;

// // ! GET ALL MOVIES (NOW INSIDE THE MOVIE SLICE)
// export async function getMovies() {
//   const token = localStorage.getItem("token");
//   const url = "http://localhost:3000/api/v1/movies";
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(
//       data.message || "Could not fetch action movies from RAILS."
//     );
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data;
// }

// // ! GET ALL FAVORITE MOVIES (NOW INSIDE THE MOVIE SLICE)
// export async function getFavorites() {
//   const token = localStorage.getItem("token");
//   const url = "http://localhost:3000/api/v1/favorites";
//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(
//       data.message || "Could not fetch action movies from RAILS."
//     );
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.favorite_movies;
// }

// export async function getThrillerMovies() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?genres=thriller}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// export async function getHorrorMovies() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?genres=horror}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// export async function getRomanceMovies() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?genres=romance}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// // ! GET SERIES BY CATEGORY
// export async function getActionSeries() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?title_type=tv_series&genres=action}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// export async function getThrillerSeries() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?title_type=tv_series&genres=thriller}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// export async function getHorrorSeries() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?title_type=tv_series&genres=horror}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// export async function getRomanceSeries() {
//   const url = `https://imdb-api.com/API/AdvancedSearch/${api_key}/?title_type=tv_series&genres=romance}`;
//   const response = await fetch(url);
//   console.log(response);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch action movies.");
//   }

//   if (data.errorMessage) {
//     throw new Error(data.errorMessage);
//   }

//   return data.results;
// }

// export async function getSingleQuote(quoteId) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch quote.");
//   }

//   const loadedQuote = {
//     id: quoteId,
//     ...data,
//   };

//   return loadedQuote;
// }

// export async function addQuote(quoteData) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
//     method: "POST",
//     body: JSON.stringify(quoteData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not create quote.");
//   }

//   return null;
// }

// export async function addComment(requestData) {
//   const response = await fetch(
//     `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
//     {
//       method: "POST",
//       body: JSON.stringify(requestData.commentData),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not add comment.");
//   }

//   return { commentId: data.name };
// }

// export async function getAllComments(quoteId) {
//   const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "Could not get comments.");
//   }

//   const transformedComments = [];

//   for (const key in data) {
//     const commentObj = {
//       id: key,
//       text: data[key],
//     };

//     transformedComments.push(commentObj);
//   }

//   return transformedComments;
// }

// ? MOST POPULAR MOVIES
//   fetch(`https://imdb-api.com/en/API/MostPopularMovies/${api_key}`)
//   .then(res => res.json())
//   .then(data => console.log(data))
