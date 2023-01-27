import React from "react";
import { Link } from "react-router-dom";

function SectionContact() {
  return (
    <section className="footer-contacts">
      <h5>Контакты:</h5>
      <Link to="tel:+7-495-790-35-03" className="footer-contacts-phone">
        +7 495 79 03 5 03
      </Link>
      <span className="footer-contacts-working-hours">
        Ежедневно: с 09-00 до 21-00
      </span>
      <Link to="mailto:office@bosanoga.ru" className="footer-contacts-email">
        office@bosanoga.ru
      </Link>
      <div className="footer-social-links">
        <div className="footer-social-link footer-social-link-twitter" />
        <div className="footer-social-link footer-social-link-vk" />
      </div>
    </section>
  );
}

export default SectionContact;
