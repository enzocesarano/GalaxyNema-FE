import { Col } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../redux/actions";
import dayjs from "dayjs";

const MySingleTicket = () => {
  const dispatch = useDispatch();
  const { id_invoice } = useParams();
  const [proiezione, setProiezione] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoices = useSelector((state) => state.invoices.invoices);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getInvoices());
      try {
        const savedProiezione = await JSON.parse(localStorage.getItem("selectedProiezione"));
        if (savedProiezione) {
          setProiezione(savedProiezione);
        }
      } catch (error) {
        console.error("Errore nel recupero della proiezione dal localStorage", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <Col className="col-12 col-xl-6">
        <p className="text-secondary">Caricamento in corso...</p>
      </Col>
    );
  }

  const invoice = invoices.find((invoice) => invoice.id_invoice === id_invoice);

  if (!invoice || !invoice.ticket || invoice.ticket.length === 0) {
    return (
      <Col className="col-12 col-xl-6">
        <p className="text-secondary">Nessun biglietto disponibile per questa fattura</p>
      </Col>
    );
  }

  return (
    <Col className="col-12 col-xl-6 mb-5 mb-xl-0">
      {invoice.ticket.map((ticket, index) => (
        <div key={index} className="w-100 text-center text-md-start d-md-flex justify-content-center justify-content-md-start align-items-center mb-4 border border-1 border-Pimary bg-black rounded-4 p-4">
          <div className="me-md-3 mb-2 mb-xl-0">
            <QRCodeSVG
              value={ticket.id_ticket}
              bgColor="#000000"
              fgColor="#b4d429"
            />
          </div>
          <div className="text-secondary">
            <p className="m-0 p-0 fw-bold">
              <span className="fw-semibold">SALA:</span> {proiezione?.sala.nome}
            </p>
            <p className="m-0 p-0 fw-bold">
              <span className="fw-semibold">POSTO:</span> {ticket.postoASedere.fila} 
              {ticket.postoASedere.numeroPosto.slice(1)}
            </p>
            <p className="m-0 p-0 fw-bold">
              <span className="fw-semibold">DATA:</span> {proiezione?.dataProiezione}
            </p>
            <p className="m-0 p-0 fw-bold">
              <span className="fw-semibold">ORA:</span> {dayjs(proiezione.oraInizio).format("HH:mm")} - {dayjs(proiezione.oraFine).format("HH:mm")}
            </p>
            <p className="m-0 p-0 fw-bold">
              <span className="fw-semibold">NOME:</span> {ticket.nome} {ticket.cognome}
            </p>
            <p className="m-0 p-0 fw-bold">
              <span className="fw-semibold">BIGLIETTO:</span> {ticket.postoASedere.premium ? "Premium" : "Standard"}
            </p>
          </div>
        </div>
      ))}
    </Col>
  );
};

export default MySingleTicket;
