const MONTH_NAMES_ABR = [
  "STY",
  "LUT",
  "MAR",
  "KWI",
  "MAJ",
  "CZE",
  "LIP",
  "SIE",
  "WRZ",
  "PAŹ",
  "LIS",
  "GRU",
];

const CalendarEventDetails = (props) => {
  const { event } = props;

  const date = new Date(event.date);

  let properties = {};
  if (event.properties) {
    properties = event.properties;
    //console.log(properties);
    Object.keys(properties).map((key, ix) => console.log(key));
  }

  const getProperty = (key) => {
    if (Object.prototype.toString.call(properties[key]) === "[object Array]") {
      return properties[key].map((property, i) => {
        return (
          <p className="text-gray-900 title-font font-medium" key={i}>
            {property}
          </p>
        );
      });
    }
    return (
      <p className="text-gray-900 title-font font-medium">{properties[key]}</p>
    );
  };

  return (
    <div className="py-8 px-4 lg:w-1/2 mx-auto">
      <div className="h-full flex items-start">
        <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
          <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200 text-xl">
            {MONTH_NAMES_ABR[date.getMonth()]}
          </span>
          <span className="font-medium text-2xl text-gray-800 title-font leading-none">
            {date.getDate()}
          </span>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="tracking-widest text-xl title-font font-medium text-blue-500 mb-1">
            {event.type}
          </h2>
          <h1 className="title-font text-3xl font-medium text-gray-900 mb-3">
            {event.title}
          </h1>
          {Object.keys(properties).map((key, index) => {
            console.log("pwio" + key);
            console.log(properties[key]);
            return (
              <div
                className="border-gray-200 border p-4 rounded-lg my-2"
                key={index}
              >
                <p className="text-gray-500">{key}</p>
                {getProperty(key)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarEventDetails;
