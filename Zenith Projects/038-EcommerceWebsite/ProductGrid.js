// ProductGrid.js
import React, { useState, useEffect } from 'react';

const ProductGrid = ({ products }) => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState({});
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sort, setSort] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [order, setOrder] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      const loadedProducts = await loadProductsAsync();
      setLoadedProducts(loadedProducts);
      setIsLoading(false);
    loadProducts();
  }, []);

  const loadProductsAsync = async () => {
    // Simulate loading products from an API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return products;
  };

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.body.offsetHeight;

    if (scrollPosition >= documentHeight * 0.8 && !isLoading) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const { category, brand, price } = filter;
      return (
        (!category || product.category === category) &&
        (!brand || product.brand === brand) &&
        (!price || product.price <= price)
      );
    });
    setFilteredProducts(filteredProducts);
  }, [filter, products]);

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    setSort((prevSort) => ({ ...prevSort, [name]: value }));
  };

  useEffect(() => {
    const sortedProducts = products.sort((a, b) => {
      const { price, popularity, rating } = sort;
      if (price) {
        return a.price - b.price;
      } else if (popularity) {
        return b.popularity - a.popularity;
      } else if (rating) {
        return b.rating - a.rating;
      }
      return 0;
    });
    setSortedProducts(sortedProducts);
  }, [sort, products]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelectedProducts) => [
      ...prevSelectedProducts,
      product,
    ]);
  };

  const handleCompareProducts = () => {
    // Implement comparison logic here
  };

  return (
    <div>
      <h1>Product Grid</h1>
      <form>
        <label>
          Category:
          <select name="category" value={filter.category} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </select>
        </label>
        <label>
          Brand:
          <select name="brand" value={filter.brand} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
          </select>
        </label>
        <label>
          Price:
          <input type="number" name="price" value={filter.price} onChange={handleFilterChange} />
        </label>
      </form>
      <form>
        <label>
          Sort by:
          <select name="sort" value={sort.sort} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </form>
      <form>
        <label>
          Search:
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete="off"
          />
        </label>
      </form>
      <div>
        {searchResults.length > 0 ? (
          <div>
            {searchResults.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <button onClick={() => handleSelectProduct(product)}>
                  Select for Comparison
                </button>
              </div>
            ))}
            {selectedProducts.length > 1 && (
              <button onClick={handleCompareProducts}>
                Compare Products
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        <h2>Order Tracking</h2>
        <p>Order ID: {order.id}</p>
        <p>Status: {order.status}</p>
        <p>Shipping Carrier: {order.shippingCarrier}</p>
        <p>Tracking Number: {order.trackingNumber}</p>
      </div>
      <div>
        <h2>Customer Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>
            <p>{review.text}</p>
            <p>
              Rated {review.rating} out of 5 stars
            </p>
          </div>
        ))}
      </div>
    </div>
};

<div role="grid">
{products.map((product) => (
  <div key={product.id} role="gridcell">
    <img src={product.image} alt={product.name} />
    <h2>{product.name}</h2>
          <p>{product.price}</p>
          <button aria-label={`Add ${product.name} to cart`}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;