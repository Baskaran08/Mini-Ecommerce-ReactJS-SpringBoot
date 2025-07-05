import React, { useEffect, useState } from 'react';
import { useSearchParams,Link } from 'react-router-dom';
import Card from '../../Components/Card';
import axiosInstance from '../../Utils/axiosInstance';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("keyword");

  useEffect(() => {
    const fetchSearchResults = async () => {
        try {
            const response = await axiosInstance.get(`/products/search?keyword=${query}`);
            if(response.data && response.data){
                setResults(response.data );
                console.log(response.data);
            }
        } catch (error) {
                console.error("Search failed", error);
        } finally {
                setLoading(false);
        }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <p className="text-center py-20">Loading results...</p>;

  return (
    <div className="max-w-[1536px] mx-auto px-6 py-12 min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-10 text-center">
            Search Results for "<span className="text-red-500">{query}</span>"
        </h1>

        {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {results.map((product) => (
                <Card key={product.id} product={product} />
            ))}
            </div>
        ) : 
        (
            <div className="flex flex-col items-center justify-center mt-12 text-center space-y-6">
            <img
                src="/assets/noProduct.jpg"
                alt="No products found"
                className="w-64 h-64 object-contain opacity-80"
            />
            <p className="text-lg text-gray-600">
                No products found for "<span className="font-semibold text-red-500">{query}</span>"
            </p>
            <Link
                to="/home"
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all duration-300"
            >
                Go back to Home
            </Link>
        </div>
        )}
    </div>
  );
};

export default SearchResults;
