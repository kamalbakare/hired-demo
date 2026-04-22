"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
  const Map = dynamic(() => import('../components/Map'), { ssr: false });

// This is the "Block #1" the client wants to see: Searchable Lists
export default function ListingPage() {
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch data from the "backend" (API)
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // 2. Logic for Search
  const filteredItems = items.filter((item: any) => {
  const name = item?.name || ""; // Safety check in case an item is undefined
  return name.toLowerCase().includes(searchTerm.toLowerCase());
});

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Marketplace Listings</h1>

        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Location View</h2>
          <Map users={filteredItems} />
        </div>

        {/* SEARCH BAR */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search items..."
            className="w-full p-4 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-black"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* LISTING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item: any) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold text-blue-600">{item.name}</h2>
              <p className="text-gray-600">{item.company.name}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">📍 {item.address.city}</span>
                <Link href={`/item/${item.id}`}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}