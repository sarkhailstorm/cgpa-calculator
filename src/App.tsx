import "./App.css";
import CGPACalculator from "./components/Cgpa";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <CGPACalculator />
      </main>
    </div>
  );
}

export default App;

