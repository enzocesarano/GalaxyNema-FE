import React, { useState } from "react";
import { Form, Button, Collapse } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filmsArray } from "../redux/actions";

const MySearch = () => {
  const [filters, setFilters] = useState({
    titolo: "",
    genere: "",
    minVoteAverage: "",
    maxVoteAverage: "",
    sortBy: "",
    proiezioneAfter: "",
    proiezioneBefore: "",
  });

  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "proiezioneAfter" || name === "proiezioneBefore") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        alert("La data di proiezione non può essere nel passato.");
        e.target.value = "";
        return;
      }
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value)
    );
    dispatch(filmsArray(activeFilters));
  };

  return (
    <Form className="mb-4 mt-1 px-2" onSubmit={handleSearch}>
      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Cerca..."
          name="titolo"
          value={filters.titolo}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black text-light border-0 placeholder-light w-75 me-2 fs-small"
        />
        <Form.Select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleInputChange}
          className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 w-25 me-2 fs-small"
        >
          <option value="">Ordina per</option>
          <option value="titolo">Titolo</option>
          <option value="voteAverage">Voto Medio</option>
          <option value="dataUscita">Data di Uscita</option>
        </Form.Select>
        <Button
        className="botton-check border-0 rounded-4 text-black fw-bold me-2 fs-small"
        onClick={() => setShowFilters(!showFilters)}
      >
        Filtri
      </Button>
        <Button
          type="submit"
          className="botton-check border-0 rounded-4 text-black fw-bold fs-small"
        >
          Search
        </Button>
      </div>

      <Collapse in={showFilters}>
        <div>
          <div className="d-flex flex-wrap flex-sm-nowrap gap-2 mt-3">
            <Form.Select
              name="genere"
              value={filters.genere}
              onChange={handleInputChange}
              className="rounded-4 px-4 py-2 bg-black border-0 placeholder-light text-secondary fs-small"
            >
              <option value="">GENERE</option>
              <option value="AZIONE">AZIONE</option>
              <option value="AVVENTURA">AVVENTURA</option>
              <option value="ANIMAZIONE">ANIMAZIONE</option>
              <option value="COMMEDIA">COMMEDIA</option>
              <option value="CRIME">CRIME</option>
              <option value="DOCUMENTARIO">DOCUMENTARIO</option>
              <option value="DRAMMA">DRAMMA</option>
              <option value="FAMIGLIA">FAMIGLIA</option>
              <option value="FANTASY">FANTASY</option>
              <option value="STORIA">STORIA</option>
              <option value="HORROR">HORROR</option>
              <option value="MUSICA">MUSICA</option>
              <option value="MISTERO">MISTERO</option>
              <option value="ROMANCE">ROMANCE</option>
              <option value="FANTASCIENZA">FANTASCIENZA</option>
              <option value="TELEVISIONE_FILM">TELEVISIONE FILM</option>
              <option value="THRILLER">THRILLER</option>
              <option value="GUERRA">GUERRA</option>
              <option value="WESTERN">WESTERN</option>
            </Form.Select>

            <Form.Control
              type="date"
              placeholder="Proiezione Dopo"
              name="proiezioneAfter"
              value={filters.proiezioneAfter}
              onChange={handleInputChange}
              className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
            />

            <Form.Control
              type="date"
              placeholder="Proiezione Prima"
              name="proiezioneBefore"
              value={filters.proiezioneBefore}
              onChange={handleInputChange}
              className="rounded-4 px-4 py-2 bg-black text-secondary placeholder-light border-0 fs-small"
            />

            <Form.Select
              name="minVoteAverage"
              value={filters.minVoteAverage}
              onChange={(e) => {
                const minVote = parseInt(e.target.value, 10);
                if (filters.maxVoteAverage && minVote > filters.maxVoteAverage) {
                  alert("Il voto minimo non può essere maggiore del voto massimo.");
                  return;
                }
                handleInputChange(e);
              }}
              className="rounded-4 px-4 py-2 bg-black border-0 text-secondary placeholder-light fs-small"
            >
              <option value="">Voto Min</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>

            <Form.Select
              name="maxVoteAverage"
              value={filters.maxVoteAverage}
              onChange={(e) => {
                const maxVote = parseInt(e.target.value, 10);
                if (filters.minVoteAverage && maxVote < filters.minVoteAverage) {
                  alert("Il voto massimo non può essere minore del voto minimo.");
                  return;
                }
                handleInputChange(e);
              }}
              className="rounded-4 px-4 py-2 bg-black border-0 text-secondary placeholder-light fs-small"
            >
              <option value="">Voto Max</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Select>
          </div>
        </div>
      </Collapse>
    </Form>
  );
};

export default MySearch;
