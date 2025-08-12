import { useState } from 'react';
import Register from './Register';
import UserLogin from './UserLogin';

const TabPanel = ({ children, value, index }) => {
  return value === index ? <div>{children}</div> : null;
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  return (
    <div
      className="mt-3 min-h-screen bg-transparent flex  sm:flex-row justify-center items-start "
      title={value === 0 ? 'Login Page' : 'Register Page'} 
    >
      <div className="w-full max-w-6xl mr-3 rounded-lg p-3 sm:p-8">
        <div>
          {/* Tabs */}
          <div className="border-b border-gray-300 mb-6">
            <div className="flex justify-between text-sm sm:text-base">
              <button
                title="Login"
                className={`w-1/2 py-2 font-semibold cursor-pointer transition ${
                  value === 0
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => setValue(0)}
              >
                Login
              </button>
              <button
                title="Register"
                className={`w-1/2 py-2 font-semibold cursor-pointer transition ${
                  value === 1
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                onClick={() => setValue(1)}
              >
                Register
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <TabPanel value={value} index={0}>
            <UserLogin />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Register />
          </TabPanel>

        
        </div>
      </div>
    </div>
  );
};

export default LoginReg;
