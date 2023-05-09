import React from "react";

function Request({ body, request }) {
  return (
    <div className="p-5  font-semibold  first-letter:uppercase cursor-pointer duration-200 hover:bg-[#ffe5c1]  bg-darkWhite text-open  shadow-lg shadow-secondary rounded-xl m-2">
      {body.body}
      <p>{body.createAt}</p>
    </div>
  );
}
function notificationItem({ body, request }) {
  return (
    <div className="p-5  font-semibold  first-letter:uppercase cursor-pointer duration-200 hover:bg-[#ffe5c1]  bg-darkWhite text-open  shadow-lg shadow-secondary rounded-xl m-2">
      {body.body}
      <p>{body.createAt}</p>
    </div>
  );
}

export { Request, notificationItem };
