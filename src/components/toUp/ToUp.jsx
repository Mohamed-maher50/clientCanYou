import React, { useState } from "react";

function ToUp() {
  const [show, setShow] = useState(false);

  return (
    <div className="p-3 rounded-lg cursor-pointer absolute z-50 bg-open bottom-11 right-20">
      Up
    </div>
  );
}

export default ToUp;
