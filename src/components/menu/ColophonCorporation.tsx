import { ColophonCorporation } from "@/types/restaurant";
import React, { Fragment } from "react";

type Props = {
  colophon: ColophonCorporation;
};

const ColophonCorporation = ({ colophon }: Props) => {
  //Kapitalgesellschaft (z.B. GmbH, AG)
  // Name und Anschrift der Gesellschaft (Restaurant GmbH)
  // Vertretungsberechtigte Personen (Geschäftsführer, Vorstand)
  // Umsatzsteuer-Identifikationsnummer (falls vorhanden)
  // Handelsregister, Registergericht und Registernummer
  // Angabe des Kapitals (bei GmbH und AG)
  // Klarer Hinweis auf die Verantwortlichkeit (z.B. "Verantwortlich im Sinne des § 55 Abs. 2 RStV")
  return (
    <Fragment>
      <span className="pb-2 font-bold">{colophon.companyName}</span>
      <span>
        {colophon.location.streetName} {colophon.location.streetNumber}
      </span>
      <span>
        {colophon.location.postalCode} {colophon.location.city}
      </span>
      <span className="pb-2">{colophon.location.country}</span>
      <span>
        Vertretungsberechtigte: {colophon.representativeNames.join(", ")}
      </span>
      <span>Telefon: {colophon.telephone}</span>
      <span>Fax: {colophon.fax}</span>
      <span className="pb-2">Email: {colophon.email}</span>
      <span>Handelsregister: {colophon.registerNumber}</span>
      <span>Registergericht: {colophon.registerChamber}</span>
      {colophon.vatNumber && (
        <span>
          Umsatzsteuer-Identifikationsnummer gem. §27a UStG:{" "}
          {colophon.vatNumber}
        </span>
      )}
      <span className="pt-4">
        Plattform der EU-Kommission zur Online-Streitbeilegung:
        https://ec.europa.eu/consumers/odr
      </span>
    </Fragment>
  );
};

export default ColophonCorporation;
