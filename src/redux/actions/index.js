
export const LOGIN = "LOGIN"
export const SET_REGISTRAZIONE_ERRORS = "SET_REGISTRAZIONE_ERRORS"
export const FILMS = "FILMS"
export const PROIEZIONI = "PROIEZIONI"
export const SENZA_PROIEZIONI = "SENZA_PROIEZIONI"
export const SELECT_TICKET = "SELECT_TICKET";
export const NEWS = "NEWS"
export const SELECT_PROIEZIONE = "SELECT_PROIEZIONE"
export const AGGIUNGI_PREFERITO = "GGIUNGI_PREFERITO"
export const RIMUOVI_PREFERITO = "RIMUOVI_PREFERITO"
export const SET_PREFERITI = "SET_PREFERITI"

export const selectTicket = (tickets) => ({
  type: SELECT_TICKET,
  payload: tickets,
});

export const selectProiezioneAction = (proiezione) => ({
  type: SELECT_PROIEZIONE,
  payload: proiezione,
});

export const register = (data) => {
  return fetch("http://localhost:3001/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw errorData;
        });
      }

      return response.json();
    })
    .catch((error) => {
      console.error("Errore durante la registrazione:", error.message);
      throw error;
    });
};


  export const login = (data) => {
    return fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.token) {
          localStorage.setItem("token", data.token);
        } else {
          alert("Token non trovato nella risposta.");
          throw new Error("Token non trovato nella risposta.");
        }
      })
      .catch((error) => {
        console.error("Errore durante il login:", error.message);
        throw error;
      });
  };
  
  export const meLogin = () => {
    return (dispatch) => {
      fetch("http://localhost:3001/me", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}` ,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei dati dell'utente");
          }
        })
        .then((data) => {
          console.log("Dati ricevuti dall'API:", data); 
          dispatch({
            type: LOGIN,
            payload: data,
          });
        })
        .catch((err) => {
          console.log("Errore nel recupero dei dati dell'utente:", err);
        });
    };
  };
  

  export const filmsArray = (filters = {}) => {
    return (dispatch) => {
      const url =
        "http://localhost:3001/films/filters?" +
        Object.entries(filters)
          .map(
            ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");
  
      fetch(url,)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei dati");
          }
        })
        .then((data) => {
          console.log("Dati ricevuti dall'API:", data);
          dispatch({
            type: PROIEZIONI,
            payload: data,
          });
        })
        .catch((err) => {
          console.log("Errore nel recupero dei dati:", err);
        });
    };
  };

  export const filmsWhitoutProiezioni = () => {
    return (dispatch) => {
    
  
      fetch("http://localhost:3001/films/senzaproiezioni", {

      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei dati");
          }
        })
        .then((data) => {
          console.log("film senza proiezioni", data);
          dispatch({
            type: SENZA_PROIEZIONI,
            payload: data,
          });
        })
        .catch((err) => {
          console.log("Errore nel recupero dei dati:", err);
        });
    };
  };

  export const newsCinema = () => {
    return (dispatch) => {
      fetch("http://localhost:3001/films/news", {

      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nel recupero dei dati");
          }
        })
        .then((data) => {
          console.log("news: ", data);
          dispatch({
            type: NEWS,
            payload: data,
          });
        })
        .catch((err) => {
          console.log("Errore nel recupero dei dati:", err);
        });
    };
  };
  
  

  export const postInvoice = (data, id_proiezione) => {
    return fetch("http://localhost:3001/me/invoices?id_proiezione=" + id_proiezione, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw errorData;
          });
        }
  
        return response.json();
      })
      .catch((error) => {
        console.error("Errore durante l'acquisto:", error.message);
        throw error;
      });
  };

  export const getPreferiti = () => {
    return(dispatch) => {
      fetch('http://localhost:3001/me/films/preferiti', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel recupero dei dati");
        }
      })
      .then((data) => {
        console.log("preferiti: ", data);
        dispatch({
          type: SET_PREFERITI,
          payload: data,
        });
      })
      .catch((error) => {
        console.error('Errore durante il recupero dei preferiti:', error);
      });
    };
  };


  export const addPreferiti = (film) => {
    return(dispatch) => {
      fetch(`http://localhost:3001/me/films/${film.id_film}/preferiti`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(film),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore durante l\'aggiunta ai preferiti');
        }
        dispatch({
          type: AGGIUNGI_PREFERITO,
          payload: film,
        });
      })
      .catch((error) => {
        console.error("Errore durante l'aggiunta ai preferiti:", error.message);
          throw error;
      });
    } 
  };

  export const removePreferiti = (film) => {
    return(dispatch) => {
      fetch(`http://localhost:3001/me/films/${film.id_film}/preferiti`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Errore durante l\'aggiunta ai preferiti');
        }
        dispatch({
          type: RIMUOVI_PREFERITO,
          payload: film,
        });
      })
      .catch((error) => {
        console.error("Errore: ", error.message);
          throw error;
      });
    } 
  };