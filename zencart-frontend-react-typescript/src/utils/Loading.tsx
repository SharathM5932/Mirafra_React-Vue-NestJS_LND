import PropagateLoader from "react-spinners/PropagateLoader";

// Custom Loading indicators
const Loading: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PropagateLoader size={20} />
    </div>
  );
};

export default Loading;
