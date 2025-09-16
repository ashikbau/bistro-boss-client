

const RecommendedMenu = ({ item }) => {
    const { name, recipe, image } = item;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="Shoes"
                    className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn  text-[#BB8506] border-1 border-x-0 border-t-0 border-b-4 border-yellow-600">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default RecommendedMenu;