import React, { useState, useEffect } from "react";
import { baseUrl } from "../api";
import { FaAngleLeft, FaAngleRight, FaUndo } from "react-icons/fa";
import CreateModal from "../Modal/modal";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadComponent, setReloadComponent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getProducts = async (page: number) => {
    try {
      const response = await baseUrl.get(`product/list?page=${page}&limit=5`);
      setProducts(response.data.data);

      if (response.data.data) {
        const totalItems = response.data.data.length;
        setTotalPages(Math.ceil(totalItems / 5));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleReloadClick = () => {
    setReloadComponent((prevState) => !prevState);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <h1 className="h3">Assessment</h1>
      <div className="d-flex justify-content-end">
        <button className="btn custom-button-one" onClick={openModal}>
          Create
        </button>
      </div>
      <div className="shadow rounded mt-3 bg-white">
        <div className="d-flex justify-content-between px-4 mt-4 border">
          <div
            className="d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={handleReloadClick}
          >
            <FaUndo /> <p className="refresh-text">Refresh</p>
          </div>
          <div className="pagination-container d-flex align-items-center">
            <span>{`0${currentPage} of 0${totalPages}`}</span>
            <button
              className="btn btn-link text-dark"
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
            >
              <FaAngleLeft />
            </button>
            <button
              className="btn btn-link text-dark"
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <table className="table border-top">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" style={{ marginRight: "7px" }} />
                Name
              </th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <input type="checkbox" style={{ marginRight: "7px" }} />
                  {product.name}
                </td>
                <td>{product.description}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <CreateModal closeModal={closeModal} />}
    </div>
  );
};

export default Products;
