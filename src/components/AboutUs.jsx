import React from "react";
import { Col } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Col className="p-0 pb-5 pb-xl-0 d-flex flex-column justify-content-between bg-dark text-secondary h-100 overflow-card text-center">
      <div>
        <h1>GALAXYNEMA</h1>
        <p>
          E' una piattaforma web innovativa e all'avanguardia, progettata per
          soddisfare le esigenze degli appassionati di cinema di tutte le età.
          La nostra missione è fornire un'esperienza cinematografica
          accessibile, intuitiva e di alta qualità, con l'obiettivo di
          semplificare l'intero processo di ricerca dei film, acquisto dei
          biglietti e gestione delle preferenze personali. Offre una vasta
          selezione di film, tra cui le ultime uscite, i classici intramontabili
          e le produzioni indipendenti, con un sistema di ricerca avanzato che
          consente agli utenti di trovare facilmente ciò che cercano.
        </p>
        <p>
          Oltre alla qualità del servizio, ci impegniamo a rispettare i più alti
          standard di sicurezza e protezione dei dati, garantendo una
          navigazione sicura e una gestione protetta delle informazioni
          sensibili.
        </p>
        <p className="mb-4">
          <strong>GALAXYNEMA</strong> è più di una semplice web app: è un punto
          di riferimento per chi desidera un'esperienza cinematografica di alta
          qualità, direttamente a portata di mano.
        </p>
      </div>
      <div>
        <h2>Dove siamo</h2>
        <p>
          Scopri la nostra sede e ottieni indicazioni per raggiungerci
          facilmente.
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.2797914714433!2d14.53629008937193!3d40.799845058450636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133bba4a13447753%3A0x16d2d5050060f593!2sVia%20Roma%2C%2046%2C%2080040%20Poggiomarino%20NA!5e0!3m2!1sit!2sit!4v1734000239731!5m2!1sit!2sit"
          width="100%"
          height="300"
          style={{ border: "0", borderRadius: "8px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </Col>
  );
};

export default AboutUs;
