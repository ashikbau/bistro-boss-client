
import { Parallax } from 'react-parallax';
const Cover = ({ img, title }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div
                className="hero h-[700px]">
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5">
                            Welcome to Bristo Boss — where every dish is crafted with passion and every meal is a celebration. Enjoy fresh, seasonal flavors in a cozy, welcoming atmosphere.
                        </p>

                    </div>
                </div>
            </div>
        </Parallax>



    );
};

export default Cover;