"use client";

import dynamic from "next/dynamic";

const CarEstimationForm = dynamic(
  () => import("./CarEstimationForm"),
  {
    ssr: false,
    loading: () => (
      <div className="h-105 rounded-2xl bg-muted animate-pulse" />
    ),
  }
);

export default CarEstimationForm;
