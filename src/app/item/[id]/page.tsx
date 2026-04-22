"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DetailPage() {
  const params = useParams();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    // Fetch only ONE specific user based on the ID in the URL
    fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [params.id]);

  if (!item) return <div className="p-8 text-black">Loading...</div>;

  return (
    <main className="p-8 bg-gray-50 min-h-screen text-black">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to Marketplace
        </Link>
        
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-4xl font-bold mb-2">{item.name}</h1>
          <p className="text-xl text-gray-500 mb-6">@{item.username}</p>
          
          <div className="space-y-4 border-t pt-6">
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs">Company</h3>
              <p className="text-lg">{item.company.name}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs">Email</h3>
              <p className="text-lg">{item.email}</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-400 uppercase text-xs">Website</h3>
              <p className="text-lg text-blue-500">{item.website}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}