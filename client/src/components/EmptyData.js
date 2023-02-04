import NoDataImage from '../assets/cart-is-empty.svg';

const EmptyData = () => {
  return (
    <div className="no-data">
      <img src={NoDataImage} alt="No Recipe To Try" />
      <p className="center blue-grey-text text-darken-1 flow-text">No Recipe Available</p>
    </div>
  );
}

export default EmptyData;
