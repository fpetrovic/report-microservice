import React from 'react';
import logo from './logo.svg';
import './App.css';
import PageLayout from "./components/commonLayouts/PageLayout";
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
