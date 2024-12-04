import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTicket } from "../redux/actions";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyDaily = ({ proiezione }) => {
  const dispatch = useDispatch();
  const selectedTickets = useSelector(
    (store) => store.selectedTickets.selectedTickets
  );

  useEffect(() => {
    if (proiezione && proiezione.id_proiezione) {
      const savedSeats =
        JSON.parse(
          localStorage.getItem(`selectedTickets_${proiezione.id_proiezione}`)
        ) || [];
      dispatch(selectTicket(savedSeats));
    }
  }, [proiezione, dispatch]);

  const toggleSeat = (seat) => {
    const savedSeats =
      JSON.parse(
        localStorage.getItem(`selectedTickets_${proiezione.id_proiezione}`)
      ) || [];

    const updatedSeats = savedSeats.includes(seat)
      ? savedSeats.filter((s) => s !== seat)
      : [...savedSeats, seat];

    localStorage.setItem(
      `selectedTickets_${proiezione.id_proiezione}`,
      JSON.stringify(updatedSeats)
    );

    dispatch(selectTicket(updatedSeats));
  };

  if (!proiezione) {
    return (
      <p className="text-danger">
        Seleziona una proiezione per vedere i posti disponibili.
      </p>
    );
  }

  const occupiedSeats = proiezione.ticketList.map((ticket) => {
    const fila = ticket.postoASedere.fila;
    const numeroPosto = ticket.postoASedere.numeroPosto;
    return `${fila} ${numeroPosto}`;
  });

  const rows = [];
  const rowLetters = ["A", "B", "C", "D", "E"];
  const basePrice = 5.0;
  const premiumIncrement = 3.0;
  const priceMultiplier = proiezione.moltiplicatore_prezzo;

  const calculatePrice = (rowLetter) =>
    rowLetter === "D"
      ? (basePrice + premiumIncrement) * priceMultiplier
      : basePrice * priceMultiplier;

  const selectedSeatPrices = selectedTickets.map((seat) => {
    const rowLetter = seat.split(" ")[0];
    return calculatePrice(rowLetter);
  });

  const totalPrice = selectedSeatPrices.reduce((sum, price) => sum + price, 0);

  rowLetters.forEach((rowLetter) => {
    const rowSeats = [];
    for (let seatIndex = 0; seatIndex < 10; seatIndex++) {
      const seatValue = `${rowLetter} P${seatIndex + 1}`;
      const isRedSeat = rowLetter === "D";
      const isOccupied = occupiedSeats.includes(seatValue);
      const isChecked = selectedTickets.includes(seatValue);

      rowSeats.push(
        <label
          key={seatValue}
          className="checkbox-label"
          aria-label={seatValue}
        >
          <input
            className={`m-1 ms-0 mb-0 ${isRedSeat ? "poltrona" : ""} ${
              isOccupied ? "occupato" : ""
            }`}
            type="checkbox"
            value={seatValue}
            checked={isChecked}
            disabled={isOccupied}
            onChange={() => toggleSeat(seatValue)}
          />
        </label>
      );
    }

    rows.push(
      <li
        className="list-unstyled text-secondary d-flex justify-content-center mb-1"
        key={`row-${rowLetter}`}
      >
        {rowSeats}
      </li>
    );
  });

  // Leggi l'autenticazione da localStorage
  const isAuthenticated = localStorage.getItem("token") !== null;

  // Condizione per il messaggio di checkout
  const isCheckoutDisabled = selectedTickets.length === 0 || !isAuthenticated;

  return (
    <div className="mb-5 mb-xl-0">
      <Card className="bg-transparent border-0 px-4 mb-2 text-secondary">
        <div className="w-100 align-items-center p-1">
          <div className="d-flex flex-column justify-content-between">
            <ol className="w-100 p-0 m-0">{rows}</ol>
            <div className="d-flex flex-column align-items-center">
              <div className="w-100 mb-2">
                <p className="text-center fw-bold m-0 p-0">
                  Totale: €{totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="mb-2">
                <Link
                  to={isAuthenticated && selectedTickets.length > 0 ? "/checkout" : ""}
                  className={`btn botton-check border-0 rounded-4 fw-bold ${isCheckoutDisabled ? "text-danger disabled" : "text-black"}`}
                  onClick={(e) => {
                    if (isCheckoutDisabled) {
                      e.preventDefault();
                    }
                  }}
                >
                  {isAuthenticated && selectedTickets.length === 0
                    ? "Seleziona un posto"
                    : isCheckoutDisabled
                    ? "Effettua il login e seleziona un posto"
                    : "Checkout"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyDaily;
