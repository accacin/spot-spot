import { useRouter } from 'next/router';

interface Props {
    coords: { lat: string, lng: string }
}

const AddLocation = ({ coords }: Props) => {
    const router = useRouter();
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataObject = Object.fromEntries(formData);
        const { id } = router.query;

        const res = await fetch(`/api/lists/${id}/location/create`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(dataObject),
        });

        if (res.status < 300) {
            refreshData();
            event.target.reset();
        }
    };

    const refreshData = () => {
        router.replace(router.asPath);
    };

    return (
        <div className="p-4 border rounded-lg border-gray-200 shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Name
                    </label>
                    <input
                        type="name"
                        id="name"
                        name="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="My Favourite Restaurants"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="desc"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                        Description
                    </label>
                    <textarea
                        id="desc"
                        name="desc"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Leave a comment..."
                    ></textarea>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="coords"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Coordinates
                    </label>
                    <input
                        value={`${coords.lat}, ${coords.lng}`}
                        type="coords"
                        id="coords"
                        name="coords"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="x, y"
                        required
                        readOnly
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddLocation;
