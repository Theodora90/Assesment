import { useState, FormEvent } from "react";
import { baseUrl } from "../api";
import axios from "axios";
import "./modal.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CreateModalProps {
  closeModal: () => void;
}

function thousandsSeparators(num: number): string {
  const numParts = num.toString().split(".");
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numParts.join(".");
}

const CreateModal: React.FC<CreateModalProps> = ({ closeModal }) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePriceChange = (e: FormEvent<HTMLInputElement>) => {
    const rawValue = e.currentTarget.value;
    const newValue = rawValue.replace(/\D/g, "");
    setPrice(newValue);
  };

  const handleCreateProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const product = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    };

    try {
      const response = await baseUrl.post(`product/create`, product);
      if (response) {
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setIsLoading(false);
        toast(response.data.message);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast(`Error: ${error.message || "An error occurred"}`);
    }
  };

  const formatPriceForDisplay = (price: string): string => {
    const numericValue = parseFloat(price);
    if (!isNaN(numericValue)) {
      return thousandsSeparators(numericValue);
    } else {
      return price;
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal shadow rounded">
        <button className="custom-close-button" onClick={closeModal}>
          &times;
        </button>
        <form onSubmit={handleCreateProduct}>
          <div className="container">
            <h2 className="h5 fw-bold mb-3">Create Assessment</h2>
            <div className="row">
              <div className="mb-3 col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control outlined-input"
                  placeholder="David Pakurumo"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3 col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Description
                </label>
                <input
                  type="text"
                  className="form-control outlined-input"
                  placeholder="Description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3 col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control outlined-input"
                  placeholder="Quantity"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3 col-lg-6">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Price
                </label>
                <input
                  type="text"
                  className="form-control outlined-input"
                  placeholder="Price"
                  required
                  value={formatPriceForDisplay(price)}
                  onChange={handlePriceChange}
                />
              </div>
            </div>
            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <button className="btn custom-button-one">Submit</button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateModal;
