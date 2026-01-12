import ToDo from "./components/ToDo";
import { TaskProvider } from "./context/TasksContext";

const App = () => {
  return (
    <TaskProvider>
      <ToDo />
    </TaskProvider>
  );
};

export default App;
