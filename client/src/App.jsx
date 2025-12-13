function App() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-primary mb-4'>AURA HOME</h1>
          <p className='text-xl text-text-secondary mb-8'>
            E-commerce Platform - Frontend Setup Complete
          </p>

          <div className='flex gap-4 justify-center'>
            <button className='btn-primary'>Primary Button</button>
            <button className='btn-warning'>Warning Button</button>
            <button className='btn-secondary'>Secondary Button</button>
          </div>

          <div className='mt-12 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto'>
            <h2 className='text-2xl font-semibold mb-4'>Tech Stack</h2>
            <ul className='text-left space-y-2'>
              <li className='flex items-center gap-2'>
                <span className='text-success'>✓</span>
                React 18 + Vite
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-success'>✓</span>
                Tailwind CSS 3
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-success'>✓</span>
                React Router DOM
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-success'>✓</span>
                Axios + React Toastify
              </li>
              <li className='flex items-center gap-2'>
                <span className='text-success'>✓</span>
                React Icons
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
