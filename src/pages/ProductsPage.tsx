import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { isUserLoggedIn, scrollToElement } from "../utils/Utilities";
import { useAuth } from "../context/AuthProvider";
import { useShowAlert } from "../context/AlertProvider";
import type Gear from "../interfaces/Gear";
import type User from "../interfaces/User";
import ProductCard from "../components/ProductsPage/ProductCard";
import Divider from "../components/Divider";
import ProductModal from "../components/ProductsPage/ProductModal";
import LoginPromptModal from "../components/ProductsPage/LoginPromptModal";

export default function ProductsPage() {
  const { user } = useAuth();
  const { showAlert } = useShowAlert();
  const [curSort, setCurSort] = useState("nameAsc");
  const [curFilter, setCurFilter] = useState("show");
  const [curSearch, setCurSearch] = useState("");

  const allGear = useLoaderData() as {
    gear: Gear[];
  };

  // Sort by nameAsc as default
  const [gearData, setGearData] = useState(() => {
    let sortedGear = [...allGear.gear];

    sortedGear.sort((a, b) => {
      const nameA = (a.name || "").toString();
      const nameB = (b.name || "").toString();
      return nameA.localeCompare(nameB);
    });
    return sortedGear;
  });

  const [loginPromtModal, setLoginPromtModal] = useState(false);
  const [productModal, setProductModal] = useState({
    show: false,
    gear: null as Gear | null
  });

  const openProductModal = async (gear: Gear) => {
    // If not logged in promt login modal
    const isLoggedIn = await isUserLoggedIn(user as User | null);
    if (!isLoggedIn) {
      setLoginPromtModal(true);
      return;
    }
    setProductModal({ show: true, gear: gear });
  };

  const closeProductModal = () => {
    setProductModal({ show: false, gear: null });
  };





  const applyFiltersAndSort = (filter: string, search: string, sort: string) => {
    let filteredGear = [...allGear.gear];

    console.log("KÖÖÖÖRR");

    // Filter
    /* if (filter === "hide") {
      filteredGear = filteredGear.filter((item) => item.available);
    } */

    // Search
    if (search !== "") {
      const searchLower = search.toLowerCase();


      //console.log("First few items:", filteredGear.slice(0, 3));
      //console.log("Items with null names:", filteredGear.filter(item => !item.name || item.name === null));


      /* s */
    }

    // Sort
    /* switch (sort) {
      case "nameAsc":
        filteredGear.sort((a, b) => {
          const nameA = (a.name || "").toString();
          const nameB = (b.name || "").toString();
          return nameA.localeCompare(nameB);
        });
        break;
      case "nameDsc":
        filteredGear.sort((a, b) => {
          const nameA = (a.name || "").toString();
          const nameB = (b.name || "").toString();
          return nameB.localeCompare(nameA);
        });
        break;
      case "priceAsc":
        filteredGear.sort((a, b) => a.dailyPrice - b.dailyPrice);
        break;
      case "priceDsc":
        filteredGear.sort((a, b) => b.dailyPrice - a.dailyPrice);
        break;
      default:
        break;
    } */

    setGearData(filteredGear);
  };

  const filterGear = (filter: string) => {
    applyFiltersAndSort(filter, curSearch, curSort);
    setCurFilter(filter);
  };

  const searchGear = (search: string) => {
    const searchTrimmed = search.trim();

    setCurSearch(searchTrimmed);

    applyFiltersAndSort(curFilter, searchTrimmed, curSort);
  };

  const sortGear = (sortOption: string) => {
    applyFiltersAndSort(curFilter, curSearch, sortOption);
    setCurSort(sortOption);
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
                  onChange={(e) => { searchGear(e.target.value) }


                    /* onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const searchValue = e.currentTarget.value.trim();
                      setCurSearch(searchValue);
                      searchGear(searchValue);
                    }
                  }}  */

                  } />
              </Form.Label>
            </Form.Group>
          </Col>

          <Col md={3} className="pb-3 pb-md-0">
            <Form.Group>
              <Form.Label className="w-100">Sortera efter
                <Form.Select
                  name="sort"
                  value={curSort}
                  className="border-light modal-select-options mt-2"
                  onChange={(e) => { sortGear(e.target.value) }} >
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
                  value={curFilter}
                  onChange={(e) => { filterGear(e.target.value) }} >
                  <option value="show">Ja</option>
                  <option value="hide">Nej</option>
                </Form.Select>
              </Form.Label>
            </Form.Group>
          </Col>
        </Row>

        <div className="divider-products d-flex align-items-center mt-4 pt-3 pb-1">
          <p className="text-center mx-3 mb-0">Visar <span className="text-danger">{gearData.length}</span> produkter</p>
        </div>
      </Container>

      {/* Products grid */}
      <Container>
        <Row className="mt-1 pb-5 g-4 ">
          {gearData.map((item, index) => (
            <Col key={index} lg={4} md={6} sm={12}>
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
