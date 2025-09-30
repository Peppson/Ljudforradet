import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { isUserLoggedIn, scrollToElement } from "../utils/Utilities";
import { useAuth } from "../context/AuthProvider";
import type Gear from "../interfaces/Gear";
import type User from "../interfaces/User";
import Divider from "../components/Divider";
import ProductModal from "../components/ProductsPage/ProductModal";
import LoginPromptModal from "../components/ProductsPage/LoginPromptModal";
import ProductCard from "../components/ProductsPage/ProductCard";

export default function ProductsPage() {
  const { user } = useAuth();
  const [sortedGear, setSortedGear] = useState<Gear[]>([]);
  const [currentFilter, setCurrentFilter] = useState("show");
  const [currentSearch, setCurrentSearch] = useState("");
  const [loginPromtModal, setLoginPromtModal] = useState(false);
  const [productModal, setProductModal] = useState({
    show: false,
    gear: null as Gear | null
  });

  const allGear = useLoaderData() as {
    gear: Gear[];
  };

  useEffect(() => {
    sortAllGear("nameAsc");
  }, []);

  const sortAllGear = (sortOption: string) => {
    const tmpGear = [...allGear.gear];

    switch (sortOption) {
      case "nameAsc":
        tmpGear.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "nameDsc":
        tmpGear.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      case "priceAsc":
        tmpGear.sort((a, b) => a.dailyPrice - b.dailyPrice);
        break;
      case "priceDsc":
        tmpGear.sort((a, b) => b.dailyPrice - a.dailyPrice);
        break;
    }

    setSortedGear(tmpGear);
  };

  const filteredGear = sortedGear.filter(
    x => currentFilter === "show" || x.available
  );

  const searchedGear = () => {
    const searchTerm = currentSearch.trim();
    if (searchTerm === "") {
      return filteredGear;
    }
    return filteredGear.filter(
      x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        x.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const processedGear = searchedGear();

  const openProductModal = async (gear: Gear) => {
    // If not logged in show login modal instead
    const isLoggedIn = await isUserLoggedIn(user as User | null);
    if (!isLoggedIn) {
      setLoginPromtModal(true);
      return;
    }
    setProductModal({ show: true, gear: gear });
  };

  return <>
    <section
      className="page-section-products background-container-img"
      style={{ "--bg-image": "url('/images/video-still-1.png')" } as React.CSSProperties}>

      <Container className="mb-5 pb-3">
        <Row className="align-items-center py-5">
          <Col className="text-center text-md-start">
            <h3 className="pb-2 display-4">
              Utrustning
            </h3>
            <p className="m-1"> Vi erbjuder ett brett sortiment av högkvalitativ utrustning för både hobbyister och professionella.</p>
            <p className="m-1"> Bläddra bland våra produkter nedan och hitta exakt det du behöver.</p>
          </Col>
        </Row>
      </Container>
    </section>

    <Divider />

    <section id="products-section" className="background-color-overlay-darker pt-2 pb-4">
      {/* Search and Sort Header */}
      <Container className="pt-4 pb-2">
        <Row>
          <Col md={6} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label className="w-100">Sök utrustning
                <Form.Control
                  name="search"
                  type="text"
                  autoComplete="off"
                  maxLength={40}
                  className="border-light rounded-2 mt-2"
                  placeholder="Sök efter utrustning"
                  onChange={(e) => { setCurrentSearch(e.target.value) }} />
              </Form.Label>
            </Form.Group>
          </Col>

          <Col md={3} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label className="w-100">Sortera efter
                <Form.Select
                  name="sort"
                  className="border-light modal-select-options mt-2"
                  onChange={(e) => { sortAllGear(e.target.value); }}>
                  <option value="nameAsc">Namn a–ö</option>
                  <option value="nameDsc">Namn ö–a</option>
                  <option value="priceAsc">Billigast först</option>
                  <option value="priceDsc">Dyrast först</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="w-100">Visa även uthyrda
                <Form.Select
                  className="border-light modal-select-options mt-2"
                  name="available"
                  value={currentFilter}
                  onChange={(e) => { setCurrentFilter(e.target.value) }} >
                  <option value="show">Ja</option>
                  <option value="hide">Nej</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>

        <div className="divider-products d-flex align-items-center mt-4 pt-3 pb-1">
          <p className="text-center mx-3 mb-0">Visar <span className="text-danger">{processedGear.length}</span> produkter</p>
        </div>
      </Container>

      {/* Products grid */}
      <Container>
        <Row className="mt-1 pb-5 g-4 ">
          {processedGear
            .map((item) => (
              <Col key={item.id} xxl={3} lg={4} md={6} xs={12} >
                <ProductCard
                  item={item}
                  onBookClick={openProductModal} />
              </Col>
            ))}
        </Row>
      </Container>

      <Button
        onClick={() => { scrollToElement("products-section") }}
        className="btn btn-primary px-5 py-2 rounded-5 hover-grow d-flex mx-auto mb-3">
        Till toppen!
      </Button>
    </section>

    <ProductModal
      item={productModal.gear}
      show={productModal.show}
      onHide={() => { setProductModal({ show: false, gear: null }); }} />

    <LoginPromptModal
      show={loginPromtModal}
      onHide={() => { setLoginPromtModal(false) }} />
  </>;
}
