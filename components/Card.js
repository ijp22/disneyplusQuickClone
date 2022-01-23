const Card = ({ thumbnail }) => {
  return <img className="card" src={thumbnail.url} alt="thumbnail-url" />;
};

export default Card;
