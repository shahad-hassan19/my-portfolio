"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset,0px_24px_18px_-12px_rgba(0,0,0,0.10)]",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function TextLinesSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn("h-4 w-full", i === lines - 1 && "w-3/5")} />
      ))}
    </div>
  );
}

export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full mx-auto max-w-6xl px-4 md:px-6 lg:px-8", className)}>
      <div className="w-full flex items-center justify-center mb-10">
        <Skeleton className="h-7 w-56 rounded-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-xl p-6 bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset,0px_24px_18px_-12px_rgba(0,0,0,0.10)]">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="rounded-xl p-6 bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset,0px_24px_18px_-12px_rgba(0,0,0,0.10)]">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="rounded-xl p-6 bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset,0px_24px_18px_-12px_rgba(0,0,0,0.10)]">
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-40" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TwoColumnMediaSkeleton() {
  return (
    <div className="max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="rounded-3xl overflow-hidden bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset,0px_24px_18px_-12px_rgba(0,0,0,0.10)]">
          <Skeleton className="h-80 w-full rounded-3xl" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40" />
          <TextLinesSkeleton lines={5} />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsSectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("w-full mx-auto max-w-6xl px-4 md:px-6 lg:px-8", className)}>
      <div className="w-full flex items-center justify-center mb-10">
        <Skeleton className="h-8 w-64 rounded-full" />
      </div>

      <div className="w-full flex items-center justify-center mb-12">
        <div className="relative flex items-center justify-center">
          <Skeleton className="h-64 w-64 rounded-full" />
          <div className="absolute inset-0 animate-pulse">
            <div className="h-full w-full rounded-full border border-neutral-800" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl p-6 bg-[#23272f] shadow-[0px_0px_8px_0px_rgba(248,248,248,0.15)_inset,0px_24px_18px_-12px_rgba(0,0,0,0.10)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((__, j) => (
                <Skeleton key={j} className="h-7 w-24 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


