import { ClipLoader } from "react-spinners";

const cssOverride = {
    display: 'block',
    margin: '0 auto 50px auto',
};

type SpinnerProps = {
    color?: string;
    size?: number;
};

const Spinner = ({
    color='purple',
    size=150
}: SpinnerProps) => {
  return ( 
    <div>
      <ClipLoader
        color={color}
        size={size}
        cssOverride={cssOverride}
        aria-label='Loading...'
      />
    </div>
  );
}
  
export default Spinner;
