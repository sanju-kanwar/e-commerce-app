import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
 const detailsRef = useRef<HTMLDetailsElement | null>(null); 
  // Read filters from URL
  const selectedCategories = searchParams.getAll("category");
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let url = "https://fakestoreapi.com/products";

      if (selectedCategories.length === 1) {
        url = `https://fakestoreapi.com/products/category/${selectedCategories[0]}`;
      }

      const res = await axios.get(url);
      let data = res.data;

      // If multiple categories, filter manually (API doesn't support multiple)
      if (selectedCategories.length > 1) {
        const allData = await Promise.all(
          selectedCategories.map(cat =>
            axios.get(`https://fakestoreapi.com/products/category/${cat}`)
          )
        );
        data = allData.flatMap(r => r.data);
      }

      // Sorting
      if (sort === "asc") data.sort((a:any, b:any) => a.price - b.price);
      else if (sort === "desc") data.sort((a:any, b:any) => b.price - a.price);

      setProducts(data);
    };

    fetchData();
  }, [selectedCategories.join(","), sort]);

  const toggleCategory = (category: string) => {
    const current = new Set(selectedCategories);
    if (current.has(category)) current.delete(category);
    else current.add(category);

    searchParams.delete("category");
    current.forEach(cat => searchParams.append("category", cat));
    setSearchParams(searchParams);

    // 👇 Close the dropdown after selection
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  return (
 <div style={{ padding: "2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🛍️ All Products</h2>

      {/* Dropdown Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "2rem"
        }}
      >
        {/* Category Filter */}
        <div style={{ position: "relative" }}>
        <details ref={detailsRef} style={{ position: "relative" }}>
  <summary style={{
    cursor: "pointer",
    padding: "0.5rem 1rem",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    fontWeight: "bold"
  }}>
    Filter by Category ⏷
  </summary>

  <div style={{
    position: "absolute",
    top: "2.5rem",
    zIndex: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
  }}>
    {categories.map(cat => (
      <label key={cat} style={{ display: "block", marginBottom: "0.5rem" }}>
        <input
          type="checkbox"
          checked={selectedCategories.includes(cat)}
          onChange={() => toggleCategory(cat)} // ✅ this closes dropdown
          style={{ marginRight: "8px" }}
        />
        {cat}
      </label>
    ))}
  </div>
</details>
        </div>

        {/* Sort Dropdown */}
        <div>
          <select
            value={sort}
            onChange={handleSortChange}
            style={{
              padding: "0.5rem 1rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#f0f0f0"
            }}
          >
            <option value="">Sort By</option>
            <option value="asc">Price - Low to High</option>
            <option value="desc">Price - High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "flex-start"
        }}
      >
        {products.length > 0 ? (
          products.map(p => <ProductCard key={p.id} product={p} />)
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};



export default Home;

