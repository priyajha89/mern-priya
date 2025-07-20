import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import API from "../utils/Api";

const ProductFilter = ({ onFilterChange, currentFilters }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || "");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await API.get("/products/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ ...currentFilters, search: searchTerm, page: 1 });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ ...currentFilters, category, page: 1 });
  };

  const clearFilters = () => {
    setSearchTerm("");
    onFilterChange({ category: "all", search: "", page: 1 });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Category Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="text-gray-500 w-4 h-4" />
          <Button
            onClick={() => handleCategoryChange("all")}
            variant={currentFilters.category === "all" ? "default" : "outline"}
            size="sm"
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category)}
              variant={currentFilters.category === category ? "default" : "outline"}
              size="sm"
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Clear Filters */}
        <Button onClick={clearFilters} variant="ghost" size="sm">
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
