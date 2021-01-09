import React from 'react';

const UserMoviesContext = React.createContext({

  suggestedMovies: [],
  watchlist: [],
  searchResults: [],

  setSuggestedMovies: ()=>{},
  setWatchlist: ()=>{},
  setSearchResults: ()=>{},

});

export default UserMoviesContext;