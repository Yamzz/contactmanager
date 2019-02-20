import React from 'react';

export default function about() {
  return (
    //cannot use this in a functional component because it doesnt have a dynamic state
    <div>
      <h1 className="display-4">
        {/* this is how you access parameters */}
        {/* {props.match.params.id} About Contact Manager */}
        About Contact Manager
      </h1>
      <p className="lead"> Simple App to manage</p>

      <p className="text-secondary">Version 1.0.0</p>
    </div>
  );
}
