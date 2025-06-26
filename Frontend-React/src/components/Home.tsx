import LogoCarousel from "./LogoCarousel";

const Home: React.FC = () => {
    return (
        <div style={{ fontFamily: 'Segoe UI, sans-serif' }}>
            {/* Hero Banner - Full Width */}
            <img
                src="../assets/banner2.jpg"
                alt="Shop the Latest Trends"
                style={{
                    width: '98vw',
                    height: 'auto',
                    display: 'block',
                    borderRadius: '0px',
                    objectFit: 'cover',
                }}
            />
            <div style={{ maxWidth: '900px', margin: '50px auto', padding: '0 20px', fontFamily: 'Segoe UI, sans-serif', color: '#333' }}>
                <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '20px' }}>
                    Welcome to <span style={{ color: '#007bff' }}>MyStore</span>
                </h1>

                <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 400, color: '#555' }}>
                    Your trusted destination for premium products at unbeatable prices.
                </h2>

                <p style={{ marginTop: '30px', fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'center', color: '#666' }}>
                    At <strong>MyStore</strong>, we offer a curated selection of top-quality electronics, fashion, beauty essentials, footwear, and more. Whether you're upgrading your tech, refreshing your wardrobe, or shopping daily needs, we've got something just for you.
                </p>

            </div>
            {/*****************************************************************************************/}
            {/* Carousel Section */}
            {/* <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
                style={{ marginTop: '40px' }}
            >
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-100"
                            style={{
                                height: '400px',
                                objectFit: 'cover'
                            }}
                            src=".././assets/1.jpg"
                            alt="Top Deals"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            style={{
                                height: '400px',
                                objectFit: 'cover'
                            }}
                            src=".././assets/2.jpg"
                            alt="Fashion Essentials"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            style={{
                                height: '400px',
                                objectFit: 'cover'
                            }}
                            src=".././assets/3.jpg"
                            alt="Electronics & More"
                        />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div> */}


            <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
                data-interval="2000"
                data-pause="false"
                style={{ marginTop: '40px' }}
            >
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            className="d-block w-100"
                            style={{ height: '400px', objectFit: 'cover' }}
                            src=".././assets/1.jpg"
                            alt="Top Deals"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            style={{ height: '400px', objectFit: 'cover' }}
                            src=".././assets/2.jpg"
                            alt="Fashion Essentials"
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            className="d-block w-100"
                            style={{ height: '400px', objectFit: 'cover' }}
                            src=".././assets/3.jpg"
                            alt="Electronics & More"
                        />
                    </div>
                </div>

                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            {/*****************************************************************************************/}

            {/* Featured Content */}
            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', color: '#222' }}>Why Shop With Us?</h2>
                <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '800px', margin: '10px auto' }}>
                    At MyStore, we bring you the finest range of fashion, electronics, home essentials,
                    and more — all in one place. Fast delivery, quality assurance, and 24/7 support make us
                    your go-to destination for online shopping.
                </p>
                <ul style={{ marginTop: '10px', listStyle: 'none', padding: 0, fontSize: '1.1rem', lineHeight: '2', color: '#444', textAlign: 'center' }}>
                    <li>Handpicked quality from trusted brands</li>
                    <li>Fast & reliable doorstep delivery</li>
                    <li>Competitive prices with regular discounts</li>
                    <li>100% secure payments & easy returns</li>
                    <li>Customer-first service, always</li>
                </ul>
            </div>

            {/* Categories Preview (Placeholder Text) */}
            <div style={{
                marginTop: '50px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px'
            }}>
                <div style={{
                    width: '250px',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#333' }}>Men's Fashion</h3>
                    <p style={{ fontSize: '0.95rem', color: '#666' }}>Shirts, T-shirts, Jeans & more</p>
                </div>
                <div style={{
                    width: '250px',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#333' }}>Electronics</h3>
                    <p style={{ fontSize: '0.95rem', color: '#666' }}>Smartphones, Laptops & Gadgets</p>
                </div>
                <div style={{
                    width: '250px',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#333' }}>Home Essentials</h3>
                    <p style={{ fontSize: '0.95rem', color: '#666' }}>Kitchen, Decor & Furniture</p>
                </div>
            </div>

            {/*``````````````````````````````````````````````````````````````` */}
            <LogoCarousel />
            {/*``````````````````````````````````````````````````````````````` */}

            {/* Call to Action */}
            <div style={{
                marginTop: '60px',
                textAlign: 'center',
                padding: '30px',
                backgroundColor: '#f7f7f7',
                borderRadius: '8px'
            }}>
                <h2 style={{ color: '#222' }}>Ready to Shop?</h2>
                <p style={{ fontSize: '1rem', color: '#444' }}>
                    Explore our collection and find the best products tailored just for you.
                </p>
                <a href="/products">
                    <button style={{
                        marginTop: '10px',
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        cursor: 'pointer'
                    }}>
                        Start Shopping
                    </button>
                </a>
            </div>

            {/* Ending Banner */}
            <img
                src="../assets/banner3.jpg"
                alt="Deals & Discounts"
                style={{
                    // marginTop: '50px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                }}
            />
        </div>
    );
};

export default Home;
