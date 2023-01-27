import React from "react";
import Container from "component/Container";
import Hits from "component/Hits";
import Catalog from "component/pages/Catalog";

function Main() {
  return (
    <Container>
      <Hits />
      <Catalog />
    </Container>
  );
}

export default Main;
