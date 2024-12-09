import React from "react";
import { useSelector } from "react-redux";

const FilmsAdmin = () => {
  const films = useSelector((state) => state.proiezioni.proiezioni);
  const senzaproiezioni = useSelector(
    (state) => state.senzaproiezioni.senzaproiezioni
  );

  return (
      <div className="films-admin h-100 overflow-card">
        <div className="text-secondary">
          <h3>Film con Proiezioni</h3>
          {films.content && films.content.length > 0 ? (
            <ul>
              {films.content.map((film, index) => (
                <li key={index}>
                  <strong>{film.titolo}</strong> - {film.genere} ({film.dataUscita})
                </li>
              ))}
            </ul>
          ) : (
            <p>Nessun film con proiezioni disponibile.</p>
          )}
        </div>

        <div className="text-secondary">
          <h3>Film senza Proiezioni</h3>
          {senzaproiezioni.content && senzaproiezioni.content.length > 0 ? (
            <ul>
              {senzaproiezioni.content.map((film, index) => (
                <li key={index}>
                  <strong>{film.titolo}</strong> - {film.genere} ({film.dataUscita})
                </li>
              ))}
            </ul>
          ) : (
            <p>Nessun film senza proiezioni disponibile.</p>
          )}
        </div>
      </div>
  );
};

export default FilmsAdmin;
