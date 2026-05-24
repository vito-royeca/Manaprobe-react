import { BarLoader } from 'react-spinners';

const cssOverride = {
    display: 'block',
    margin: '0 auto 50px auto',
};

type SpinnerProps = {
    color?: string;
    width?: number;
};

const Spinner = ({
    color='blue',
    width=150
}: SpinnerProps) => {
  return ( 
    <div>
      <BarLoader 
        color={color}
        width={width}
        cssOverride={cssOverride}
        aria-label='Loading...'
      />
    </div>
  );
}
  
export default Spinner;
