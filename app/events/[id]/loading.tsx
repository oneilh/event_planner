import { ArrowLeft, Calendar, MapPin, Users, Info } from "lucide-react";
import Link from "next/link";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto animate-pulse">
      
      {/* Back Navigation Skeleton */}
      <div className="inline-flex items-center gap-2 mb-8">
        <ArrowLeft className="w-4 h-4 text-[var(--border)]" /> 
        <div className="h-4 bg-[var(--border)] rounded w-32"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Content Column Skeleton */}
        <div className="flex-1 space-y-8">
          
          {/* Header Info Skeleton */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="w-full">
              <div className="h-4 bg-[var(--border)] rounded w-24 mb-3"></div>
              <div className="h-10 sm:h-12 bg-[var(--border)] rounded w-3/4 mb-2"></div>
              <div className="h-10 sm:h-12 bg-[var(--border)] rounded w-1/2"></div>
            </div>
            <div className="pt-2 flex-shrink-0 flex items-center gap-3">
              <div className="w-24 h-10 bg-[var(--border)] rounded-sm"></div>
              <div className="w-10 h-10 bg-[var(--border)] rounded-sm"></div>
            </div>
          </div>

          {/* Featured Image Skeleton */}
          <div className="w-full h-[400px] rounded-sm overflow-hidden relative border border-[var(--border)] bg-[var(--bg-card)]"></div>

          {/* Description Skeleton */}
          <div className="bg-[var(--bg-card)] p-8 rounded-sm border-[1.5px] border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-[var(--border)]" />
              <div className="h-8 bg-[var(--border)] rounded w-48"></div>
            </div>
            <div className="space-y-3 mt-4">
              <div className="h-4 bg-[var(--border)] rounded w-full"></div>
              <div className="h-4 bg-[var(--border)] rounded w-full"></div>
              <div className="h-4 bg-[var(--border)] rounded w-11/12"></div>
              <div className="h-4 bg-[var(--border)] rounded w-4/5"></div>
              <div className="h-4 bg-[var(--border)] rounded w-full"></div>
              <div className="h-4 bg-[var(--border)] rounded w-3/4"></div>
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar Skeleton */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="sticky top-24 flex flex-col gap-6">
            
            {/* Event Details Card Skeleton */}
            <div className="bg-[var(--bg-card)] border-[1.5px] border-[var(--border)] rounded-sm p-6 sm:p-8">
              
              <div className="space-y-6">
                {/* Date/Time Skeleton */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--primary)] border border-[var(--border)] p-3 rounded-sm flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[var(--border)]" />
                  </div>
                  <div className="w-full">
                    <div className="h-4 bg-[var(--border)] rounded w-24 mb-2"></div>
                    <div className="h-5 bg-[var(--border)] rounded w-48"></div>
                  </div>
                </div>
                
                {/* Location Skeleton */}
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--primary)] border border-[var(--border)] p-3 rounded-sm flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[var(--border)]" />
                  </div>
                  <div className="w-full">
                    <div className="h-4 bg-[var(--border)] rounded w-20 mb-2"></div>
                    <div className="h-5 bg-[var(--border)] rounded w-56 mb-1"></div>
                    <div className="h-4 bg-[var(--border)] rounded w-32"></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Registration Action Card Skeleton */}
            <div className="bg-[var(--bg-card)] border-[1.5px] border-[var(--border)] rounded-sm p-6 sm:p-8 text-center flex flex-col items-center">
              
              <div className="flex justify-center mb-4">
                <div className="bg-[var(--primary)] border border-[var(--border)] p-4 rounded-full">
                  <Users className="w-8 h-8 text-[var(--border)]" />
                </div>
              </div>
              
              <div className="h-8 bg-[var(--border)] rounded w-48 mb-4"></div>
              
              <div className="flex items-center justify-center gap-2 mb-6 w-full">
                <div className="h-10 bg-[var(--border)] rounded w-12"></div>
                <div className="h-5 bg-[var(--border)] rounded w-24"></div>
              </div>

              <div className="w-full h-12 bg-[var(--border)] rounded-sm mb-4"></div>
              
              <div className="h-3 bg-[var(--border)] rounded w-48"></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
