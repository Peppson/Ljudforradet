import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { scrollToElement } from "../utils/Utilities";
import { useAuth } from "../context/AuthProvider";
import { useShowAlert } from "../context/AlertProvider";
import type Gear from "../interfaces/Gear";
import ProductCard from "../components/ProductsPage/ProductCard";
import Divider from "../components/Divider";
import ProductModal from "../components/ProductsPage/ProductModal";
import LoginPromptModal from "../components/ProductsPage/LoginPromptModal";

export default function ProductsPage() {
  const { showAlert } = useShowAlert();
  const { user } = useAuth();

  const allGear = useLoaderData() as {
    gear: Gear[];
  };

  const [loginPromtModal, setLoginPromtModal] = useState(false);
  const [productModal, setProductModal] = useState({
    show: false,
    gear: null as Gear | null
  });

  const openProductModal = async (gear: Gear) => {
    // If not logged in promt login
    const isLoggedIn = await isUserLoggedIn();
    if (!isLoggedIn) {
      setLoginPromtModal(true);
      return;
    }
    setProductModal({ show: true, gear: gear });
  };

  const closeProductModal = () => {
    setProductModal({ show: false, gear: null });
  };

  const isUserLoggedIn = async () => {
    if (!user || user.role === "visitor") {
      return false;
    }
    return true;
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

    <section id="products-section" className="background-color-overlay pt-2 pb-4">
      {/* Search and Sort Header */}
      <Container className="pt-4 pb-2">
        <Row>
          <Col md={5} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label className="w-100">Sök utrustning
                <Form.Control
                  name="search"
                  type="text"
                  autoComplete="off"
                  maxLength={40}
                  className="border-light rounded-2 mt-2"
                  placeholder="Sök efter utrustning"
                  onChange={() => { }} />
              </Form.Label>
            </Form.Group>
          </Col>

          <Col md={4} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label className="w-100">Sortera efter
                <Form.Select
                  name="sort"
                  className="border-light modal-select-options mt-2"
                  onChange={() => { }} >
                  <option value="nameAsc">Namn A–Ö</option>
                  <option value="nameDsc">Namn Ö–A</option>
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
                  onChange={() => { }} >
                  <option value="nameAsc">Ja</option>
                  <option value="nameDsc">Nej</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>

        <div className="divider-products d-flex align-items-center mt-4 pt-3 pb-1">
          <p className="text-center mx-3 mb-0">Visar <span className="text-danger">{allGear.gear.length}</span> produkter</p>
        </div>
      </Container>

      {/* Products */}
      <Container>
        <Row className="mt-1 pb-5 g-4 ">

          {allGear.gear.map((item) => (
            <Col key={item.id} lg={6} md={12}>
              <ProductCard
                item={item}
                onBookClick={openProductModal}
              />
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
      onHide={closeProductModal} />

    <LoginPromptModal
      show={loginPromtModal}
      onHide={() => { setLoginPromtModal(false) }} />
  </>;
}
