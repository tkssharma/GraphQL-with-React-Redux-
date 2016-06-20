import axios from 'axios';

export const REQUEST_WEATHER = 'REQUEST_WEATHER';
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER';
export const CLEAR_WEATHER = 'CLEAR_WEATHER';
export const DELETE_CITY = 'DELETE_CITY';

export const FETCH_YOUTUBE_WEATHER = 'FETCH_YOUTUBE_WEATHER';
export function requestWeather(term) {
  return  { type: REQUEST_WEATHER
    ,term
  };
}

export function receiveWeather(city) {
  return  { type: RECEIVE_WEATHER
    , city
  };
}

export function clearWeather() {
  return  { type: CLEAR_WEATHER
  };
}

export function deleteCity(id) {
  return  { type: DELETE_CITY
    , id
  };
}
// method to combine respone together 
export function receiveWeatherandYouTube(weather,youtube) {
  return  { type: FETCH_YOUTUBE_WEATHER
    , weather
    , youtube
  };
}
// graphQL query just to fetch weather Data 
// axios post request with axios.post to graphql port 8888
export function fetchWeather(term) {
  return dispatch => {
    dispatch(requestWeather(term));
    return axios.post('/graphql', {
      query: `
      {
        weatherForecast(city:"${term}") {
          city {
            id,
            name,
            coord{
              lat,
              lng: lon
            }
          },
          pressure_data,
          humidity_data,
          temp_f_data,
          temp_f_avg,
          pressure_avg,
          humidity_avg,
        }
      }
      `
    })
    .then( response => {
      // response from axios comes with data object and so does graphql
      dispatch(receiveWeather(response.data.data.weatherForecast));

    });
  };
}

// graphQL query just to fetch youtube Data only 
// axios post request with axios.post to graphql port 8888
export function fetchWeather(term) {
  return dispatch => {
    dispatch(requestWeather(term));
    return axios.post('/graphql', {
      query: `
      {
        youtube(term:"surfboards") {
          kind,
          etag,
          id {
            videoId,
            kind
          },
          snippet {
            title
            channelId,
            channelTitle,
            description,
            liveBroadcastContent,
            publishedAt
            thumbnails {
              default {
                url
              },
              medium {
                url
              },
              high {
                url
              }
            }
          }

        }
      }
      `
    })
    .then( response => {
      // response from axios comes with data object and so does graphql
      dispatch(receiveWeather(response.data.data.weatherForecast));

    });
  };
}
// single query to fetch data from weather api and youtube api together in single call
// axios post request with axios.post to graphql port 8888
export function fetchWeatherandYouTube(term) {
  return dispatch => {
    dispatch(requestWeather(term));
    return axios.post('/graphql', {
      query: `
      {
        weatherForecast(city:"${term}") {
          city {
            id,
            name,
            coord{
              lat,
              lng: lon
            }
          },
          pressure_data,
          humidity_data,
          temp_f_data,
          temp_f_avg,
          pressure_avg,
          humidity_avg,
        }
      },
      youtube(term:"${term}") {
        kind,
        etag,
        id {
          videoId,
          kind
        },
        snippet {
          title
          channelId,
          channelTitle,
          description,
          liveBroadcastContent,
          publishedAt
          thumbnails {
            default {
              url
            },
            medium {
              url
            },
            high {
              url
            }
          }
        }
      } `
    })
    .then( response => {
      // calling one common function to gather response 
      // response from axios comes with data object and so does graphql
      dispatch(receiveWeatherandYouTube(response.data.data.weatherForecast,response.data.youtube));
      
    });
  };
}
