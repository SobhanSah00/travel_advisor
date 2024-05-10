// src/App.js
import React from 'react';
import Map from './components/loadMaps';

const App = () => {
  const apikey = 'BvElSU_6ORy-y4Hr0gdQArx_YH7AXPerjOzIsj0QgdQ';

  return (
    <div className="app bg-gray-100 min-h-screen flex items-center justify-center">
      <Map apikey={apikey} />
    </div>
  );
}

export default App;
