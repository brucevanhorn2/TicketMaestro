import './App.css';
import TopNavigation from "./components/TopNavigation/TopNavigation";
import Issues from "./components/Issues/Issues";
import IssueEditor from "./components/IssueEditor/IssueEditor";
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <TopNavigation/>
            <Router>
                <Route path={"/issues"} component={Issues} />
                <Route path={"/issueEditor"} component={IssueEditor} />
            </Router>
        </div>
    );
}

export default App;
