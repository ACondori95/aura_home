import "./index.css";

function App() {
  const folderStructure = [
    "api/",
    "components/common/",
    "components/layout/",
    "components/products/",
    "components/cart/",
    "components/admin/",
    "contexts/",
    "hooks/",
    "pages/public/",
    "pages/user/",
    "pages/admin/",
    "routes/",
    "services/",
    "utils/",
  ];

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <h1 className='text-5xl font-bold text-primary mb-4'>AURA HOME</h1>
          <p className='text-xl text-text-secondary'>
            Frontend Structure Ready ✓
          </p>
        </div>

        <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>
            📁 Project Structure
          </h2>
          <div className='grid grid-cols-2 gap-3'>
            {folderStructure.map((folder) => (
              <div
                key={folder}
                className='flex items-center gap-2 p-3 bg-secondary rounded-lg'>
                <span className='text-success text-xl'>📂</span>
                <span className='text-sm font-mono'>{folder}</span>
              </div>
            ))}
          </div>

          <div className='mt-8 p-4 bg-primary/10 rounded-lg'>
            <h3 className='font-semibold text-primary mb-2'>Next Steps:</h3>
            <ul className='text-sm space-y-1 text-text-secondary'>
              <li>✓ Backend setup complete</li>
              <li>✓ Frontend setup complete</li>
              <li>✓ Folder structure created</li>
              <li>→ Next: Authentication system</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
