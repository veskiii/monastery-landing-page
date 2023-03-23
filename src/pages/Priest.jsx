import { apiUrl } from "../App";
import Testimonial from "../images/testimonial.jpg";
const Priest = (props) => {
  const { priestName, priestFunction, quote, pictureUrl } = props;

  return (
    <div className="p-4 lg:w-1/4 md:w-1/2">
      <div className="h-full flex flex-col items-center text-center">
        <img
          alt="team"
          className="flex-shrink-0 rounded-lg w-full h-80 object-cover object-center mb-4"
          src={apiUrl + "/pobierz/" + pictureUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = { Testimonial };
          }}
        />
        <div className="w-full">
          <h2 className="title-font font-medium text-lg text-gray-900">
            {priestName}
          </h2>
          <h3 className="text-gray-500 mb-3">{priestFunction}</h3>
          <p className="mb-4">{quote}</p>
        </div>
      </div>
    </div>
  );
};

export default Priest;
