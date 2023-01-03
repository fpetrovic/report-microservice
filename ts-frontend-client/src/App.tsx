import React from 'react';
import './App.css';
import PageLayout from "./components/commonLayout/PageLayout";
import { RouterProvider } from 'react-router-dom';
import router from "./config/router";

function App() {
  return (
    <div className={'App'}>
      <PageLayout router={<RouterProvider router={router} />} />
    </div>
  );
}

export default App;
