import React from 'react';

const AppContext = React.createContext({

  auth: undefined,
  searchText: '',
  profileName: '',
  suggestedMovies: [],
  watchlist: [],
  searchResults: [],

  setAuth: ()=>{},
  setProfileName: ()=>{},
  setSuggestedMovies: ()=>{},
  setWatchlist: ()=>{},
  setSearchResults: ()=>{},

});

export default AppContext;