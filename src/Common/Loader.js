import { ScaleLoader } from "react-spinners";

const Loader = ({ additionalClassName }) => {
  const classNames = [""];

  if (additionalClassName) {
    classNames.push(additionalClassName);
  }
  return (
    <div className="position-fixed inset-0 d-flex align-items-center justify-content-center z-2" style={{backgroundColor: "rgba(0, 0, 0, 0.75)"}}>
      <div className={`classLoader`} style={{position:"fixed", left:"54%", top:"50%"}}>
        <ScaleLoader
          color="#1C9BE2"
          height={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default Loader;