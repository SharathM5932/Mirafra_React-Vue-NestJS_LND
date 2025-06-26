import "../../style/selectedProduct.css";

interface BuyProductData {
  title: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
}

interface SelectedProductProps {
  buyProductData: BuyProductData;
  setSelectedQuantity: (quantity: number) => void;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
}

const SelectedProduct: React.FC<SelectedProductProps> = ({
  buyProductData,
  setSelectedQuantity,
  totalPrice,
  setTotalPrice,
}) => {
  const { title, price, description, images, stock } = buyProductData;

  return (
    <section className="seleted_product_container">
      <div className="selected_product_img">
        <div>
          <img src={images[0]} alt={title} />
        </div>
      </div>

      <div className="details">
        <h1>{title}</h1>
        <p>{description}</p>
        {stock === 0 ? (
          <p className="error_msg">Out of stock</p>
        ) : (
          <div className="buy_attr">
            <p>Price: ${totalPrice}</p>
            <div className="quantity">
              <label htmlFor="quantity">Quantity: </label>
              <select
                name="quantity"
                id="quantity"
                onChange={(e) => {
                  const qty = Number(e.target.value);
                  setSelectedQuantity(qty);
                  setTotalPrice(qty * price);
                }}
              >
                {Array.from({ length: stock }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedProduct;
