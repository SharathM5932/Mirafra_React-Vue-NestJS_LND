import "../../style/AddressSelect.css";

interface Address {
  _id: string;
  fullName: string;
  addressLineOne: string;
  addressLineTwo: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phoneNumber: string;
}

interface AddressSelectProps {
  address: Address;
  isSelected: boolean;
  onSelect: () => void;
}

const AddressSelect: React.FC<AddressSelectProps> = ({
  address,
  isSelected,
  onSelect,
}) => {
  const {
    fullName,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    pincode,
    country,
    phoneNumber,
  } = address;

  return (
    <section
      className={`address_select_box ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      <h1>{fullName}</h1>
      <p>{addressLineOne}</p>
      <p>{addressLineTwo}</p>
      <p>
        <span>{city}</span>, <span>{state}</span> - <span>{pincode}</span>
      </p>
      <p>{country}</p>
      <p>Phone Number: {phoneNumber}</p>
    </section>
  );
};

export default AddressSelect;
