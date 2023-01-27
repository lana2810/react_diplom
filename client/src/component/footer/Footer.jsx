import React from "react";
import SectionContact from "./SectionContact";
import SectionCopy from "./SectionCopy";
import SectionLinks from "./SectionLinks";
import SectionPay from "./SectionPay";

function Footer() {
  return (
    <footer className="container bg-light footer">
      <div className="row">
        <div className="col">
          <SectionLinks />
        </div>
        <div className="col">
          <SectionPay />
          <SectionCopy />
        </div>
        <div className="col text-right">
          <SectionContact />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
