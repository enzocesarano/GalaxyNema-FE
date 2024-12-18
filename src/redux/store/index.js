import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginMe from '../reducers/logged';
import films from '../reducers/films';
import proiezioni from '../reducers/films';
import senzaproiezioni from '../reducers/films';
import { selectedTickets } from '../reducers/ticket';
import news from '../reducers/news';
import { selectedProiezione } from '../reducers/selectedProiezione';
import preferiti from '../reducers/preferiti';
import { invoices } from '../reducers/myInvoices';
import { newFilm } from '../reducers/newFilm';
import { newProiezioni } from '../reducers/newProiezioni';
import getSale from '../reducers/sale';

const bigReducer = combineReducers({
    loginMe: loginMe,
    films: films,
    proiezioni: proiezioni,
    senzaproiezioni: senzaproiezioni,
    selectedTickets: selectedTickets,
    news: news,
    selectedProiezione: selectedProiezione,
    preferiti: preferiti,
    invoices: invoices,
    newFilm: newFilm,
    newProiezioni: newProiezioni,
    getSale: getSale
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;