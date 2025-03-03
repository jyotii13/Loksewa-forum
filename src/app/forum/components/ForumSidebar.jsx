'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronUp } from 'lucide-react';


const ForumSidebar = () => {
    const [expanded, setExpanded] = useState({});

    // const services = [
    //     {
    //         title: 'Public Service Commission',
    //         subItems: ['Kharidar Computer Officer', 'Officer'],
    //     },
    //     {
    //         title: 'Public Service Commission',
    //         subItems: ['Kharidar Computer Officer', 'Officer'],
    //     },
    //     {
    //         title: 'Public Service Commission',
    //         subItems: ['Kharidar Computer Officer', 'Officer'],
    //     },
    //     {
    //         title: 'Public Service Commission',
    //         subItems: ['Kharidar Computer Officer', 'Officer'],
    //     },
    //     {
    //         title: 'Public Service Commission',
    //         subItems: ['Kharidar Computer Officer', 'Officer'],
    //     },
    //     {
    //         title: 'Public Service Commission',
    //         subItems: ['Kharidar Computer Officer', 'Officer'],
    //     }
    // ];

    const { data,isLoading, isError, error, } = useQuery({
        queryKey: ['sewaservices'],
        queryFn: async () => {
            const res = await fetch('https://api.loksewatayariapp.com/sewaservice?sort=position%3Aasc');
            if (!res.ok) {
                throw new Error('Failed to fetch services');
            }
            return res.json();
        },
    });


    if (isLoading) {
        return <p>Loading services...</p>;
      }
    
      if (isError) {
        return <p>Error: {error.message}</p>;
      }


    const serviceData = data.data || [];

    const services = serviceData.map((serviceItem) => {
        const title = serviceItem.title ?? 'No Name';

        const subItems = serviceItem.subServices
            ? serviceItem.subServices.map((sub) => sub.title ?? 'No Sub-Title')
            : [];

        return {
            id: serviceItem.id,
            title,
            subItems,
        }
    })

    const toggleExpand = (index) => {
        setExpanded((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="sticky top-7">
            <h2 className="text-lg font-bold mb-4">Services</h2>
            <ul className="space-y-2">
                {services.map((service, index) => {
                    const isExpanded = expanded[index];

                    return (
                        <li key={service.id} className="border-b-gray-600 last:border-none ml-1 pb-2">
                            <button
                                type="button"
                                onClick={() => toggleExpand(index)}
                                className="flex items-center justify-between w-full text-left"
                            >
                                <span>{service.title}</span>
                                <span className="text-sm text-black ">
                                    {isExpanded ? <ChevronUp className="w-5 h-5 opacity-30" /> : <ChevronDown className="w-5 h-5 opacity-30" />}
                                </span>
                            </button>
                            {isExpanded && service.subItems && service.subItems.length > 0 && (
                                <ul className="mt-2 ml-4 space-y-2">
                                    {service.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex} className="text-black cursor-pointer">
                                            {subItem}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>

        </div>
    )
}

export default ForumSidebar