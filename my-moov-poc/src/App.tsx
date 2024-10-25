import { MoovProvider } from './components/MoovProvider.tsx'
import './App.css';

function App() {
  return (
    <MoovProvider>
      <div className="card">
    <h1>Moov Integration</h1>
        {/* Your other components will go here */}
      </div>
    </MoovProvider>
  );
}

export default App;
