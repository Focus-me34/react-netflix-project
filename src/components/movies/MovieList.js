import { useReducer, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import SeparationPattern from "../UI/SeparationPattern";
import classes from "./MovieList.module.css";


// ? REDUCER INITIAL STATE + HANDLER
const initialState = { isSelectedMovie: false, selectedMovie: null, movieId: null }
const selectMovieReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return { isSelectedMovie: true, selectedMovie: action.movies[action.movieId - 1], movieId: action.movieId }
    case "UNSELECT":
      return { isSelectedMovie: false, selectedMovie: null }
    default:
      break;
  }
}


const MovieList = (props) => {
  const { sendRequest, status, data: movies, error } = useFetch(props.httpMethod, true)

  useEffect(() => {
    sendRequest();
  }, [sendRequest])

  const [movieState, dispatch] = useReducer(selectMovieReducer, initialState);
  const video = useRef(null);

  const toggleSelectMovieHandler = (id) => {
    if (!movieState.isSelectedMovie) {
      dispatch({ type: "SELECT", movieId: id, movies: movies })
    } else {
      if (movieState.movieId === id) {
        dispatch({ type: "UNSELECT" })
      } else {
        dispatch({ type: "SELECT", movieId: id, movies: movies })
      }
    }
  }

  console.log(movies);

  useEffect(() => {
    if (movieState.isSelectedMovie) video.current.volume = 0.1
  }, [movieState.isSelectedMovie])

  return (
    <div className={classes["movie-category-container"]}>
      <h2>{props.genre}</h2>
      <div className={classes["movie-category-list"]}>
        {(status === "completed" && !error) && movies.map(movie => {
          return (
            <div onClick={() => toggleSelectMovieHandler(movie.id)} key={movie.id} movie={movie} className={classes["movie-card"]}>
              <img src={movie.img_url} alt="image of movie: movie.title" />
              <p className={movie.id === movieState.movieId ? classes.active : ""}>{movie.title}</p>
            </div>
          )
        })}
      </div>

      {movieState.isSelectedMovie &&
        <>
          <SeparationPattern />
          <div className={classes["movie-details"]}>
            <p><span className={classes.synopsis}>Synopsis:</span> <br />{movieState.selectedMovie.synopsis}</p>
            <video ref={video} controls autoPlay width="500" src={movieState.selectedMovie.trailer_url}>
              <source src={movieState.selectedMovie.trailer_url} type="video/mp4" />
            </video>
          </div>
          <SeparationPattern />
        </>
      }
    </div>
  );
}

export default MovieList;


