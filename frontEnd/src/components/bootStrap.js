"use client";
import { useEffect, useState } from "react";
const BootStrap = () => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
};

export default BootStrap;
