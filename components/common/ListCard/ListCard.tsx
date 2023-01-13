interface Props {
  title: string;
  description: string;
  url?: string;
}

const ListCard = ({ title, description }: Props) => (
  <div className="flex flex-col justify-between p-6 bg-white rounded-lg border border-gray-200 shadow-md h-64">
    <div className="">
      <h5 className="text-gray-900 text-xl mb-2">{title}</h5>
      <p className="text-gray-700 text-base mb-4">{description}</p>
    </div>
    <div>
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        View
      </button>
    </div>
  </div>
);

export default ListCard;
