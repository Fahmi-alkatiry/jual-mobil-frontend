"use client";

import dynamic from "next/dynamic";

const CarEstimationForm = dynamic(
  () => import("./CarEstimationForm"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] rounded-2xl bg-muted animate-pulse rounded-2xl" />
    ),
  }
);

export default CarEstimationForm;