// const MOVIES_LIST = [
//   { id: 1, title: "Thor: Love and Thunder", synopsis: "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.", img_url: "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi1613808153/1434659607842-pgv4ql-1656941657492.mp4?Expires=1659101898&Signature=FcQu0v3H26gLEPedswQcuvNpfdoXvWLAODrmY~sPVrD9WlNLdwnd12ZH7a-768qZq-fHgG6a5VDtNLvOXCb27nyZ~7XjkwvCvo9qJjNmPEUL-nf9ifAQDIrTsSxKDzeSBZB~iDvT1AHW7oafBSoXwOOI3C9CL4VM6AjM4J1Z7on2fgxQ-xvXqwWEqbtzq2j~egmNNjFu8XEc0k~c~ycA4uvgNhubwUgxP6CQ3uy3hhgh5OTfCFWovJMcvivCJTeIhd~pJM702Zb8e9x1CIyJWp6uM2e0qoHTidssnV33CgiEMY4opgHTLAdrdREl4i102DHrLmbyV070E11GUFK6vA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 2, title: "The Gray Man", synopsis: "When the CIA's most skilled operative-whose true identity is known to none-accidentally uncovers dark agency secrets, a psychopathic former colleague puts a bounty on his head, setting off a global manhunt by international assassins.", img_url: "https://m.media-amazon.com/images/M/MV5BOWY4MmFiY2QtMzE1YS00NTg1LWIwOTQtYTI4ZGUzNWIxNTVmXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi941736473/1434659607842-pgv4ql-1657910195912.mp4?Expires=1659092769&Signature=DUz00QQcQWj4OHvxAxXBc75lnMV6X5dsbdiuOLod-VHW0RqAVi~AyDGaf4xoJDfQIU3yCSHYsMGc~xdzGXP9-gSdHiVMTeKfKJca0vr0uozqDBFad7tBz9lxo4rPegOpydpuAr-8fb-qsZ5hbYerVD2AsoI5gOO2-dTGW9FlysHudLqKEiRQHael0DNe-1TL1L72OsOPAK3YciGHU7f2BP7ptO154BEUgIB4xcMnqLlPP5gbaziYSyYnKPXeO~AckA7neYk7ZUNMmjIf~vWMgDe97dA1vzfjfXJ1ZtnozR8rYqwYMfl6m~vtfqfdX9DjGwNeTSxEuZAS4H8uaSsC2Q__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 3, title: "Jurassic World: Dominion", synopsis: "Four years after the destruction of Isla Nublar, dinosaurs now live--and hunt--alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history's most fearsome creatures in a new Era.", img_url: "https://m.media-amazon.com/images/M/MV5BOTBjMjA4NmYtN2RjMi00YWZlLTliYTktOTIwMmNkYjYxYmE1XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi764854809/1434659607842-pgv4ql-1651159417077.mp4?Expires=1659092188&Signature=aJaWD86BOcGFlCjAebRHx4kjZuneJaCs6BcFUdjG3T~WhkbT--GIhHULjv2wIoPzTr6HdeGybBiYSwRjnN5-DrJ0wt4snHeat-i5V3tB6c7IvngVOhocN2neo48zptHOiBmwqicY2FFx3MfnOtJOaMVoI70NL1yWaD79Urcq4Ouh8SoClPP0FRCPXn8WxGrBhR2kH8e6PrK9dnlgC3fvX-HhNn9G68MTrLzJF22yjbzbHAdhe3zTW5qZDa-jKVEr1Ddwq2VkVcD9FfK5BilKMQvT2yV~0GNAcxUcMW~BdoVIWQ0A-92fkb~j9QxkZszB0VZwmPbFxfXAwD03FTcALA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 4, title: "The Northman", synopsis: "From visionary director Robert Eggers comes The Northman, an action-filled epic that follows a young Viking prince on his quest to avenge his father's murder.", img_url: "https://m.media-amazon.com/images/M/MV5BMzVlMmY2NTctODgwOC00NDMzLWEzMWYtM2RiYmIyNTNhMTI0XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi2628633113/1434659607842-pgv4ql-1650564160409.mp4?Expires=1659092861&Signature=nW64fpKc-L52TBMhRtzLjnlbAVGbJeympVXUXA62RBVfPJ5mMOulBjL7oNZtskycJ5lzH0geauKuhg3XfCVxVgSyC8MBQfwkwBMYEft29btOQpJBR6d8Exk7U3lroGrbYn5c6nwmkmu1OlRCVqkk6RKlWGph8a6oDB9WYP106FA-vh6TIBDO10d~KDqc7j07ZveiwtoWBdbqFQbI7LliWGdaTuis4npDREvjgGyr-We-AQqmEHtI2SsIXieYwTtPfDfdbqwmzsE~ByuFzddP5gSxW72x4dHw-O~~gbx4zPVIJY5kGssIK7DmN1iVThU0paM6atoV763Jwt-On94nVQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 5, title: "Morbius", synopsis: "Biochemist Michael Morbius tries to cure himself of a rare blood disease, but he inadvertently infects himself with a form of vampirism instead.", img_url: "https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/morbius_onesheet_1400x2100_he.jpg?itok=-jQVkWIe", trailer_url: "https://imdb-video.media-imdb.com/vi862765849/1434659607842-pgv4ql-1646057736250.mp4?Expires=1659092921&Signature=SaHz4LqIiHktHidZy8ufCGDJVjA0lAUMncm2Tr8Rfd0~V-mBQC-fjLf0zgWfQGtUN0r~1x1IUsURLxLELIBAlnWeW8wIP6rfg8I2iyGS6ws8KDKwv9kPk7xMoYi41vbk3Keo0XxKS0Zeiqje4ZQ5TqfNEsdYWORPtTuawwy8C4GeCgz4Rkz8s4YiQNraJDxsWNz50DKTk2FLSHoG12ctyAiEW6mMYs8Kmo0y4rFG6FY-D0T3rscQMk73ygVTeiuyHD0qKCZ26eqoIMVhDoDFyxiXTNzMfDCVnpBx7bglgMnEz3IjNXtQ~lhNfjEImB8YdhiBklPqJDN3qVMdUiS7qg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 6, title: "Uncharted", synopsis: "Street-smart Nathan Drake is recruited by seasoned treasure hunter Victor 'Sully' Sullivan to recover a fortune amassed by Ferdinand Magellan, and lost 500 years ago by the House of Moncada.", img_url: "https://m.media-amazon.com/images/M/MV5BMWEwNjhkYzYtNjgzYy00YTY2LThjYWYtYzViMGJkZTI4Y2MyXkEyXkFqcGdeQXVyNTM0OTY1OQ@@._V1_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi420201241/1434659607842-pgv4ql-1644274969357.mp4?Expires=1659092963&Signature=TZHKB9-6IVqd9-Mv78deH8Hnl~FyHDcbHw-FSz9JxMPNUT8touLyusbW3Jjw2LSiDbtngCDc-h49f47aptV3WFYVG5noSbe-6yCk8ohOzfTdjwEVUCd2kuKYRDThoSyvGl6lZzSOFWAigFg4PWFARagbt4gWw1OLuM58uqT3tcmbaEFfhwZDX7SPnxxXRsjM8SB31blpsv~nlZtNyrAryQHgFEu12iSAIP4eUCYE~V7EZLLCrNkMCPPQfps7H81XJlsxldxd0QzgtF7cEqJLxIyMA4GwtRnskwicvz2Ru23CyBibhwmLaXVitT3GyTRPpgZStpiMQAzRFXWQ8jOYAQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 7, title: "Dune", synopsis: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.", img_url: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi3967205401/1434659607842-pgv4ql-1626959425069.mp4?Expires=1659093007&Signature=lnXZWCOzx3oWEKlyif~PxQAc3L1iTVbpWT-EZH-qg-Oblxh8j3ydRFeSXT0V8FJcvO0GPaMpgYd1YwwLWkq5efTIYgrXTy8QYtNoQo3-7u-iO~8s7z1aj99qvhj2aU-buqpNkjqmjp1ScnoniZyPmUnYZ~DW1bCCrcRfLNYEn8Pj3zxBo2Nlx8uuGhNLS01Eu9xSmK0fKqKPwPhVzTMWyw-jiNbjhvtLHh8DDmZgIDK6si8Rtf3vHj4DguiCyL-c~2EVOqpB3vSVi~by4xQ-UC49kXM6n5Ap1E~gks7S-gQqIYzx1yw~KR96pGnq-JeS6Q1CL-r3F8EuOFVHw~GvgQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" },
//   { id: 7, title: "The Lion King", synopsis: "After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.", img_url: "https://m.media-amazon.com/images/M/MV5BMjIwMjE1Nzc4NV5BMl5BanBnXkFtZTgwNDg4OTA1NzM@._V1_.jpg", trailer_url: "https://imdb-video.media-imdb.com/vi3509369881/1434659607842-pgv4ql-1561659105801.mp4?Expires=1659102329&Signature=txOCIPVCj6A~EVzuJwtCTAk9v7LimweZduAHdbCuU-hbPVD8u8BUW0qgdaiMHcBO0yGBTWL6SxF6e00~OeTTd3-Saj6YxRAl-fkWja5nZc7Z3HLl67CBqShNS2-3oO5CLU5vzjyxXx8njyzarObAxbQ1RfAMGM1n5EQFaKxIAGTAk51Bxkl83wNjMRnK09hWwjV0KBfAln5Et6P8M3si-4207iX0Qy~xMVw5Qfo2adnGjRRO0x6eUIDtYBCJpbx0nG-91k8mlujLocooQud39qT9QdRLHU1E~agqHP66IwcmfMRa1lpswCovVpU3VhpSg6muP8smOImyA1pf-sJspw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA" }
// ]


// ! WORKS PERFECTLY BUT CREATES ERROR BECAUSE OF API LIMITATION (100 CALL / DAY)
// return (
//   <div className={classes["movie-category-container"]}>
//     {(status === "completed" && !error) && movies.map(movie => {
//       return (
//         <div key={movie.id} className={classes["movie-card"]}>
//           <img src={movie.image} alt="image of movie: movie.title" />
//         </div>
//       )
//     })}
//   </div>
// );
