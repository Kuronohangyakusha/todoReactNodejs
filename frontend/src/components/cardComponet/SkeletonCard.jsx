import React from "react";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Image skeleton */}
        <div className="w-full h-48 bg-gray-200 rounded-xl mb-4 skeleton"></div>

        {/* Title and status skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-3/4 skeleton"></div>
          <div className="h-6 bg-gray-200 rounded-full w-20 skeleton"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full skeleton"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 skeleton"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 skeleton"></div>
        </div>

        {/* Bottom section skeleton */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full skeleton"></div>
            <div className="h-4 bg-gray-200 rounded w-16 skeleton"></div>
          </div>
          <div className="flex space-x-1">
            <div className="w-8 h-8 bg-gray-200 rounded-xl skeleton"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-xl skeleton"></div>
            <div className="w-8 h-8 bg-gray-200 rounded-xl skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}