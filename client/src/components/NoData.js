import NoDataImage from '../assets/no-data.svg';

const NoData = () => {
  return (
    <div className="no-data pos-absolute top-left-center">
      <img src={NoDataImage} alt="No Recipe To Try" />
      <p className="center blue-grey-text text-darken-1 flow-text">No Recipe Available</p>
    </div>
  );
}

export default NoData;
