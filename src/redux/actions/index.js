
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
export const INVOICES = "INVOICES"
export const UPDATE_USER = "UPDATE_USER"


export const selectTicket = (tickets) => ({
  type: SELECT_TICKET,
  payload: tickets,
});

export const selectProiezioneAction = (proiezione) => ({
  type: SELECT_PROIEZIONE,
  payload: proiezione,
});

export const register = (data) => {
  return fetch("https://galaxynema.onrender.com/auth/register", {
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
    return fetch("https://galaxynema.onrender.com/auth/login", {
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
      fetch("https://galaxynema.onrender.com/me", {
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


  export const meUpdate = (data) => {
    return async (dispatch) => {
      try {
        const response = await fetch("https://galaxynema.onrender.com/me", {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw errorData;
        }
  
        const updatedData = await response.json();
        console.log("Dati aggiornati:", updatedData);
        dispatch({
          type: UPDATE_USER,
          payload: updatedData,
        });
  
        return updatedData;
      } catch (err) {
        console.log("Errore nell'aggiornamento dei dati dell'utente:", err);
        throw err;
      }
    };
  };

  export const updateAvatar = (avatarFile) => {
    const formData = new FormData();
    formData.append("avatar", avatarFile);
  
    return fetch("https://galaxynema.onrender.com/me/avatar", {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw errorData;
          });
        }
        return response.text();
      })
      .then((updatedAvatarUrl) => {
        return updatedAvatarUrl;
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento dell'avatar:", error);
        throw new Error(error.message);
      });
  };
  
  
  
  
  

  export const filmsArray = (filters = {}) => {
    return (dispatch) => {
      const url =
        "https://galaxynema.onrender.com/films/filters?" +
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
    
  
      fetch("https://galaxynema.onrender.com/films/senzaproiezioni", {

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
      fetch("https://galaxynema.onrender.com/films/news", {

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
  
  

 /*  export const postInvoice = (data, id_proiezione) => {
    return fetch("https://galaxynema.onrender.com/me/invoices?id_proiezione=" + id_proiezione, {
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
  }; */

  export const postInvoice = (paymentData) => {
    console.log("Dati inviati al server:", JSON.stringify(paymentData)); 
    return fetch("https://galaxynema.onrender.com/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            console.error("Errore nella risposta:", errorText);
            try {
              const errorData = JSON.parse(errorText);
              throw errorData;
            } catch (e) {
              throw new Error(errorText || "Errore sconosciuto");
            }
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Risposta da Stripe:", data);
        if (data.url) {
          console.log("Reindirizzando a:", data.url);
          window.location.href = data.url;
        }
      })
      .catch((error) => {
        console.error("Errore durante il processo di pagamento:", error.message || error);
        alert(error.error || "Errore durante il processo di pagamento. Riprova.");
        throw error;
      });
  };
  
  
  

  export const getPreferiti = () => {
    return(dispatch) => {
      fetch('https://galaxynema.onrender.com/me/films/preferiti', {
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
      fetch(`https://galaxynema.onrender.com/me/films/${film.id_film}/preferiti`, {
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
      fetch(`https://galaxynema.onrender.com/me/films/${film.id_film}/preferiti`, {
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


  export const getInvoices = () => {
    return(dispatch) => {
      fetch('https://galaxynema.onrender.com/me/invoices', {
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
        console.log("Invoices: ", data);
        dispatch({
          type: INVOICES,
          payload: data,
        });
      })
      .catch((error) => {
        console.error('Errore durante il recupero dei preferiti:', error);
      });
    };
  };