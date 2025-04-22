import React from 'react';

import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white">
      <div >
              
        <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-200 text-sm">
          <p>&copy; {new Date().getFullYear()} EarJourney. All rights reserved.</p>
        </div>
     
      </div>
    </footer>
  );
};

export default Footer;