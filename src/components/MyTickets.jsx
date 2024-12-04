import { Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { filmsArray, getInvoices } from "../redux/actions";

const MyTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const films = useSelector((state) => state.proiezioni.proiezioni);
  const invoices = useSelector((state) => state.invoices.invoices);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      dispatch({ type: "RESET_STATE" });
    } else {
      dispatch(getInvoices());
      dispatch(filmsArray());
    }
  }, [dispatch, token]);

  const isLoading = films.length === 0 || invoices.length === 0;

  const handleInvoiceClick = (idInvoice) => {
    const selectedInvoice = invoices.find((invoice) => invoice.id_invoice === idInvoice);

    const associatedProiezione = films.content
      .flatMap((film) => film.proiezioneList)
      .find((proiezione) =>
        proiezione.ticketList.some(
          (ticket) => ticket.id_ticket === selectedInvoice.ticket[0]?.id_ticket
        )
      );

    if (associatedProiezione) {
      localStorage.setItem(
        'selectedProiezione',
        JSON.stringify(associatedProiezione)
      );
    }

    navigate(`/tickets/${idInvoice}`);
  };

  return (
    <Col className="col-12 col-xl-6 p-1 h-100 overflow-card mb-4 mb-xl-0">
      {isLoading ? (
        <p className="text-secondary">Non hai ancora tickets!</p>
      ) : (
        invoices.map((invoice) => {
          const associatedFilm = films.content.find((film) =>
            film.proiezioneList.some((proiezione) =>
              proiezione.ticketList.some(
                (ticket) => ticket.id_ticket === invoice.ticket[0]?.id_ticket
              )
            )
          );

          const associatedProiezione = associatedFilm
            ? associatedFilm.proiezioneList.find((proiezione) =>
                proiezione.ticketList.some(
                  (ticket) => ticket.id_ticket === invoice.ticket[0]?.id_ticket
                )
              )
            : null;

          const ticketCount = invoice.ticket?.length || 0;

          return (
            <div
              key={invoice.id_invoice}
              className="myTick rounded-4 overflow-hidden mb-3 position-relative hero-hover cursor-pointer"
              onClick={() => handleInvoiceClick(invoice.id_invoice)} // Gestisci il click qui
            >
              {associatedFilm && associatedProiezione ? (
                <>
                  <Image
                    src={associatedFilm.backdrop_url}
                    alt="Film backdrop"
                    className="w-100 rounded-4 object-fit"
                    fluid
                  />
                  <div className="position-absolute w-100 h-100 top-0 start-0 p-4">
                    <div className="mb-1">
                      <p className="text-light text-ticket fw-bold m-0">
                        {associatedFilm.titolo.toUpperCase()}
                      </p>
                    </div>
                    <div className="text-ticketSmall">
                      <p className="text-light m-0 p-0">
                        Fattura: {invoice.id_invoice}
                      </p>
                      <p className="text-light m-0 p-0">
                        Importo: €{invoice.importo.toFixed(2)}
                      </p>
                      <p className="text-light m-0 p-0">
                        Tickets: {ticketCount}
                      </p>
                      <p className="text-light m-0 p-0">
                        Sala: {associatedProiezione.sala.nome}
                      </p>
                      <p className="text-light m-0 p-0">
                        Data:{" "}
                        {dayjs(associatedProiezione.dataProiezione).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                      <p className="text-light m-0 p-0">
                        Orario:{" "}
                        {dayjs(associatedProiezione.oraInizio).format("HH:mm")}{" "}
                        - {dayjs(associatedProiezione.oraFine).format("HH:mm")}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-secondary">
                  ...
                </p>
              )}
            </div>
          );
        })
      )}
    </Col>
  );
};

export default MyTickets;
